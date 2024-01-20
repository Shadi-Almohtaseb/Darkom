"use client";
import React, { useState } from "react";
import darkomImage from "@/assets/images/darkom-removebg-preview.png";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { signupShop } from "@/redux/thunks/shopThunks";
import { IoEyeOutline } from "react-icons/io5";
import { FaRegEyeSlash } from "react-icons/fa";
import { ShopAuth } from "@/types/shop";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useSignIn from "react-auth-kit/hooks/useSignIn";

export default function SignUpShop() {
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [shopDetails, setShopDetails] = useState<ShopAuth>({
    id: "",
    shopName: "",
    email: "",
    password: "",
    phoneNumber: "",
    createdAt: "",
  });

  const { error, loading } = useSelector((state: RootState) => state.authShop);
  const dispatch = useDispatch<AppDispatch>();
  const signIn = useSignIn();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await dispatch(signupShop(shopDetails)).unwrap();
      signIn({
        auth: {
          token: res.token,
          type: "Bearer",
        },
        userState: {
          shopId: res.shop.shop_id,
          email: res.shop.email,
        },
      });
      toast.success(res.message);
      router.push(`/signup-shop/${res.shop.shop_id}`);
    } catch (err: any) {
      toast.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-start bg-[#f7f7f7]  flex-col  py-12 sm:px-6 lg:px-8">
      <div>
        <Image src={darkomImage} alt="image" className="w-[200px] h-[200px]" />
      </div>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-extrabold text-gray-900">
          Register as a new Shop
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Full Name
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="text"
                  autoComplete="name"
                  required
                  value={shopDetails?.shopName}
                  onChange={(e) =>
                    setShopDetails({ ...shopDetails, shopName: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  type="email"
                  name="email"
                  autoComplete="email"
                  required
                  value={shopDetails?.email}
                  onChange={(e) =>
                    setShopDetails({ ...shopDetails, email: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="mt-1 relative">
                <input
                  type={visible ? "text" : "password"}
                  name="password"
                  autoComplete="current-password"
                  required
                  value={shopDetails?.password}
                  onChange={(e) =>
                    setShopDetails({ ...shopDetails, password: e.target.value })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
                {visible ? (
                  <IoEyeOutline
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(false)}
                  />
                ) : (
                  <FaRegEyeSlash
                    className="absolute right-2 top-2 cursor-pointer"
                    size={25}
                    onClick={() => setVisible(true)}
                  />
                )}
              </div>
            </div>
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="phone"
                  autoComplete="phone"
                  required
                  value={shopDetails?.phoneNumber}
                  onChange={(e) =>
                    setShopDetails({
                      ...shopDetails,
                      phoneNumber: e.target.value,
                    })
                  }
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className={`group relative w-full h-[40px] flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white ${
                  loading ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? "Loading..." : "Sign Up"}
              </button>
              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
            <div>
              <h4>Already have an account?</h4>
              <Link href="/login-shop" className="text-blue-600">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
