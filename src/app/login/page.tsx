"use client";
import LoginForm from "./loginform";
import Link from "next/link";
import withAuth from "../../lib/withAuth";

const LoginPage = () => {
  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-col w-full items-center justify-center">
        <h1 className="text-blue-900 text-3xl font-bold text-center w-full max-w-lg mb-0.1 h-16 z-0 flex items-center justify-center">
          Login
        </h1>
        <br />
        <br />
        <LoginForm />
        <h1 className="text-blue-900 text-2xl font-bold text-center w-full max-w-lg mb-0.1 h-16 z-0 flex items-center justify-center">
          Don&apos;t have an account yet?
        </h1>
        <Link href="/registration">
          <button className="text-white p-2 rounded-lg text-lg font-medium hover:bg-white hover:text-black cursor-pointer bg-gray-500 px-6 border-2 border-gray-500">
            Sign up!
          </button>
        </Link>
      </div>
    </div>
  );
};

export default withAuth(LoginPage);
