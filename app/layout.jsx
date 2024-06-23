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
        <div className="mainWrapper">
          <div className="relative">
            <Provider>
              <div className="main ">
                <div className="gradient" />
              </div>

              <main className="app">
                <div className="">
                  <div className="">
                    <div style={{}}>
                      Scroll Up and Down this page to see the parallax scrolling
                      effect. This div is just here to enable scrolling. Tip:
                      Try to remove the background-attachment property to remove
                      the scrolling effect.
                      <Nav />
                      {children}
                    </div>
                  </div>
                </div>
              </main>
            </Provider>
          </div>
        </div>
      </body>
    </html>
  );
};

export default RootLayout;
