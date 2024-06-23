import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";

import Image from "next/image";

export const metadata = {
  title: "MatterUs",
  description: "vbhjnkm",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body lang="en">
        <Provider>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <div className="bg-image-wrapper">
              <div className="bg-image">
                <Nav />
                {children}
              </div>
            </div>
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
