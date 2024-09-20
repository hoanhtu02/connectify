"use client";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Logo from "@/components/Logo";
import {
  Archive,
  MessageCircle,
  LogOut,
  Settings,
  LayoutDashboard,
  ListTodo,
  Calendar,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
function NavBar() {
  const pathName = usePathname();
  return (
    <div className=" min-h-screen py-4 flex flex-col items-center pr-10 border-r dark:border-[#1F2121]">
      <div className="flex flex-col gap-4">
        <Logo />
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col gap-2 items-center">
            <NavigationMenuItem>
              <Link href="/dashboard" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/dashboard")}
                >
                  <LayoutDashboard size={17} className="mr-2" />
                  Dashboard
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/chat" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/chat")}
                >
                  <MessageCircle size={17} className="mr-2" />
                  Conversations
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/friends" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/friends")}
                >
                  <Users size={17} className="mr-2" />
                  Friends
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/todo" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/todo")}
                >
                  <ListTodo size={17} className="mr-2" />
                  Todo
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/schedule" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/schedule")}
                >
                  <Calendar size={17} className="mr-2" />
                  Schedule
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/archive" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/archive")}
                >
                  <Archive size={17} className="mr-2" />
                  Archives
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/setting" legacyBehavior passHref>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathName.includes("/setting")}
                >
                  <Settings size={17} className="mr-2" />
                  Settings
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="mt-auto mb-2">
        <Button variant="ghost" size="sm" onClick={() => signOut()}>
          <LogOut size={17} className="mr-2" />
          Logout
        </Button>
      </div>
    </div>
  );
}

export default NavBar;
