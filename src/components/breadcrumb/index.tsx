"use client";

import { usePathname } from "next/navigation";

const mockPathname = {
  profile: "Profle",
  posts: "Posts",
} as Record<string, string>;
const Breadcrumb = () => {
  const pathname = usePathname();
  const last = pathname.split("/").pop();
  return (
    <div className="my-2">
      <p className="text-2xl font-bold">
        Dasboard / {mockPathname[`${last}`]}
      </p>
    </div>
  );
};

export default Breadcrumb;
