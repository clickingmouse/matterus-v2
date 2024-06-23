import "@styles/globals.css";

import Image from "next/image";

export const metadata = {
  title: "MatterUs",
  description: "vbhjnkm",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body lang="en">
        <div className="main">
          <div className="gradient" />
        </div>

        <main className="app">
          <div className="bg-image-wrapper">
            <div className="bg-image">{children}</div>
          </div>
        </main>
      </body>
    </html>
  );
};

export default RootLayout;
