import { WithContext as ReactTags, Tag } from 'react-tag-input';

interface ITagsProps {
  tags: Tag[];
  setTags: (tags: Tag[]) => void;
}

const KeyCodes = {
  comma: 188,
  enter: 13,
  space: 32,
};
const delimiters = [KeyCodes.comma, KeyCodes.enter, KeyCodes.space];

export default function Tags({ tags, setTags }: ITagsProps) {
  const handleDelete = (i: number) => {
    setTags(tags.filter((_, index) => index !== i));
  };
  const handleAddition = (tag: Tag) => {
    setTags([...tags, tag]);
  };

  const handleDrag = (tag: Tag, currPos: number, newPos: number) => {
    const newTags = tags.slice();
    newTags.splice(currPos, 1);
    newTags.splice(newPos, 0, tag);
    setTags(newTags);
  };
  return (
    <ReactTags
      tags={tags}
      delimiters={delimiters}
      handleDelete={handleDelete}
      handleAddition={handleAddition}
      handleDrag={handleDrag}
      inputFieldPosition='bottom'
      autocomplete
    />
  );
}
