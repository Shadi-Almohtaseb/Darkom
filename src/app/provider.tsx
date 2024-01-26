"use client";
import "react-toastify/dist/ReactToastify.css";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import AuthProvider from "react-auth-kit";
import createStore from "react-auth-kit/createStore";
import { NextUIProvider } from "@nextui-org/react";

// Create the auth store
const authStore = createStore({
  authName: "_auth",
  authType: "cookie",
  cookieDomain: window?.location?.hostname,
  cookieSecure: window?.location?.protocol === "https:",
});

// Define the Providers component
export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <Provider store={store}>
      <AuthProvider store={authStore as any}>
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
