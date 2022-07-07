import ActorForm from '../actor-form/ActorForm';
import CommonActorModal from './CommonActorModal';

const AddActorModal = ({ setShowAddActorModal }) => {
  return (
    <CommonActorModal setShowAddActorModal={setShowAddActorModal}>
      <ActorForm
        title={'Create New Actor'}
        btnTitle={'Create'}
        setShowAddActorModal={setShowAddActorModal}
      />
    </CommonActorModal>
  );
};

export default AddActorModal;
