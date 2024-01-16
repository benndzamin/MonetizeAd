import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

const withAuth = (WrappedComponent: React.FC) => {
  const Auth: React.FC = (props) => {
    const router = useRouter();
    const pathname = usePathname();

    // getting jwt token from localStorage
    const token = localStorage.getItem("jwt");
    let isAuthenticated = false;

    // authentication logic here
    if (token) {
      isAuthenticated = true;
    }

    useEffect(() => {
      if (!isAuthenticated) {
        router.push("/login"); // Redirect to login page if not authenticated
      } else if (isAuthenticated && pathname === "/login") {
        router.push("/home"); // Redirect to home page if authenticated and pathname = "/login"
      }
    }, [isAuthenticated, router, pathname]);

    if (isAuthenticated) {
      return <WrappedComponent {...props} />;
    } else if (!isAuthenticated && pathname === "/login") {
      return <WrappedComponent {...props} />;
    } else return null;
  };

  return Auth;
};

export default withAuth;
