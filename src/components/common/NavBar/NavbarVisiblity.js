import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function NavBarVisibility({ children }) {
  const location = useLocation();
  const [showNavBar, setShowNavBar] = useState(false);

  useEffect(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/market" ||
      location.pathname === "/cart" ||
      location.pathname === "/profile" ||
      location.pathname === "/checkout"
    ) {
      setShowNavBar(true);
    } else {
      setShowNavBar(false);
    }
  }, [location]);

  return <div>{showNavBar && children}</div>;
}
