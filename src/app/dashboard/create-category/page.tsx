"use client";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { AppDispatch, RootState } from "@/redux/store";
import {
  createCategory,
  fetchCategories,
} from "@/redux/thunks/categoriesThunk";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Input,
  Textarea,
} from "@nextui-org/react";
import Image from "next/image";
import React, { ChangeEvent, useEffect } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [image, setImage] = React.useState([] as File[]);
  const [categoryName, setCategoryName] = React.useState("");
  const [categoryDescription, setCategoryDescription] = React.useState("");

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImage([]);
    setImage((prevImage) => [...prevImage, ...files]);
  };

  const { categories } = useSelector((state: RootState) => state.categories);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch, categories]);

  const handelSubmit = () => {
    try {
      const formData = new FormData();
      image.forEach((file) => {
        formData.append("image", file);
      });
      formData.append("name", categoryName);
      formData.append("description", categoryDescription);
      dispatch(createCategory(formData))
        .unwrap()
        .then(() => {
          setCategoryName("");
          setCategoryDescription("");
          setImage([]);
          toast.success("Category created successfully");
        })
        .catch((err) => toast.error(err));
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center gap-12 w-full pt-28 pb-16">
        <div className="dark:text-white w-full">
          <h1 className="text-3xl font-bold mb-6 text-start">
            Create New Category
          </h1>
          <div className="flex items-center justify-center flex-col gap-7">
            <Input
              type="text"
              label="Category Name"
              isClearable
              isRequired
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              onClear={() => setCategoryName("")}
              className="shadow-lg w-fit"
            />
            <Textarea
              label="Category Long Description"
              placeholder="Enter the Category description..."
              isRequired
              value={categoryDescription}
              onChange={(e) => setCategoryDescription(e.target.value)}
              className="max-w-xs shadow-lg"
            />
            <div>
              <label className="pb-2">
                Upload Image <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                name=""
                id="upload"
                className="hidden"
                accept="image/*"
                onChange={handleImageChange}
              />
              <div className="w-full flex items-center flex-wrap">
                <label htmlFor="upload">
                  <AiOutlinePlusCircle
                    size={40}
                    className="mt-3"
                    color="#555"
                  />
                </label>
                {image &&
                  image.map((file, index) => (
                    <div key={index} className="m-2">
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={`product image ${index}`}
                        width={200}
                        height={200}
                        className="object-cover rounded-lg shadow-lg"
                      />
                    </div>
                  ))}
              </div>
            </div>
            <Button onClick={handelSubmit} type="submit" variant="faded">
              Create Category
            </Button>
            <div className="flex flex-wrap justify-center gap-5 mx-5 w-full">
              <Divider />
              {categories.map((category) => (
                <Card className="max-w-[400px] dark:bg-default-100 shadow-xl cursor-pointer hover:-translate-y-4">
                  <CardHeader className="flex gap-3">
                    <p className="text-md">{category.name}</p>
                  </CardHeader>
                  <Divider />
                  <CardBody className="overflow-visible py-2">
                    <p className="my-4">{category.description}</p>
                    <Image
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={category.image}
                      width={270}
                      height={200}
                    />
                  </CardBody>
                  <Divider />
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default page;
