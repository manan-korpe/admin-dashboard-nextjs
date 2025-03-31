"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface dataInterface {
  username: String;
  email: String;
  password: String;
}

interface errorInterface {
  isError: Boolean;
  errorMessage: String;
}

export default function UserForm({
  userid,
  username,
  email,
  password,
}: {
  userid: String;
  username: String;
  email: String;
  password: String;
}) {
  const route = useRouter();
  const [error, setError] = useState<errorInterface>({
    isError: false,
    errorMessage: "",
  });
  const [ishidden, setIsHidden] = useState<boolean>(true);
  const [data, setData] = useState<dataInterface>({
    username: username || "",
    email: email || "",
    password: password || "",
  });

  function setDataHandler(e: React.ChangeEvent<HTMLInputElement>) {
    setData((pre) => ({
      ...pre,
      [e.target.name]: e.target.value,
    }));
  }

  async function submithandler(e: React.FormEvent<HTMLFormElement>) {
    try {
      e.preventDefault();
      const tempData: dataInterface = data;

      // tempData.forEach((value:String)=>{
      //   value = value.trim();
      // });

      if (!tempData.email.trim() || !tempData.password.trim()) {
        setError({ isError: true, errorMessage: "Enter valid Details" });
        return;
      }

      const response = await axios.put(
        `/api/auth/profile?userid=${userid}`,
        tempData
      );
      
      route.refresh();
      setIsHidden(true);
      
    } catch (error: any) {
      setError({
        isError: true,
        errorMessage: error.response.data.message,
      });
    }
  }

  return (
    <>
      <button
        type="button"
        className="bg-blue-600 py-1 px-2 rounded hover:bg-blue-500 text-white"
        onClick={() => setIsHidden(!ishidden)}
      >
        Update
      </button>
      <div className={ishidden ? "hidden" : ""}>
        <div className=" fixed top-0 left-0 w-full h-full flex items-center justify-center z-100  bg-gray-500/45">
          <form
            onSubmit={submithandler}
            className="absolute bg-black w-full max-w-lg mx-auto px-5 py-8 rounded"
            name="update-user"
          >
            <div className="mb-5 text-end  ">
              <button
                type="button"
                onClick={() => setIsHidden(true)}
                className=" text-[16px] w-8 h-8 bg-gray-600 rounded-4xl hover:bg-gray-500"
              >
                X
              </button>
            </div>
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                User Name
              </label>
              <input
                type="text"
                id="username"
                name="username"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                value={data.username}
                disabled
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={setDataHandler}
                value={data.email}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={setDataHandler}
                value={data.password}
              />
            </div>
            <div className="mb-5 text-red-600">
              <small>{error.isError == true && error.errorMessage}</small>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Update Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
