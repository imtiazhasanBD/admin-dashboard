import { useEffect, useState } from "react";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { Eye } from "lucide-react";
import Loading from "../components/Loading";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(8);

  // Handle search and sort
  const filteredUsers = users
    .filter((user) =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === "email") {
        return a.email.localeCompare(b.email);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (isLoading) {
    return <Loading />;
  }
  console.log(selectedUser);

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-scroll w-full">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-xl font-bold text-gray-700">Users List</h1>
        <div className="flex flex-col-reverse md:flex-row gap-4 mt-4 md:mt-0 w-full justify-end">
          <input
            type="search"
            placeholder="Search Users"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex sm:gap-4 sm:justify-end justify-end">
            <select
              className="px-3 py-2 border rounded-md text-gray-600 bg-white"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="email">Sort by Email</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-300">User Name</th>
              <th className="px-4 py-2 border border-gray-300">Email</th>
              <th className="px-4 py-2 border border-gray-300">City Name</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {user.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.email}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {user.address?.city}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <Eye
                      size={18}
                      className="text-violet-700 hover:underline cursor-pointer"
                      onClick={() => setSelectedUser(user)}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                  No users available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal Popup for User Details */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 lg:w-[500px] shadow-xl relative transform scale-100 transition-all duration-300 ease-in-out">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={() => setSelectedUser(null)}
            >
              <FiX size={24} className="text-indigo-700 hover:text-red-500" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b pb-2">
              User Details
            </h2>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Name:</strong>{" "}
              {selectedUser.name}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Username:</strong>{" "}
              {selectedUser.username}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Email:</strong>{" "}
              {selectedUser.email}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Phone:</strong>{" "}
              {selectedUser.phone}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Website:</strong>{" "}
              {selectedUser.website}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Company:</strong>{" "}
              {selectedUser.company.name}
            </p>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Address:</strong>{" "}
              {selectedUser.address.street}, {selectedUser.address.suite},{" "}
              {selectedUser.address.city}, {selectedUser.address.zipcode}
            </p>
            <p className="text-gray-700">
              <strong className="text-gray-900">Geo Location:</strong> Lat{" "}
              {selectedUser.address.geo.lat}, Lng {selectedUser.address.geo.lng}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Users;
