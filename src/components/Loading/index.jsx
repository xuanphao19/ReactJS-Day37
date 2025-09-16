import prevload from "../../assets/icons/prevload.svg";
import clsx from "clsx";

import css from "./Loading.module.scss";

const Loading = ({ className, position = "static" }) => (
  <div className={clsx(css.loading, css[position], className)}>
    <img src={prevload} alt="loading" />
  </div>
);
export default Loading;
