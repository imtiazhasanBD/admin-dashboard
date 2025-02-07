import { useEffect, useState } from "react";
import axios from "axios";
import { FiPlus, FiX } from "react-icons/fi";
import { Trash } from "lucide-react";
import { Eye } from "lucide-react";
import { Link } from "react-router-dom";
import Loading from "../components/Loading";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortCriteria, setSortCriteria] = useState("name");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true); // Ensure loading state starts
    axios
      .get("https://api.restful-api.dev/objects")
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Stop loading on error
      });
  }, []);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  // Handle search and sort
  const filteredProducts = products
    .filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortCriteria === "name") {
        return a.name.localeCompare(b.name);
      } else if (sortCriteria === "price") {
        return (a.data?.price || 0) - (b.data?.price || 0);
      }
      return 0;
    });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleDeleteProduct = () => {
    if (productToDelete) {
      axios
        .delete(`https://api.restful-api.dev/objects/${productToDelete}`)
        .then(() => {
          setProducts(
            products.filter((product) => product.id !== productToDelete)
          );
          setShowDeletePopup(false);
          setProductToDelete(null);
        })
        .catch((error) => console.error("Error deleting product:", error));
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg overflow-x-scroll w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-xl font-bold text-gray-700">Products List</h1>
        <div className="flex flex-col-reverse md:flex-row gap-4 mt-4 md:mt-0 w-full md:w-auto">
          <input
            type="search"
            placeholder="Search Products"
            className="px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600 w-full md:w-auto"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="flex sm:gap-4 sm:justify-end justify-between">
            <select
              className="px-3 py-2 border rounded-md text-gray-600 bg-white"
              value={sortCriteria}
              onChange={(e) => setSortCriteria(e.target.value)}
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
            <Link
              to="/productupload"
              className="py- px-3 bg-violet-600 text-white text-sm flex items-center gap-2 rounded-md hover:bg-violet-700"
            >
              <button className="flex items-center gap-2 font-semibold">
                <FiPlus size={"1rem"} />
                Add Product
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse border border-gray-300 text-sm text-left text-gray-600">
          <thead className="bg-gray-100 text-gray-700 uppercase">
            <tr>
              <th className="px-4 py-2 border border-gray-300">Product Name</th>
              <th className="px-4 py-2 border border-gray-300">Price</th>
              <th className="px-4 py-2 border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border border-gray-300">
                    {product.name}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    {product?.data?.price || "Not available"}
                  </td>
                  <td className="px-4 py-2 border border-gray-300">
                    <div className="flex gap-6">
                      <Eye
                        size={18}
                        className="text-violet-700 hover:underline cursor-pointer"
                        onClick={() => setSelectedProduct(product)}
                      />

                      <Trash
                        size={18}
                        className="text-red-600 hover:underline cursor-pointer"
                        onClick={() => {
                          setShowDeletePopup(true);
                          setProductToDelete(product.id);
                        }}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="px-4 py-2 text-center text-gray-500">
                  No products available
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

      {/* Modal Popup for Product Details */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-2xl w-96 shadow-xl relative transform scale-100 transition-all duration-300 ease-in-out">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 transition duration-300"
              onClick={() => setSelectedProduct(null)}
            >
              <FiX size={24} className="text-indigo-700 hover:text-red-500" />
            </button>
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 border-b pb-2">
              Product Details
            </h2>
            <p className="mb-3 text-gray-700">
              <strong className="text-gray-900">Name:</strong>{" "}
              {selectedProduct?.name}
            </p>
            <div className="space-y-2">
              {Object.entries(selectedProduct?.data)?.map(
                ([key, value], index) => (
                  <p
                    className="mb-2 text-gray-700 flex justify-between border-b pb-1"
                    key={index}
                  >
                    <strong className="text-gray-900">{key}:</strong>{" "}
                    <span>{value}</span>
                  </p>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Confirmation Popup for Delete Action */}
      {showDeletePopup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <h2 className="text-lg font-semibold mb-4">
              Are you absolutely sure?
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              This action cannot be undone. This will permanently delete the
              product.
            </p>
            <div className="flex justify-end gap-4">
              <button
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
                onClick={() => setShowDeletePopup(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDeleteProduct}
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
