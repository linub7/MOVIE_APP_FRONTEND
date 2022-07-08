// const AddDirectorModal = ({ setShowAddDirectorModal }) => {
//   return <div>AddDirectorModal</div>;
// };

// export default AddDirectorModal;
import { createDirector } from 'api/director';
import { useAuth } from 'hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import WriterDirectorForm from '../writer-director-form/WriterDirectorModal';
import CommonActorModal from './CommonActorModal';

const defaultDirectorInfo = {
  name: '',
  avatar: null,
};

const AddDirectorModal = ({ setShowAddDirectorModal }) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultDirectorInfo });
  const { name, avatar } = actorInfo;
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

  const { auth } = useAuth();

  const handleOnChange = ({ target }) => {
    const { name, value } = target;

    if (name === 'name') {
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
    if (!avatar) return toast.error('Please select an avatar');

    setLoading(true);

    const formData = new FormData();

    for (const key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }

    const { err } = await createDirector(auth?.token, formData);

    if (err) {
      toast.error(err?.error);
      setLoading(false);
      return;
    }

    toast.success('Successfully created director');
    setShowAddDirectorModal(false);
    setLoading(false);
    setActorInfo({ ...defaultDirectorInfo });
  };
  return (
    <CommonActorModal setShowAddActorModal={setShowAddDirectorModal}>
      <WriterDirectorForm
        title={'Create Director'}
        btnTitle="Create"
        setShowModal={setShowAddDirectorModal}
        handleAddPoster={handleAddPoster}
        handleOnChange={handleOnChange}
        handleSubmit={handleSubmit}
        loading={loading}
        name={name}
        selectedPosterForUI={selectedPosterForUI}
      />
    </CommonActorModal>
  );
};

export default AddDirectorModal;
