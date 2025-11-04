// "use client"
import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/sidebar/SidebarProvider";

const Header = dynamic(() => import("./Header"));
const Sidebar = dynamic(() => import("@/components/sidebar"));

const RootLayoutCustome = ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider>
      <div className={`grid grid-cols-1 lg:grid-cols-5`}>
        <div className="absolute z-20 lg:col-span-1 lg:static max-w-[300px] w-full">
          <Sidebar />
        </div>

        <div className="lg:col-span-4">
          <Header />
          <div className="px-6 ">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayoutCustome;
