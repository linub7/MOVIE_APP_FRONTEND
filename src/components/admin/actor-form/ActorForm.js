import { createActor } from 'api/actor';
import { useAuth } from 'hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { BounceLoader } from 'react-spinners';
import { genderOptions } from 'utils/selectorOptions';
import { commonInputClasses } from 'utils/theme';
import PosterSelector from '../form/poster/PosterSelector';
import Selector from '../form/select/Selector';

const defaultActorInfo = {
  name: '',
  about: '',
  avatar: null,
  gender: '',
};

const ActorForm = ({ title, btnTitle, setShowAddActorModal }) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const { name, about, gender, avatar } = actorInfo;
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

  const { auth } = useAuth();

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'name' || name === 'about' || name === 'gender') {
      setActorInfo({
        ...actorInfo,
        [name]: value,
      });
    }
  };

  const updatePosterForUI = (poster) => {
    const url = URL.createObjectURL(poster);
    setSelectedPosterForUI(url);
  };
  const handleAddPoster = (e) => {
    if (!e.target.files[0].type.startsWith('image'))
      return toast.error('Invalid file type');

    const file = e.target.files[0];
    updatePosterForUI(file);
    setActorInfo({
      ...actorInfo,
      avatar: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error('Please enter a name');
    if (!about.trim()) return toast.error('please enter about');
    if (!avatar) return toast.error('Please select an avatar');
    if (!gender) return toast.error('Please select gender');

    setLoading(true);

    const formData = new FormData();

    for (const key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }

    const { err } = await createActor(auth?.token, formData);

    if (err) {
      toast.error(err?.error);
      setLoading(false);
      return;
    }

    toast.success('Successfully created actor');
    setShowAddActorModal(false);
    setLoading(false);
    setActorInfo({ ...defaultActorInfo });
  };

  return (
    <form onSubmit={handleSubmit} className="dark:bg-primary bg-white p-3 mt-9">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-xl dark:text-white text-primary">
          {title}
        </h1>
        <button
          disabled={loading}
          className="px-3 py-1 w-28 text-center font-semibold dark:bg-dark-subtle bg-primary text-white dark:bg-white dark:text-primary dark:hover:text-yellow-400 hover:text-cyan-400 transition rounded flex items-center justify-center"
          type="submit"
        >
          {loading ? <BounceLoader color="#F8E71C" size={20} /> : btnTitle}
        </button>
      </div>
      <div className="flex my-3">
        <PosterSelector
          label={'Select Avatar'}
          className={'w-36 h-36 aspect-square object-cover rounded mr-3'}
          name={'avatar'}
          handleAddPoster={handleAddPoster}
          selectedPosterForUI={selectedPosterForUI}
        />
        <div className="flex-grow flex flex-col space-y-4">
          <input
            name="name"
            value={name}
            onChange={handleOnChange}
            placeholder="Enter name"
            type="text"
            className={`${commonInputClasses} bg-transparent border-b-2`}
          />
          <textarea
            name="about"
            value={about}
            onChange={handleOnChange}
            placeholder="About"
            className={`${commonInputClasses} border-b-2 resize-none h-full `}
          ></textarea>
        </div>
      </div>
      <Selector
        label={'Gender'}
        value={gender}
        name="gender"
        options={genderOptions}
        handleOptionSelect={handleOnChange}
      />
    </form>
  );
};

export default ActorForm;
