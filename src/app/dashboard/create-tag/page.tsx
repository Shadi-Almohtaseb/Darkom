"use client";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { AppDispatch, RootState } from "@/redux/store";
import { createTag, fetchTags } from "@/redux/thunks/tagsThunk";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const page = () => {
  const [TagName, setTagName] = React.useState("");
  const dispatch = useDispatch<AppDispatch>();
  const { tags } = useSelector((state: RootState) => state.tags);
  useEffect(() => {
    dispatch(fetchTags());
  }, [dispatch, tags]);

  const handelSubmit = () => {
    try {
      const formData = new FormData();
      formData.append("name", TagName);
      dispatch(createTag(formData))
        .unwrap()
        .then(() => {
          setTagName("");
          toast.success("Tag created successfully");
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
          <h1 className="text-3xl font-bold mb-6 text-start">Create New Tag</h1>
          <div className="flex items-center justify-center flex-col gap-7">
            <Input
              type="text"
              label="Tag Name"
              isClearable
              isRequired
              value={TagName}
              onChange={(e) => setTagName(e.target.value)}
              onClear={() => setTagName("")}
              className="shadow-lg w-fit"
            />
            <Button onClick={handelSubmit} type="submit" variant="faded">
              Create Tag
            </Button>
            <div className="flex flex-wrap justify-center gap-5 mx-5 w-full">
              <Divider />
              {tags.map((tag) => (
                <Card className="max-w-[400px] dark:bg-default-100 shadow-xl cursor-pointer hover:-translate-y-4">
                  <CardHeader className="flex gap-3">
                    <p className="text-md">{tag.name}</p>
                  </CardHeader>
                  <Divider />
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
