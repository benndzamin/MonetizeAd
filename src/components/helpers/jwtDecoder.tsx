"use client";
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  username: string;
}

const getDecodedToken = () => {
  const token = localStorage.getItem("jwt");
  if (token) {
    try {
      const decodedToken: JwtPayload = jwtDecode(token);
      return decodedToken;
    } catch (error) {
      return null;
    }
  }

  return null;
};

export default getDecodedToken;
