"use client";
import React, { ChangeEvent, useEffect, useState } from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { AiOutlinePlusCircle } from "react-icons/ai";
import {
  Textarea,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";
import VariantsModal from "@/components/modals/VariantsModal";
import { ProductType, ProductVariantType } from "@/types/product";
import { toast } from "react-toastify";
import SelectCategories from "@/components/dashboard/SelectCategories";
import SelectTags from "@/components/dashboard/SelectTags";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { addProduct } from "@/redux/thunks/productThunk";
import Image from "next/image";
import withAuth from "@/utils/withAuth";
import Loading from "@/components/Loading";
import { fetchTags } from "@/redux/thunks/tagsThunk";
import { fetchCategories } from "@/redux/thunks/CategoriesThunk";

const page = () => {
  const [variants, setVariants] = useState<ProductVariantType[]>(
    [] as ProductVariantType[]
  );
  const [images, setImages] = useState([] as File[]);
  const [categoriesState, setCategoriesState] = useState([] as number[]);
  const [tagsState, setTagsState] = useState([] as number[]);
  const [productDetails, setProductDetails] = useState({
    name: "",
    shortDescription: "",
    longDescription: "",
  });

  const { categories } = useSelector((state: RootState) => state.categories);
  const { tags } = useSelector((state: RootState) => state.tags);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDeleteVariant = (id: number) => {
    try {
      const newVariants = variants.filter((variant) => variant.id !== id);
      setVariants(newVariants);
      toast.warn("Variant deleted successfully");
    } catch (error) {
      toast.error("Failed to delete variant");
    }
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages([]);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  useEffect(() => {
    images.forEach((image) => {
      console.log("image: ", image);
    });
  }, [images]);

  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();

      images.forEach((image) => {
        formData.append("images", image);
      });

      console.log("formData: ", formData.get("images"));

      formData.append("name", productDetails.name);
      formData.append("short_description", productDetails.shortDescription);
      formData.append("long_description", productDetails.longDescription);
      formData.append("categories", JSON.stringify(categoriesState));
      formData.append("tags", JSON.stringify(tagsState));
      formData.append("variants", JSON.stringify(variants));

      const res = await dispatch(addProduct(formData)).unwrap();
      console.log("res: ", res);
      toast.success("Product created successfully");
    } catch (error: any) {
      console.log("error: ", error);
      if (error) {
        toast.error(error);
      } else {
        toast.error("Failed to create product");
      }
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center gap-12 w-full pt-28 pb-16">
        <div className="dark:text-white w-full">
          <h1 className="text-3xl font-bold mb-6 text-start">
            Create New Product
          </h1>
          <form
            action=""
            className="flex items-center justify-center flex-col gap-7"
          >
            <Input
              type="text"
              label="Product Name"
              isClearable
              isRequired
              value={productDetails.name}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  name: e.target.value,
                })
              }
              className="shadow-lg w-fit"
            />
            <Input
              type="text"
              label="Product Short Description"
              isClearable
              isRequired
              value={productDetails.shortDescription}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  shortDescription: e.target.value,
                })
              }
              className="shadow-lg w-fit"
            />
            <Textarea
              label="Product Long Description"
              placeholder="Enter the product description..."
              isRequired
              value={productDetails.longDescription}
              onChange={(e) =>
                setProductDetails({
                  ...productDetails,
                  longDescription: e.target.value,
                })
              }
              className="max-w-xs shadow-lg"
            />
            {categories && categories.length > 0 ? (
              <SelectCategories
                categories={categories}
                setCategoriesState={setCategoriesState}
              />
            ) : (
              <Loading />
            )}
            {tags && tags.length > 0 ? (
              <SelectTags tags={tags} setTagsState={setTagsState} />
            ) : (
              <Loading />
            )}
            <div>
              <label className="pb-2">
                Upload Images <span className="text-red-500">*</span>
              </label>
              <Input
                type="file"
                name=""
                id="upload"
                className="hidden"
                accept="image/*"
                multiple
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
                {images &&
                  images.map((file, index) => (
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
            <VariantsModal variants={variants} setVariants={setVariants} />
            <div className="mt-6 flex items-center gap-5 flex-wrap">
              {variants.length > 0 &&
                variants.map((variant, index) => {
                  return (
                    <Dropdown key={index}>
                      <DropdownTrigger>
                        <span className="cursor-pointer px-4 py-1 dark:bg-default-100 bg-default-200 hover:bg-default-300 rounded-full">
                          Var {index + 1}
                        </span>
                      </DropdownTrigger>
                      <DropdownMenu aria-label="Static Actions">
                        <DropdownItem key="new">Edit</DropdownItem>
                        <DropdownItem
                          key="delete"
                          className="text-danger"
                          color="danger"
                          onClick={() => handleDeleteVariant(variant?.id || 0)}
                        >
                          Delete
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  );
                })}
            </div>
            <div className="my-4">
              <Button onClick={handleCreateProduct} variant="flat">
                Create Product
              </Button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(page);
