import InputLabel from '../inputs/InputLabel';
import TagsInput from '../tag/TagsInput';

const TagsInputComponent = ({
  tags,
  tag,
  setTag,
  setTags,
  handleAddTag,
  handleTagChange,
  handleRemoveTag,
}) => {
  return (
    <div>
      <InputLabel htmlFor={`tags`}>Tags</InputLabel>
      <TagsInput
        tag={tag}
        setTag={setTag}
        tags={tags}
        setTags={setTags}
        handleAddTag={handleAddTag}
        handleTagChange={handleTagChange}
        handleRemoveTag={handleRemoveTag}
      />
    </div>
  );
};

export default TagsInputComponent;
