import {
  Album,
  BellRing,
  ChartNoAxesCombined,
  CircleUserRound,
  MessageCircle,
  MessageCircleHeart,
  ShieldUser,
  UsersRound,
} from "lucide-react";
import Link from "next/link";

const sidebarList = [
  {
    part: "Social",
    id: "part-1",
    sub: [
      {
        id: "sub-1-1",
        url: "/dashboard/profile",
        name: "Profile",
        icon: <CircleUserRound />,
      },
      {
        id: "sub-1-2",
        url: "/dashboard/posts",
        name: "Post",
        icon: <MessageCircleHeart />,
      },
      {
        id: "sub-1-3",
        url: "/dashboard/notifcations",
        name: "Notifications",
        icon: <BellRing />,
      },
    ],
  },
  {
    part: "Chats",
    id: "part-2",
    sub: [
      {
        id: "sub-2-1",
        url: "/dashboard/contact",
        name: "Contacts",
        icon: <UsersRound />,
      },
      {
        id: "sub-2-2",
        url: "/dashboard/messages",
        name: "Messages",
        icon: <MessageCircle />,
      },
    ],
  },
  {
    part: "Dashboard",
    id: "part-3",
    sub: [
      {
        id: "sub-3-1",
        url: "/dashboard/user-management",
        name: "User Management",
        icon: <ShieldUser />,
      },
      {
        id: "sub-3-2",
        url: "/dashboard/post-management",
        name: "Post Management",
        icon: <Album />,
      },
      {
        id: "sub-3-3",
        url: "/dashboard/analysis",
        name: "Analysis",
        icon: <ChartNoAxesCombined />,
      },
    ],
  },
];

const Sidebar = () => {
  return (
    <div className=" sidebar-section h-screen bg-gray-700 flex pl-6 pt-6 pr-3 w-full">
      <div className="flex flex-col gap-3 w-full">
        {sidebarList.map((item) => (
          <div key={item.id} className=" sidebar-part flex flex-col gap-2">
            <p className="sidebar-part-title text-sm">{item.part}</p>
            <div className=" flex flex-col gap-3">
              {item.sub.map((subItem) => (
                <div key={subItem.id}>
                  <Link
                    href={subItem.url}
                    className="sidebar-sub-item flex flex-row gap-2 w-full py-2 px-3 rounded-lg cursor-pointer"
                  >
                    <span>{subItem.icon}</span>
                    {subItem.name}
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
