"use client";
import React, { useEffect } from "react";
import {
  Select,
  SelectItem,
  Avatar,
  Chip,
  SelectedItems,
} from "@nextui-org/react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/thunks/CategoriesThunk";
import { Category } from "@/redux/slices/categoriesSlice";

interface SelectCategoriesProps {
  setCategoriesState: React.Dispatch<React.SetStateAction<number[]>>;
}

const SelectCategories = ({ setCategoriesState }: SelectCategoriesProps) => {
  const { categories } = useSelector((state: RootState) => state.categories);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryChange = (selectedItems: any) => {
    const selectedValues = selectedItems.target.value;
    const selectedValuesArray = selectedValues.split(",").map(Number);
    setCategoriesState(selectedValuesArray);
  };

  return (
    <>
      <Select
        items={categories as Category[]}
        label="Add Categories"
        variant="bordered"
        isMultiline={true}
        isRequired
        selectionMode="multiple"
        placeholder="Select a Category"
        labelPlacement="outside"
        onChange={handleCategoryChange as any}
        classNames={{
          base: "max-w-xs",
          trigger: "min-h-unit-12 py-2",
        }}
        renderValue={(items: SelectedItems<Category>) => {
          return (
            <div className="flex flex-wrap gap-2">
              {items.map((item) => (
                <Chip key={item.key}>{item.data?.name}</Chip>
              ))}
            </div>
          );
        }}
      >
        {(category) => (
          <SelectItem key={category.id} textValue={category.name}>
            <div className="flex gap-2 items-center">
              <Avatar
                alt={category.name}
                className="flex-shrink-0"
                size="sm"
                src={category.image}
              />
              <div className="flex flex-col">
                <span className="text-small">{category.name}</span>
                <span className="text-tiny text-default-400">
                  {category.description}
                </span>
              </div>
            </div>
          </SelectItem>
        )}
      </Select>
    </>
  );
};

export default SelectCategories;
