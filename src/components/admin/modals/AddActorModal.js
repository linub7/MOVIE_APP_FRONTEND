import { createActor } from 'api/actor';
import { useAuth } from 'hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import ActorForm from '../actor-form/ActorForm';
import CommonActorModal from './CommonActorModal';

const defaultActorInfo = {
  name: '',
  about: '',
  avatar: null,
  gender: '',
};

const AddActorModal = ({ setShowAddActorModal }) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const { name, about, gender, avatar } = actorInfo;
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

  const { auth } = useAuth();

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
    <CommonActorModal setShowAddActorModal={setShowAddActorModal}>
      <ActorForm
        title={'Create New Actor'}
        btnTitle={'Create'}
        setShowAddActorModal={setShowAddActorModal}
        setActorInfo={setActorInfo}
        actorInfo={actorInfo}
        setSelectedPosterForUI={setSelectedPosterForUI}
        selectedPosterForUI={selectedPosterForUI}
        handleSubmit={handleSubmit}
        loading={loading}
        setLoading={setLoading}
      />
    </CommonActorModal>
  );
};

export default AddActorModal;
