import React, { useEffect, useState } from "react";
import Loading from "./Loading";
import axios from "axios";

const DashBoard = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(true);

  // Fetch recent users
  useEffect(() => {
    setLoadingUsers(true);
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error))
      .finally(() => setLoadingUsers(false));
  }, []);

  // Fetch recent products
  useEffect(() => {
    setLoadingProducts(true);
    axios
      .get("https://api.restful-api.dev/objects")
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error))
      .finally(() => setLoadingProducts(false));
  }, []);

  if (loadingUsers || loadingProducts) {
    return <Loading />;
  }

  return (
    <div className="w-full p-4 md:p-6">
    <h1 className="font-semibold md:hidden mb-6">Welcome to Admin Dashboard</h1>
      {/* Dashboard Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-violet-700">Total Users</h3>
          <p className="mt-2 text-green-600 text-3xl md:text-4xl">{users.length}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-violet-700">Total Products</h3>
          <p className="mt-2 text-green-600 text-3xl md:text-4xl">{products.length}</p>
        </div>
        <div className="p-6 bg-white rounded-xl shadow-md">
          <h3 className="text-lg md:text-xl font-semibold text-violet-700">Total Orders</h3>
          <p className="mt-2 text-red-600 text-3xl md:text-4xl">5</p>
        </div>
      </div>

      {/* Recent Users & Products Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        {/* Recent Users */}
        <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-violet-700">Recent Users</h3>
          <table className="w-full min-w-[300px] text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="border-b py-2 px-2">Name</th>
                <th className="border-b py-2 px-2">Email</th>
              </tr>
            </thead>
            <tbody>
              {users.slice(0, 5).map((user) => (
                <tr key={user.id} className="hover:bg-gray-100">
                  <td className="py-2 px-2">{user.name}</td>
                  <td className="py-2 px-2">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recently Added Products */}
        <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-violet-700">Recently Added Products</h3>
          <table className="w-full min-w-[300px] text-left">
            <thead>
              <tr className="text-gray-500">
                <th className="border-b py-2 px-2">Product Name</th>
                <th className="border-b py-2 px-2">Price</th>
              </tr>
            </thead>
            <tbody>
              {products.slice(0, 5).map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="py-2 px-2">{product.name}</td>
                  <td className="py-2 px-2">${product.price || "Not available"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
