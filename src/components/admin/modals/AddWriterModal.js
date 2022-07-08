import { createWriter } from 'api/writer';
import { useAuth } from 'hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import WriterDirectorForm from '../writer-director-form/WriterDirectorModal';
import CommonActorModal from './CommonActorModal';

const defaultWriterInfo = {
  name: '',
  avatar: null,
};

const AddWriterModal = ({ setShowAddWriterModal }) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultWriterInfo });
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

    const { err } = await createWriter(auth?.token, formData);

    if (err) {
      toast.error(err?.error);
      setLoading(false);
      return;
    }

    toast.success('Successfully created writer');
    setShowAddWriterModal(false);
    setLoading(false);
    setActorInfo({ ...defaultWriterInfo });
  };
  return (
    <CommonActorModal setShowAddActorModal={setShowAddWriterModal}>
      <WriterDirectorForm
        title={'Create Writer'}
        btnTitle="Create"
        setShowModal={setShowAddWriterModal}
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

export default AddWriterModal;
