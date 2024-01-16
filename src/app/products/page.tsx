"use client";
import React, { useState, useEffect, ChangeEvent } from "react";
import withAuth from "../../lib/withAuth";

// Define the structure of a Product and LinkedProduct
interface Product {
  id: number;
  name: string;
  price: number;
  linkedProducts?: { [key: string]: LinkedProduct };
}

interface LinkedProduct {
  id: number;
  name: string;
  price: number;
}

const Products: React.FC = () => {
  // State to manage products data
  const [products, setProducts] = useState<Product[]>([]);
  // State to manage current page
  const [currentPage, setCurrentPage] = useState<number>(1);
  // State to manage items per page
  const [itemsPerPage, setItemsPerPage] = useState<number>(5);
  // State to manage page numbers for pagination
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);

  // Retrieve JWT token from local storage
  const token = localStorage.getItem("jwt");

  //fetch data from API endpoint
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://junior-test.mntzdevs.com/api/products/",
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          setProducts(Object.values(data.products));

          // Calculate page numbers based on the total number of products
          const totalPages = Math.ceil(products.length / itemsPerPage);
          setPageNumbers(
            Array.from({ length: totalPages }, (_, index) => index + 1)
          );
        } else {
          console.error("Problem while fetchinf products");
        }
      } catch (error) {
        console.error("Error while fetchinf products", error);
      }
    };

    fetchData();
  }, [token, itemsPerPage, products.length]);

  // Get current items based on pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  //event for changing items per page
  const handleItemsPerPageChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedItemsPerPage: number = parseInt(e.target.value, 10);
    setItemsPerPage(selectedItemsPerPage);
    setCurrentPage(1); // Reset current page when changing items per page
  };

  return (
    <div className="container mx-auto py-16">
      <div className="flex flex-col w-full items-center justify-center mb-24">
        <h1 className="text-blue-900 text-4xl font-bold text-center w-full max-w-lg mb-4 h-16 z-0 flex items-center justify-center">
          Products
        </h1>

        {/* display products */}
        <table className="min-w-[50%] bg-white border border-gray-300 shadow-lg rounded-md overflow-hidden">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-200 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                Linked Products - prices
              </th>
            </tr>
          </thead>
          <tbody>
            {/* Display each product row */}
            {currentItems.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.price}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {product.linkedProducts &&
                  Object.values(product.linkedProducts).length > 0 ? (
                    Object.values(product.linkedProducts).map(
                      (linkedProduct) => (
                        <div key={linkedProduct.id}>
                          {linkedProduct.name} - {linkedProduct.price}
                        </div>
                      )
                    )
                  ) : (
                    <div>No linked items</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}

        <div className="flex mt-6 ">
          <div className="mx-1 px-4 py-2 bg-gray-500 rounded-md ">
            <label htmlFor="itemsPerPage" className="mr-2 text-white">
              Items per page:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
            </select>
          </div>

          {/* Display page number buttons */}
          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              onClick={() => paginate(pageNumber)}
              className={`mx-1 px-4 py-2 bg-gray-500 text-white rounded-md ${
                currentPage === pageNumber ? "font-bold bg-gray-800" : ""
              }`}
            >
              {pageNumber}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
//apply the HOC component for authentication
export default withAuth(Products);
