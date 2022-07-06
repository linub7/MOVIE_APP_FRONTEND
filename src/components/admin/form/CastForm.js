import toast from 'react-hot-toast';
import { commonInputClasses } from 'utils/theme';
import LiveSearch from './LiveSearch';

const CastForm = ({
  cast,
  setCast,
  results,
  setCastValidation,
  handleSubmitCast,
  casts,
}) => {
  const { profile, leadActor, roleAs } = cast;
  const handleProfile = (profile) => {
    setCast({ ...cast, profile });
  };

  console.log({ profile, leadActor, roleAs });

  const handleAddButton = () => {
    if (!profile.name) return toast.error('Please select a profile');
    if (!roleAs.trim()) return toast.error('Please enter a role');

    if (casts.find((cast) => cast.profile.id === profile.id)) {
      return toast.error('Profile already added');
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
        type="checkbox"
        name="leadActor"
        className="w-4 h-4"
        checked={leadActor}
        onChange={(e) => setCast({ ...cast, leadActor: e.target.checked })}
        title="Set as Lead Actor"
      />
      <LiveSearch
        name={'Actor'}
        profile={profile}
        setProfile={handleProfile}
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
          value={roleAs}
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
