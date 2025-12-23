"use client";
import { usePathname, useRouter } from "next/navigation";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import {
  LayoutDashboard,
  UserCheck,
  Mail,
  House,
  Settings,
  Briefcase,
  CirclePlus,
  GraduationCap,
  GalleryVertical
} from "lucide-react";


const items = [
  { title: "Home", url: "/", icon: House },
  { title: "Dashboard", url: "/admin/dashboard", icon: LayoutDashboard },
  { title: "Users", url: "/admin/dashboard/users", icon: UserCheck },
  { title: "Settings", url: "/admin/dashboard/settings", icon: Settings },
  { title: "Emails", url: "/admin/dashboard/emails", icon:Mail  },
  { title: "Experiences", url: "/admin/dashboard/experience", icon:Briefcase  },
  { title: "Skills", url: "/admin/dashboard/skills", icon:CirclePlus  },
  { title: "Education", url: "/admin/dashboard/education", icon:GraduationCap  },
   { title: "Gallery", url: "/admin/dashboard/gallery", icon:GalleryVertical  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => {
                const isActive = pathname === item.url;
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      onClick={() => router.replace(item.url)}
                      className={isActive ? "bg-[#E0F2FE] text-black" : ""}
                    >
                      <button className="flex items-center gap-2 w-full text-left p-2 rounded cursor-pointer">
                        <item.icon className="w-5 h-5" />
                        <span>{item.title}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
