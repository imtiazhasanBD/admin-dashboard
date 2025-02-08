import { useState } from "react";
import axios from "axios";
import { FiUpload } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProductUpload = () => {
  const [product, setProduct] = useState({
    id: "",
    name: "",
    image: null,
    price: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setProduct((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.id ||
      !product.name ||
      !product.price ||
      !product.description
    ) {
      toast.error("Please fill in all the required fields.");
      return;
    }

    const postData = {
      id: product.id,
      name: product.name,
      image: product.image,
      data: {
        price: product.price,
        description: product.description,
      },
    };
console.log(postData);

    const fetchSubmission = axios.post(
      "https://api.restful-api.dev/objects",
      postData
    );

    toast.promise(
      fetchSubmission,
      {
        pending: "Product Uploading...",
        success: "Product uploaded successfully!",
        error: "Form submission failed. Please try again. 😞",
      },
      {
        position: "bottom-left",
        autoClose: 3000,
        theme: "colored",
      }
    );

    try {
      await fetchSubmission;
      setProduct({ id: "", name: "", image: null, price: "", description: "" });
    } catch (error) {
      console.error("Error uploading product:", error);
    }
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-md shadow-md w-full mx-auto">
      <h2 className="text-2xl font-bold text-gray-700 mb-6">Upload Product</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product ID *
          </label>
          <input
            type="text"
            name="id"
            value={product.id}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600"
            placeholder="Enter Product ID"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Name *
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600"
            placeholder="Enter Product Name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Product Image
          </label>
          <div className="flex items-center gap-4">
            <input
              type="file"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="px-4 py-2 bg-gray-200 text-gray-700 cursor-pointer rounded-md flex items-center gap-2 hover:bg-gray-300"
            >
              <FiUpload /> Choose File
            </label>
            {product.image && <span>{product.image.name}</span>}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Price *
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600"
            placeholder="Enter Price"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Description *
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-violet-600"
            placeholder="Enter Product Description"
            rows="4"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-violet-600 text-white py-2 px-4 rounded-md hover:bg-violet-700"
        >
          Upload Product
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default ProductUpload;
