"use client";
import { FunctionComponent, useState, useEffect } from "react";
import { NavbarLinkProps, NavbarLinkType } from "./types";
import Link from "next/link";
import getDecodedToken from "../helpers/jwtDecoder";

const NavbarLink: FunctionComponent<NavbarLinkProps> = ({ navbarLink }) => {
  return (
    <Link href={navbarLink.href}>
      <button className="text-white p-2 rounded-lg text-lg font-medium hover:bg-white hover:text-black cursor-pointer bg-#152238 px-6">
        {navbarLink.text}
      </button>
    </Link>
  );
};

const Navbar: FunctionComponent = () => {
  const [visibility, setVisibility] = useState<boolean | null>(null);

  useEffect(() => {
    const decodedToken = getDecodedToken();

    if (decodedToken) {
      setVisibility(false);
    } else {
      setVisibility(true);
    }
  }, []);

  const navbarLinks: NavbarLinkType[] = [
    {
      text: "Home",
      href: "/home",
    },
    {
      text: "About MonetizeAd",
      href: "/about",
    },
    {
      text: "Our projects",
      href: "/work",
    },
    {
      text: "Products",
      href: "/products",
      hidden: visibility ?? false,
    },
  ];

  return (
    <ul>
      {navbarLinks.map((navbarLink, index) => {
        return navbarLink.hidden ? null : (
          <NavbarLink key={index} navbarLink={navbarLink} />
        );
      })}
    </ul>
  );
};

export default Navbar;
