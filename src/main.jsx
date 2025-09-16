import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./assets/style/reset.css";
import "./assets/style/style.css";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);
