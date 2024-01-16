"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";

// Define the structure of the form data and submission status
interface FormData {
  username: string;
  password: string;
}

interface SubmissionStatus {
  isSuccess: boolean;
  errorMessage: string;
}

const LoginForm: React.FC = () => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });

  // State to manage submission status
  const [submissionStatus, setSubmissionStatus] = useState<SubmissionStatus>({
    isSuccess: false,
    errorMessage: "",
  });

  // Event handler for input changes in the form
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Event handler for form submission
  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Send a POST request to the login API
      const response = await fetch(
        "https://junior-test.mntzdevs.com/api/login/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        // If login is successful, extract the JWT from the response and store JWT in localStorage
        const data = await response.json();
        localStorage.setItem("jwt", data.jwt);

        // Update submission status to indicate success
        setSubmissionStatus({
          isSuccess: true,
          errorMessage: "",
        });

        // Reload and redirects to home (timeout is to see the "sucessful login" notification)
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        // If login fail handle the error and update status
        const errorData = await response.json();
        setSubmissionStatus({
          isSuccess: false,
          errorMessage: errorData.message || "Login failed.",
        });
      }
    } catch (error) {
      // Handle unexpected errors
      setSubmissionStatus({
        isSuccess: false,
        errorMessage: "Login failed.",
      });
    }
  };

  return (
    <div>
      {submissionStatus.isSuccess ? (
        // If login is successful - display a success message
        <p className="bg-green-200 px-8 py-4 rounded-lg mb-10">
          Login successful!
        </p>
      ) : (
        // If login is NOT successful - display the login form
        <form
          className="max-w-md mx-auto flex flex-col w-full items-center justify-center mb-20"
          onSubmit={handleFormSubmit}
        >
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="text"
              name="username"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.username}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Username
            </label>
          </div>
          <div className="relative z-0 w-full mb-5 group">
            <input
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=" "
              required
              value={formData.password}
              onChange={handleInputChange}
            />
            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
              Password
            </label>
          </div>
          <br />
          <button
            className="text-white p-2 rounded-lg text-lg font-medium hover:bg-white hover:text-black cursor-pointer bg-gray-500 px-8 border-gray-500 border-2"
            type="submit"
          >
            Login
          </button>
          {/* Display error message if login fails */}
          {submissionStatus.errorMessage && (
            <p className="bg-red-300 mt-10 rounded-lg px-8 py-4">
              {submissionStatus.errorMessage}
            </p>
          )}
        </form>
      )}
    </div>
  );
};

export default LoginForm;
