import "@styles/globals.css";

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
      </body>
      <main className="app">{children}</main>
    </html>
  );
};

export default RootLayout;
