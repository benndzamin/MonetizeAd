"use client";
import { FunctionComponent, useState, useEffect } from "react";
import { LoginProps } from "./types";
import getDecodedToken, { JwtPayload } from "../helpers/jwtDecoder";
import { useRouter } from "next/navigation";

const Login: FunctionComponent<LoginProps> = () => {
  const router = useRouter();

  const [userData, setUserData] = useState<JwtPayload | null>(null);
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const decodedToken = getDecodedToken();

    if (decodedToken) {
      setUserData({
        username: decodedToken.username,
      });
    }
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const logout = () => {
    localStorage.removeItem("jwt");
    setUserData(null);
    setDropdownOpen(false);
    router.push("/login");
    window.location.reload();
  };

  return (
    <div className="text-white p-2 px-6 rounded-lg text-lg font-medium hover:bg-white hover:text-black cursor-pointer bg-#152238">
      <div>
        {userData ? (
          <>
            <button onClick={toggleDropdown}>
              Welcome, {userData.username}!
            </button>
            {isDropdownOpen && (
              <div className="absolute right-20 mt-4 bg-white text-black rounded-md shadow-lg border-2 border-gray-500">
                <button className="block px-4 py-2 text-sm" onClick={logout}>
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </div>
  );
};

export default Login;
