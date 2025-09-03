import React, { useState, useEffect } from "react";

export default function Navbar({ title = "Admin", onNavigate = () => {} }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const items = [
    { id: "customers", label: "Customers" },
    { id: "lessors", label: "Lessors" },
    { id: "products", label: "Products" },
    { id: "product-types", label: "Product-Types" },
    { id: "rental", label: "Rental" },
    { id: "return", label: "Return" },
    { id: "recept", label: "Recept" },
  ];

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full bg-gray-50 border-b border-gray-200 shadow-sm !bg-blue-500">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center">
              <span className="font-semibold text-lg">{title}</span>
            </div>

            <div className="flex items-center">
              {/* Hamburger button */}
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                onClick={() => setOpen((s) => !s)}
                className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* ASIDE / SIDEBAR (overlay) */}
      <div
        className={`fixed inset-0 z-40 transition-opacity ${open ? "pointer-events-auto" : "pointer-events-none"}`}
        aria-hidden={!open}
      >
        {/* backdrop */}
        <div
          onClick={() => setOpen(false)}
          className={`fixed inset-0 bg-black/40 transition-opacity ${open ? "opacity-100" : "opacity-0"}`}
        />

        {/* panel */}
        <aside
          className={`fixed right-0 top-0 h-full w-72 bg-white shadow-2xl transform transition-transform ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
          role="menu"
          aria-label="Admin menu"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h3 className="text-lg font-semibold">Menu</h3>
            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          <nav className="p-4">
            <ul className="space-y-2">
              {items.map((it) => (
                <li key={it.id}>
                  <button
                    onClick={() => {
                      onNavigate(it.id);
                      setOpen(false);
                    }}
                    className="w-full text-left px-3 py-2 rounded-md hover:bg-gray-100"
                  >
                    {it.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="absolute bottom-4 left-4 right-4">
            <button
              onClick={() => {
                // example: navigate to settings
                onNavigate("settings");
                setOpen(false);
              }}
              className="w-full px-3 py-2 rounded-md border text-sm"
            >
              Settings
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
