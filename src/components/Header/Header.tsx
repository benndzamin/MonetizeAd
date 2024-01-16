import { Children, FunctionComponent, useState } from "react";
import { HeaderProps } from "./types";

const Header: FunctionComponent<HeaderProps> = ({ children }) => {
  return (
    <div className="w-full flex justify-between p-4 bg-gray-500 px-20">
      {children}
    </div>
  );
};

export default Header;
