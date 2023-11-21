import Navbar from "@/components/nav/Navbar";

function Layout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="mx-12">{children}</div>
    </div>
  );
}

export default Layout;
