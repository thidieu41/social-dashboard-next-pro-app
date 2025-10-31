
import dynamic from "next/dynamic";
const Header = dynamic(()=> import('./Header'));
const Sidebar = dynamic(()=> import('@/components/sidebar'))

type RootLayout = {
  children: React.ReactNode;
};

const RootLayoutCustome = ({ children }: RootLayout) => {
  return (
     <div>
      <div className="grid grid-cols-5">
        <div className="col-span-1">
          <Sidebar />
        </div>

        <div className="col-span-4">
          <Header />
          <div className="p-6">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default RootLayoutCustome
