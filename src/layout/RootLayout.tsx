// "use client"
import dynamic from "next/dynamic";
import { SidebarProvider } from "@/components/sidebar/SidebarProvider";

const Header = dynamic(() => import("./Header"));
const Sidebar = dynamic(() => import("@/components/sidebar"));

const RootLayoutCustome = ({ children }: { children: React.ReactNode }) => {

  return (
    <SidebarProvider>
      <div className={`grid grid-cols-1 md:grid-cols-5`}>
        <div className="absolute z-20 md:col-span-1 md:static max-w-[300px] w-full">
          <Sidebar />
        </div>

        <div className="md:col-span-4">
          <Header />
          <div className="px-6 ">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default RootLayoutCustome;
