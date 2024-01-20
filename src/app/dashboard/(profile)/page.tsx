"use client";
import React, { useEffect } from "react";
import DashboardLayout from "@/app/layouts/DashboardLayout";
import { AppDispatch, RootState } from "@/redux/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { NextPage } from "next";
import withAuth from "@/utils/withAuth";
import { fetchShop } from "@/redux/thunks/shopThunks";
import Loading from "@/components/Loading";
import { TextField } from "@mui/material";

const Profile: NextPage = () => {
  const { shop, loading } = useSelector((state: RootState) => state.shop);
  console.log("shop: ", shop);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const shop = JSON.parse(localStorage.getItem("shop") || "{}");
    dispatch(fetchShop(shop?.shop_id));
  }, [dispatch]);
  return (
    <DashboardLayout>
      <div className="flex flex-col items-center justify-center gap-12 w-full pt-10">
        {loading ? (
          <Loading />
        ) : (
          <Image
            src={shop?.avatar}
            width={200}
            height={200}
            alt="profile image"
            className="rounded-full"
          />
        )}
        <div className="flex flex-col gap-7">
          <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            size="medium"
            className="w-[15rem]"
            inputProps={{ style: { color: "white" } }}
            focused
            value={shop?.email}
          />
          <TextField
            id="standard-basic"
            label="Shop Name"
            variant="standard"
            size="medium"
            className="w-[15rem]"
            inputProps={{ style: { color: "white" } }}
            focused
            value={shop?.shopName}
          />
          <TextField
            label="Phone Number"
            variant="standard"
            size="medium"
            className="w-[15rem]"
            inputProps={{ style: { color: "white" } }}
            focused
            value={shop?.phoneNumber}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default withAuth(Profile);
