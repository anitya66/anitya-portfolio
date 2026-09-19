import Navbar from "../components/navigation/Navbar";

function MainLayout({ children }) {
  return (
    <div className="site-shell">
      <Navbar />

      <main className="site-main" id="main-content">
        <div className="container">{children}</div>
      </main>
    </div>
  );
}

export default MainLayout;
