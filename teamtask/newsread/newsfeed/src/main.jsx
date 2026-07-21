// ─── main.jsx ─────────────────────────────────────────────────────────────────
// Application entry point. Wraps the app with all context providers
// and BrowserRouter for client-side routing.

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

// Context providers
import { AuthProvider }     from "./context/AuthContext.jsx";
import { ThemeProvider }    from "./context/ThemeContext.jsx";
import { BookmarkProvider } from "./context/BookmarkContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* BrowserRouter enables client-side routing */}
    <BrowserRouter>
      {/* AuthProvider: authentication state available app-wide */}
      <AuthProvider>
        {/* ThemeProvider: dark/light mode available app-wide */}
        <ThemeProvider>
          {/* BookmarkProvider: bookmarks & likes available app-wide */}
          <BookmarkProvider>
            <App />
          </BookmarkProvider>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
