import React from "react";
import { CgProfile } from "react-icons/cg";
import { FiShoppingBag } from "react-icons/fi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { CgFileAdd } from "react-icons/cg";
import { IoSettingsOutline } from "react-icons/io5";
import Link from "next/link";
import { useRouter } from "next/router";
import { usePathname } from "next/navigation";

const navItems = [
  {
    icon: <CgProfile size={25} />,
    text: "Profile",
    link: "/dashboard",
  },
  {
    icon: <CgFileAdd size={25} />,
    text: "Create Product",
    link: "/dashboard/create-product",
  },
  {
    icon: <MdProductionQuantityLimits size={25} />,
    text: "All Products",
    link: "/dashboard/all-products",
  },
  {
    icon: <FiShoppingBag size={25} />,
    text: "All Orders",
    link: "/dashboard/all-orders",
  },
  {
    icon: <IoSettingsOutline size={25} />,
    text: "Settings",
    link: "/dashboard/settings",
  },
];

const LeftSidebar = () => {
  // const router = useRouter();
  const router = usePathname();

  return (
    <div className="fixed pt-28 top-0 left-0 min-h-screen h-full dark:bg-[#121219] bg-default-100 border-r border-gray-500 w-[18rem] py-5">
      <span className="text-2xl text-center p-4 dark:text-white">
        Darkom Shop
      </span>
      <ul className="mt-8 flex flex-col gap-4 px-4">
        {navItems.map((item, index) => (
          <Link href={item.link} key={index}>
            <li
              className={`flex items-center gap-4 dark:text-white rounded-lg py-3 px-3 cursor-pointer dark:hover:bg-gray-700 hover:bg-default-300 ${
                router === item.link
                  ? "dark:bg-gray-700 bg-default-300 font-semibold"
                  : "dark:bg-gray-800 bg-default-200"
              }`}
            >
              {item.icon}
              <span className="text-xl">{item.text}</span>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default LeftSidebar;
