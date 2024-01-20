"use client";
import React, { useEffect, useState } from "react";
import darkomImage from "@/assets/images/darkom-removebg-preview.png";
import Link from "next/link";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { activateShop } from "@/redux/thunks/shopThunks";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type shopIn = {
  shop_id: string;
  email: string;
};

const ShopActivation = () => {
  const router = useRouter();
  const [activationCode, setActivationCode] = useState("");
  const { shop, error, loading } = useSelector(
    (state: RootState) => state.authShop
  );
  const dispatch = useDispatch<AppDispatch>();

  // Load shop data on component mount
  useEffect(() => {
    const storedShop = JSON.parse(localStorage.getItem("shop") as string);
    if (!storedShop) {
      router.push("/login-shop");
      return;
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!shop) {
        toast.error("Shop data not found");
        return;
      }

      const payload = {
        email: shop.email as string,
        otp: activationCode,
      };

      const res = await dispatch(activateShop(payload)).unwrap();
      toast.success(res.message);
      router.push("/");
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
          Activate your Shop
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
                Activation Code
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  name="activationCode"
                  autoComplete="off" // Disable autocomplete for activation codes
                  required
                  pattern="[0-9]{6}" // Specify the pattern for a 6-digit code
                  title="Enter a 6-digit activation code" // Provide a title for accessibility
                  placeholder="Enter 6-digit code..."
                  value={activationCode}
                  onChange={(e) => setActivationCode(e.target.value)}
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
                {loading ? "Loading..." : "Submit"}
              </button>
              {error && (
                <p className="mt-2 text-sm text-red-600 text-center">{error}</p>
              )}
            </div>
            <div>
              <h4>Didn't receive the email?</h4>
              <Link href="/" className="text-blue-600">
                Try to login to receive a new activation code
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShopActivation;
