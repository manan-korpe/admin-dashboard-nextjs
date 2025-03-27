"use client"
import Link from "next/link";
import { useState } from "react";
export default function Login() {
  return (
    <main>
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-10 max-w-6xl max-md:max-w-md w-full">
          <div>
            <h2 className="lg:text-5xl text-3xl font-bold lg:leading-[57px] text-slate-400 first-letter:text-amber-300 first-letter:text-6xl">
             Admin Dashboard
            </h2>
            <p className="text-sm mt-6 text-slate-500 leading-relaxed">
              Immerse yourself in a hassle-free login journey with our
              intuitively designed login form. Effortlessly access your account.
            </p>
            <p className="text-sm mt-12 text-slate-500">
              Don't have an account{" "}
              <Link
                href="/signin"
                className="text-blue-600 font-medium hover:underline ml-1"
              >
                Register here
              </Link>
            </p>
          </div>

          <form className="max-w-md md:ml-auto w-full">
            <h3 className="text-slate-500 lg:text-3xl text-2xl font-bold mb-8">
              Login
            </h3>

            <div className="space-y-6">
              <div>
                <label className="text-sm text-slate-400 font-medium mb-2 block">
                  Email
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 "
                  placeholder="Enter Email"
                />
              </div>
              <div>
                <label className="text-sm text-slate-400 font-medium mb-2 block">
                  Password
                </label>
                <input
                  name="password"
                  type="password"
                  required
                  className="bg-slate-100 w-full text-sm text-slate-800 px-4 py-3 rounded-md outline-none border focus:border-blue-600 "
                  placeholder="Enter Password"
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-slate-500"
                  >
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href="jajvascript:void(0);"
                    className="text-blue-600 hover:text-blue-500 font-medium"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>

            <div className="!mt-12">
              <button
                type="button"
                className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              >
                Log in
              </button>
            </div>

           
          </form>
        </div>
      </div>
    </main>
  );
}
