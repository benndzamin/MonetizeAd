"use client";
import { useRouter } from "next/navigation";
import { useState, ChangeEvent, FormEvent } from "react";

const RegistrationForm = () => {
  const router = useRouter();

  // Define the structure of the form data and validation errors
  interface FormData {
    username: string;
    password: string;
    repeatPassword: string;
    yearOfBirth: string;
    gender: string;
    status: string;
    subscribeToNewsLetter: boolean;
  }

  // State to manage form data
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    yearOfBirth: "",
    gender: "",
    status: "",
    subscribeToNewsLetter: false,
  });

  // State to manage submission status and validation errors
  const [submissionStatus, setSubmissionStatus] = useState({
    isSuccess: false,
    errorMessage: "",
  });

  const [validationErrors, setValidationErrors] = useState({
    username: "",
    password: "",
    repeatPassword: "",
    yearOfBirth: "",
    gender: "",
    status: "",
    subscribeToNewsLetter: "",
  });

  const handleInputChange = (
    e: ChangeEvent<
      | HTMLInputElement
      | HTMLSelectElement
      | HTMLTextAreaElement
      | HTMLInputElement
    >
  ) => {
    const { name, value, type } = e.target;
    const inputValue =
      type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : name === "yearOfBirth"
        ? parseInt(value, 10)
        : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: inputValue,
    }));
  };

  // Validate form
  const validateForm = () => {
    const errors = {
      username: "",
      password: "",
      repeatPassword: "",
      yearOfBirth: "",
      gender: "",
      status: "",
      subscribeToNewsLetter: "",
    };

    if (
      !formData.username ||
      formData.username.length < 3 ||
      formData.username.length > 20
    ) {
      errors.username = "Username must be between 3 and 20 characters.";
    }

    if (
      !formData.password ||
      formData.password.length < 6 ||
      formData.password.length > 20
    ) {
      errors.password = "Password must be between 6 and 20 characters.";
    }

    if (formData.password !== formData.repeatPassword) {
      errors.repeatPassword = "Passwords do not match.";
    }

    if (formData.subscribeToNewsLetter !== true) {
      errors.subscribeToNewsLetter =
        "To register you must be subscribed to the newsletter.";
    }

    if (!["male", "female"].includes(formData.gender)) {
      errors.gender = "Invalid gender value.";
    }

    if (!["active", "inactive"].includes(formData.status)) {
      errors.status = "Invalid status value.";
    }

    const yearOfBirth = parseInt(formData.yearOfBirth, 10);
    if (!yearOfBirth || yearOfBirth < 1900 || yearOfBirth > 2024) {
      errors.yearOfBirth = "Invalid year of birth.";
    }

    setValidationErrors(errors);
    return Object.values(errors).every((error) => !error);
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await fetch(
          "https://junior-test.mntzdevs.com/api/register/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );

        if (response.ok) {
          setSubmissionStatus({
            isSuccess: true,
            errorMessage: "You have successfully signed up!",
          });
          setTimeout(() => {
            router.push("/login");
          }, 1500);
        } else {
          const errorData = await response.json();
          setSubmissionStatus({
            isSuccess: false,
            errorMessage: errorData.message || "Registration failed.",
          });
        }
      } catch (error) {
        setSubmissionStatus({
          isSuccess: false,
          errorMessage: "Registration failed.",
        });
      }
    }
  };

  return (
    <form
      className="max-w-md mx-auto flex flex-col w-full items-center justify-center my-20"
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
        {validationErrors.password && (
          <p style={{ color: "red" }}>{validationErrors.password}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="password"
          name="repeatPassword"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={formData.repeatPassword}
          onChange={handleInputChange}
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Repeat Password
        </label>
        {validationErrors.repeatPassword && (
          <p style={{ color: "red" }}>{validationErrors.repeatPassword}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <input
          type="number"
          name="yearOfBirth"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=" "
          required
          value={formData.yearOfBirth}
          onChange={handleInputChange}
        />
        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Year of birth:
        </label>
        {validationErrors.yearOfBirth && (
          <p style={{ color: "red" }}>{validationErrors.yearOfBirth}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label className="block text-sm text-gray-500 mb-2 dark:text-gray-400">
          Gender:
        </label>
        <div className="flex space-x-4">
          <label className="block">
            <input
              type="radio"
              name="gender"
              value="male"
              checked={formData.gender === "male"}
              onChange={handleInputChange}
              required
            />
            <span className="ml-2">Male</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="gender"
              value="female"
              checked={formData.gender === "female"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Female</span>
          </label>
        </div>
        {validationErrors.gender && (
          <p style={{ color: "red" }}>{validationErrors.gender}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label className="block text-sm text-gray-500 mb-2 dark:text-gray-400">
          Status:
        </label>
        <div className="flex space-x-4">
          <label className="block">
            <input
              type="radio"
              name="status"
              value="active"
              checked={formData.status === "active"}
              onChange={handleInputChange}
              required
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="block">
            <input
              type="radio"
              name="status"
              value="inactive"
              checked={formData.status === "inactive"}
              onChange={handleInputChange}
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
        {validationErrors.status && (
          <p style={{ color: "red" }}>{validationErrors.status}</p>
        )}
      </div>

      <div className="relative z-0 w-full mb-5 group">
        <label className="block text-sm text-gray-500 mb-2 dark:text-gray-400">
          Subscribe to Newsletter:
        </label>
        <input
          type="checkbox"
          name="subscribeToNewsLetter"
          checked={formData.subscribeToNewsLetter}
          onChange={handleInputChange}
          required
        />
        {validationErrors.subscribeToNewsLetter && (
          <p style={{ color: "red" }}>
            {validationErrors.subscribeToNewsLetter}
          </p>
        )}
      </div>

      <button
        className="text-white p-2 rounded-lg text-lg font-medium hover:bg-white hover:text-black cursor-pointer bg-gray-500 px-8 border-gray-500 border-2"
        type="submit"
      >
        Register
      </button>

      {submissionStatus.errorMessage && (
        <p
          className={`${
            submissionStatus.isSuccess ? "bg-green-200" : "bg-red-200"
          } px-8 py-4 rounded-lg m-6 text-red-800`}
        >
          {submissionStatus.errorMessage}
        </p>
      )}
    </form>
  );
};

export default RegistrationForm;
