import { updateActor } from 'api/actor';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ActorForm from '../actor-form/ActorForm';
import CommonActorModal from './CommonActorModal';

const defaultActorInfo = {
  name: '',
  about: '',
  avatar: null,
  gender: '',
};

const UpdateActorModal = ({
  setShowUpdateActor,
  initialState,
  token,
  setForceRenderActorsPage,
}) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultActorInfo });
  const { name, about, gender, avatar } = actorInfo;
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

  useEffect(() => {
    initialState && setActorInfo({ ...initialState, avatar: null });
    setSelectedPosterForUI(initialState?.avatar?.url);

    return () => {
      setActorInfo({ ...defaultActorInfo });
    };
  }, [initialState]);

  const handleUpdateActor = async (e) => {
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

    const { err } = await updateActor(token, initialState._id, formData);

    if (err) {
      toast.error(err?.error);
      setLoading(false);
      return;
    }

    toast.success('Successfully updated actor');
    setForceRenderActorsPage((prev) => !prev);
    setShowUpdateActor(false);
    setLoading(false);
    setActorInfo({ ...defaultActorInfo });
  };
  return (
    <CommonActorModal setShowAddActorModal={setShowUpdateActor}>
      <ActorForm
        title={'Update Actor'}
        btnTitle={'Update'}
        setShowAddActorModal={setShowUpdateActor}
        setActorInfo={setActorInfo}
        actorInfo={actorInfo}
        setSelectedPosterForUI={setSelectedPosterForUI}
        setLoading={setLoading}
        loading={loading}
        selectedPosterForUI={selectedPosterForUI}
        handleSubmit={handleUpdateActor}
      />
    </CommonActorModal>
  );
};

export default UpdateActorModal;
