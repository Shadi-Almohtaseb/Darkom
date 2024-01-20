"use client";
import { NextPage } from "next";
import withAuth from "@/utils/withAuth";
import Navbar from "@/components/Navbar";
import "../styles/globals.css";

const Home: NextPage = () => {
  return (
    <main className="dark:bg-default-50">
      <Navbar />
      <h1>hello world</h1>
      <div>body</div>
    </main>
  );
};

export default withAuth(Home);
