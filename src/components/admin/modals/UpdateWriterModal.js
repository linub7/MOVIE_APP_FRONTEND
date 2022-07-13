import { updateWriter } from 'api/writer';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import WriterDirectorForm from '../writer-director-form/WriterDirectorModal';
import CommonActorModal from './CommonActorModal';

const defaultWriterInfo = {
  name: '',
  avatar: null,
};

const UpdateWriterModal = ({
  setShowAddWriterModal,
  setForceRenderWriterPage,
  initialState,
  token,
}) => {
  const [loading, setLoading] = useState(false);
  const [actorInfo, setActorInfo] = useState({ ...defaultWriterInfo });
  const { name, avatar } = actorInfo;
  const [selectedPosterForUI, setSelectedPosterForUI] = useState('');

  useEffect(() => {
    initialState && setActorInfo({ ...initialState, avatar: null });
    setSelectedPosterForUI(initialState?.avatar?.url);

    return () => {
      setActorInfo({ ...defaultWriterInfo });
    };
  }, [initialState]);

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

    setLoading(true);

    const formData = new FormData();

    for (const key in actorInfo) {
      if (key) formData.append(key, actorInfo[key]);
    }

    const { err } = await updateWriter(token, initialState._id, formData);

    if (err) {
      toast.error(err?.error);
      setLoading(false);
      return;
    }
    setForceRenderWriterPage((prev) => !prev);
    toast.success('Successfully created writer');
    setShowAddWriterModal(false);
    setLoading(false);
    setActorInfo({ ...defaultWriterInfo });
  };
  return (
    <CommonActorModal setShowAddActorModal={setShowAddWriterModal}>
      <WriterDirectorForm
        title={'Update Writer'}
        btnTitle="Update"
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

export default UpdateWriterModal;
