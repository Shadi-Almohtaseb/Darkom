"use client";
import React, { useEffect, useState } from "react";
import { redirect } from "next/navigation";
import useAuthUser from "react-auth-kit/hooks/useAuthHeader";
import useIsAuthenticated from "react-auth-kit/hooks/useIsAuthenticated";

const withAuth = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const auth = useAuthUser() as any;
    const isAuthenticated = useIsAuthenticated();

    useEffect(() => {
      if (!auth && !isAuthenticated()) {
        redirect("/login-shop");
      }
    }, [auth, isAuthenticated()]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
