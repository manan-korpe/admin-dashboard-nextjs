import axios from "axios";

async function getTotalusers(){
  try {
    const rawResponse = await fetch(" http://localhost:3000/api/auth/profile");
    const response = await rawResponse.json();
    return response?.totalUsers || 0; 
  } catch (error:any) {
    return error.message;
  }
}

export default async function Dashboard() {
  const totalUser = await getTotalusers();

  return (
    <>
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex items-center justify-center h-24 rounded-sm bg-gray-50 dark:bg-gray-800">
          <p className="text-2xl text-gray-400 dark:text-gray-500">
           Total Users
           <span className="block text-xl text-center mt-2 text-white">{totalUser}</span>
          </p>
        </div>
      </div>
      
    </>
  );
}
