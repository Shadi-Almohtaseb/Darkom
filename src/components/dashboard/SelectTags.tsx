import { Tag } from "@/redux/slices/tagsSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchTags } from "@/redux/thunks/tagsThunk";
import { Chip, Select, SelectItem, SelectedItems } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SelectTags = ({
  setTagsState,
}: {
  setTagsState: React.Dispatch<React.SetStateAction<number[]>>;
}) => {
  const { tags } = useSelector((state: RootState) => state.tags);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch]);

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
