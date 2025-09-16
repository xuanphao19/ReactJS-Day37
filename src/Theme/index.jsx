import { useEffect, useState } from "react";
import clsx from "clsx";
import css from "./Theme.module.scss";
import { themePropTypes } from "@/utils/propTypes.js";

Theme.propTypes = themePropTypes;

export default function Theme({ className, children, ...props }) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    let localTheme = localStorage.getItem("theme");
    setTheme(!localTheme ? "dark" : localTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  const toggle = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <div
      onClick={toggle}
      className={clsx(css.toggle_theme, className)}
      {...props}>
      <span>{theme === "dark" ? "🌙" : "☀️"}</span>
      {children && <span className={clsx(css.label)}>{children}</span>}
    </div>
  );
}
