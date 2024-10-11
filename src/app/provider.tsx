"use client";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Use dynamic import with 'any' to avoid typing issues
const AuthProvider: any = dynamic(
  () => import("react-auth-kit").then((mod: any) => mod.default),
  { ssr: false }
);

export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [authStore, setAuthStore] = useState<any>(null);

  useEffect(() => {
    const createStore = require("react-auth-kit/createStore").default;
    const store = createStore({
      authName: "_auth",
      authType: "cookie",
      cookieDomain: window.location.hostname,
      cookieSecure: window.location.protocol === "https:",
    });
    setAuthStore(store);
  }, []);

  if (!authStore) {
    return null; // or a loading spinner
  }

  return (
    <Provider store={store}>
      <AuthProvider store={authStore}>
        <NextUIProvider>{children}</NextUIProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </AuthProvider>
    </Provider>
  );
};
