"use client";

import { Button } from "@/components-system/Button/Button";
import { useSidebar } from "@/components/sidebar/SidebarProvider";
import { Menu } from "lucide-react";

const ToggleSidebar = () => {
    const { toggleSidebar } = useSidebar();
    return(
        <Button className="border-none! lg:hidden" onClick={toggleSidebar}>
          <Menu />
        </Button>
    )
}

export default ToggleSidebar