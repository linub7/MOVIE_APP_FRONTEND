import toast from 'react-hot-toast';
import { commonInputClasses } from 'utils/theme';
import LiveSearch from '../search/LiveSearch';

const CastForm = ({
  visible,
  onChange,
  cast,
  setCast,
  results,
  setCastValidation,
  handleSubmitCast,
  casts,
  setForceModalRender,
}) => {
  const handleProfile = (profile) => {
    setCast({ ...cast, profile });
  };

  const handleAddButton = () => {
    if (!cast?.profile?.name) return toast.error('Please select a profile');
    if (!cast?.roleAs?.trim()) return toast.error('Please enter a role');

    setForceModalRender((prev) => !prev);

    for (const cs of casts) {
      if (cs.profile?.id === cast.profile?.id)
        return toast.error('Cast already added');
    }

    setCast({
      ...cast,
      profile: {
        name: '',
        id: '',
        avatar: '',
      },
      roleAs: '',
      leadActor: false,
    });

    setCastValidation(true);
    handleSubmitCast(cast);
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        value={cast?.profile?.name}
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={cast?.leadActor}
        onChange={(e) => setCast({ ...cast, leadActor: e.target.checked })}
        title="Set as Lead Actor"
      />
      <LiveSearch
        visible={visible}
        onChange={onChange}
        setValue={handleProfile}
        value={cast?.profile?.name}
        name={'Actor'}
        profile={cast?.profile}
        onSelect={handleProfile}
        results={results}
      />
      <span className="dark:text-dark-subtle text-light-subtle font-semibold">
        as
      </span>
      <div className="flex-grow">
        <input
          type="text"
          className={`${commonInputClasses} border-2 rounded p-1 text-lg`}
          placeholder="Role as"
          value={cast?.roleAs}
          onChange={(e) => setCast({ ...cast, roleAs: e.target.value })}
        />
      </div>
      <button
        onClick={handleAddButton}
        type="button"
        className="bg-secondary dark:bg-white dark:text-primary text-white rounded px-1"
      >
        Add
      </button>
    </div>
  );
};

export default CastForm;
