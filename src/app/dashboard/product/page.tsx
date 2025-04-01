import AddProduct from "@/components/forms/addProduct";
import UpdateProduct from "@/components/forms/UpdateProduct";
import dbConnection from "@/lib/dbConnection";
import categorys from "@/models/caregory"; //note is not import category then it will throw error
import products from "@/models/product";

dbConnection();
export default async function Product() {
  const product = await products.find().populate("category");
  
  return (
    <>
      <div className="flex items-center justify-between p-3 bg-blue-800 m-3 rounded-xl">
        <h5 className="tracking-widest">Product</h5>
        <AddProduct/>
      </div>
      <div className="px-4">
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-md text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr className="text-[1rem]">
                
                <th scope="col" className="px-6 py-3">
                  Product name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Category
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {product.length == 0 ? <h3>product not </h3> :product.map((value,index)=>(
                 <tr key={index} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                 <th
                   scope="row"
                   className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                 >
                   {value.name}
                 </th>
                 <td className="px-6 py-3">
                 <div>
                   
                   <img data-tooltip-target="tooltip-jese" className="w-10 h-10 rounded-sm" src="https://flowbite.com/docs/images/people/profile-picture-5.jpg" alt="Medium avatar"/>
                 </div>
                 </td>
                 <td className="px-6 py-3">{value.category.name}</td>
                 <td className="px-6 py-3">${value.price}</td>
                 <td className="px-6 py-3">
                   <UpdateProduct id={value._id.toString()} name={value.name} category={value.category.name} price={value.price.toString()}/>
                 </td>
               </tr>
              ))}
             
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
