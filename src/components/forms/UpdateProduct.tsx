"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface dataInterface {
  id?:String
  name: string;
  // image: String;
  category: string;
  price: string;
}

interface errorInterface {
  isError: Boolean;
  errorMessage: String;
}

export default function UpdateProduct({
  id,
  name,
  price,
  category,
}: dataInterface) {
  const route = useRouter(); //refrach page after update product
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [error, setError] = useState<errorInterface>({
    isError: false,
    errorMessage: "",
  });

  const [data, setData] = useState<dataInterface>({
    name: name || "",
    category: category || "",
    price: price || "",
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
      if (
        !tempData.name.trim() ||
        !tempData.category.trim() ||
        !tempData.price.trim()
      ) {
        setError({ isError: true, errorMessage: "Enter valid Details" });
        return;
      }

      const response = await axios.put(`/api/product?id=${id}`, {
        ...tempData,
        image: "temp",
      });
      console.log(response);
      route.refresh();
      setIsHidden(true);
    } catch (error: any) {
      console.log(error)
      setError({
        isError: true,
        errorMessage: error.response?.data?.message || "not found",
      });
    }
  }

  return (
    <>
      <button
        onClick={() => setIsHidden(false)}
        type="button"
        className="bg-blue-600 py-1 px-2 rounded hover:bg-blue-500 text-white"
      >
        update
      </button>

      <div className={isHidden ? "hidden" : ""}>
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
                product name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                value={data.name}
                onChange={setDataHandler}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                category
              </label>
              <input
                type="text"
                id="category"
                name="category"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={setDataHandler}
                value={data.category}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                price
              </label>
              <input
                type="text"
                id="price"
                name="price"
                className="shadow-xs bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-xs-light"
                onChange={setDataHandler}
                value={data.price}
              />
            </div>
            <div className="mb-5 text-red-600">
              <small>{error.isError == true && error.errorMessage}</small>
            </div>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Now
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
