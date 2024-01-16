export interface NavbarLinkProps {
  navbarLink: NavbarLinkType;
}

export type NavbarLinkType = {
  text: string;
  href: string;
  hidden?: boolean;
};
