import { Tag } from "@/redux/slices/tagsSlice";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import React from "react";

interface selectTagsProps {
  setTagsState: React.Dispatch<React.SetStateAction<number[]>>;
  tags: Tag[];
}

const SelectTags = ({ setTagsState, tags }: selectTagsProps) => {
  return (
    <>
      <Select
        items={tags}
        label="Add Tags"
        isRequired
        variant="bordered"
        isMultiline={true}
        selectionMode="multiple"
        placeholder="Select a user"
        labelPlacement="outside"
        onChange={(selectedItems: any) => {
          const selectedValues = selectedItems.target.value;
          const selectedValuesArray = selectedValues.split(",").map(Number);
          setTagsState(selectedValuesArray);
        }}
        classNames={{
          base: "max-w-xs",
          trigger: "min-h-unit-12 py-2",
        }}
        renderValue={(items: SelectedItems<Tag>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(user) => (
          <SelectItem key={user.id} textValue={user.name}>
            <div className="flex gap-2 items-center">
              <div className="flex flex-col">
                <span className="text-small">{user.name}</span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </>
  );
};

export default SelectTags;
