// src/layouts/DefaultLayout/components/Logo/index.jsx

import clsx from "clsx";
import { Link } from "react-router";
import styles from "./Logo.module.scss";
import appLogo from "@/assets/images/f8_icon.png";
import { logoPropTypes } from "@/utils/propTypes.js";

function Logo({
  src = appLogo,
  alt,
  text,
  size = "small",
  to = "/",
  className,
}) {
  // let location = useLocation();
  // console.log("location", location);
  return (
    <Link to={to} className={clsx(styles.logo, styles[size], className)}>
      {src ? <img src={src} alt={alt || "Logo"} /> : null}
      {text ? <span>{text}</span> : null}
    </Link>
  );
}

Logo.propTypes = logoPropTypes;

export default Logo;
