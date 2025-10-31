import { Button } from "@/components-system/Button/Button";
import dynamic from "next/dynamic";

const ThemeToggle = dynamic(() => import("@/components/toggleTheme"));
const Avatar = dynamic(() => import("@/components-system/Avatar/Avatar"));

const Header = () => {
  return (
    <div className="flex justify-between px-6 py-2 items-center">
      <h2>NEXT PRO</h2>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button>
          <Avatar />
          <p className="font-bold">Trubel Theresa</p>
        </Button>
      </div>
    </div>
  );
};

export default Header;
