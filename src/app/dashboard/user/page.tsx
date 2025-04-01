import UserForm from "@/components/forms/UserForm";
import AddUser from "@/components/forms/AddUser";
import dbConnection from "@/lib/dbConnection"; 
import users from "@/models/users";
import { Suspense } from "react";

dbConnection();

export default async function User() {
    const dbUsers = await users.find();
    
    return (
      <>
      <Suspense fallback="loding...">
        <div className="flex items-center justify-between p-3 bg-blue-800 m-3 rounded-xl ">
          <h5 className="tracking-widest ">User</h5>
          <AddUser/>
        </div>
        <div className="px-4">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    user name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3">
                    password
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Admin
                  </th>
                  <th scope="col" className="px-6 py-3">
                    created At
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {dbUsers && dbUsers.map((value,index)=>(

                <tr key={index} className="text-sm odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                  <th
                    scope="row"
                    className="px-6 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {value.username}
                  </th>
                  <td className="px-6 py-3">{value.email}</td>
                  <td className="px-6 py-3">{value.password}</td>
                  <td className="px-6 py-3">{value.isAdmin ? "Yes" : "No"}</td>
                  <td className="px-6 py-3">{value.createAt.toISOString()}</td>
                  <td className="px-6 py-3">
                    
                    <UserForm userid={value._id.toString()} username={value.username} email={value.email} password={value.password}/>
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Suspense>
      </>
    );
  }
  