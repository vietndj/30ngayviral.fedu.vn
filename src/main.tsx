import { createRoot } from "react-dom/client";
import "./index.css";
import { ContentProvider } from "./content";
import { ThemeProvider } from "./theme";
import { createElement } from "react";

// Tạm thời ẩn trang Checkout, luôn render Landing Page (App.tsx)
import App from "./App";

createRoot(document.getElementById("root")!).render(
  createElement(ThemeProvider, null,
    createElement(ContentProvider, null,
      createElement(App)
    )
  )
);
