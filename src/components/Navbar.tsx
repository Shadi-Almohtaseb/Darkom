import React, { useEffect, useState } from "react";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { logoutShop } from "@/redux/thunks/shopThunks";
import useSignOut from "react-auth-kit/hooks/useSignOut";
import LogoDark from "@/assets/images/imageedit_55_4813982059.png";
import LogoLight from "@/assets/images/darkom-removebg-preview.png";
import Avatar from "@mui/material/Avatar";
import { IoIosArrowDown } from "react-icons/io";
import Image from "next/image";
import ToggleTheme from "@/components/ToggleTheme";
import { useThemeSettings } from "@/hooks/useThemeSettings";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";

const Navbar = () => {
  const { shop, loading, error } = useSelector(
    (state: RootState) => state.authShop
  );
  const { currentMode, toggleTheme } = useThemeSettings();
  const [Logo, setLogo] = useState(LogoLight);

  useEffect(() => {
    const handleThemeChange = () => {
      const theme = localStorage.getItem("theme") || "Light";
      setLogo(theme === "Dark" ? LogoDark : LogoLight);
    };

    handleThemeChange();
    window.addEventListener("themeChange", handleThemeChange);
    return () => {
      window.removeEventListener("themeChange", handleThemeChange);
    };
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const signOut = useSignOut();

  console.log(shop);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(logoutShop(shop?.shop_id as string)).unwrap();
      signOut();
      router.push("/login-shop");
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(error);
    }
  };

  const menuItems = [
    {
      key: "dashboard",
      label: "Dashboard",
      href: "/dashboard",
      onClick: () => {},
    },
    {
      key: "copy",
      label: "Copy link",
      href: "",
      onClick: () => {},
    },
    {
      key: "edit",
      label: "Edit file",
      href: "",
      onClick: () => {},
    },
    {
      key: "logout",
      label: "Logout",
      href: "",
      onClick: handleLogout,
    },
  ];
  return (
    <div className="fixed z-50 flex items-center justify-between w-full px-8 pt-2 pb-3 bg-default-200 shadow-lg dark:bg-default-100 dark:text-white">
      <div className="flex items-center gap-16">
        <Image src={Logo} width={90} height={90} alt="Logo" />
        <ul className="flex items-center gap-5">
          <li className="text-lg">
            <a href="#">Home</a>
          </li>
          <li className="text-lg">
            <a href="#">Products</a>
          </li>
          <li className="text-lg">
            <a href="#">Orders</a>
          </li>
          <li className="text-lg">
            <a href="#">Customers</a>
          </li>
          <li className="text-lg">
            <a href="#">Reports</a>
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-3">
        <ToggleTheme currentMode={currentMode} toggleTheme={toggleTheme} />
        <Dropdown>
          <DropdownTrigger>
            <div>
              <div className="flex items-center gap-3 bg-default-300 dark:bg-default-200 hover:bg-default-100 dark:hover:bg-default-300 cursor-pointer px-5 py-[6px] rounded-full">
                <Avatar alt="Profile Image" src={shop.avatar} />
                <div className="flex flex-col dark:text-white">
                  <p>{shop.shopName}</p>
                  <p>
                    {shop.email
                      ? shop.email.length > 14
                        ? shop.email.slice(0, 14) + "..."
                        : shop.email
                      : ""}
                  </p>
                </div>
                <IoIosArrowDown size={20} />
              </div>
            </div>
          </DropdownTrigger>
          <DropdownMenu aria-label="Dynamic Actions" items={menuItems}>
            {(item) => (
              <DropdownItem
                key={item.key}
                color={item.key === "logout" ? "danger" : "default"}
                href={item.href}
                className={item.key === "logout" ? "text-danger" : ""}
                onClick={item.onClick}
              >
                {item.label}
              </DropdownItem>
            )}
          </DropdownMenu>
        </Dropdown>
        {/* <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
          autoFocus={false}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleLogout}>
            {loading ? "Loading..." : "Logout"}
          </MenuItem>
        </Menu> */}
      </div>
    </div>
  );
};

export default Navbar;
