import { MdOutlineDashboard, MdOutlinePhotoLibrary } from "react-icons/md";
import { FaHistory, FaReddit } from "react-icons/fa";
import { GrUserManager } from "react-icons/gr";
import { IoIosMail } from "react-icons/io";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import Link from "next/link";

// Dummy logo and user button
const Logo = () => <div className="text-2xl font-bold px-4 py-4">Logo</div>;

const sidebarItems = [
  {
    title: "Dashboard",
    link: "/dashboard",
    icon: <MdOutlineDashboard />,
  },
  {
    title: "History",
    link: "/history",
    icon: <FaHistory />,
  },
  {
    title: "Content Library",
    link: "/contentLibrary",
    icon: <MdOutlinePhotoLibrary />,
  },
  {
    title: "Subreddit Manager",
    link: "/subredditManager",
    icon: <GrUserManager />,
  },
  {
    title: "Reddit Toolbox",
    link: "/redditToolbox",
    icon: <FaReddit />,
    children: [
      {
        title: "Subreddit",
        link: "/redditToolbox/subreddit",
      },
      {
        title: "Redditor",
        link: "/redditToolbox/redditor",
      },
      {
        title: "Discovery",
        link: "/redditToolbox/discovery",
      },
    ],
  },
  {
    title: "Inbox",
    link: "/inbox",
    icon: <IoIosMail />,
    children: [
      {
        title: "Replies",
        link: "/inbox/replies",
      },
      {
        title: "Messages",
        link: "/inbox/messages",
      },
      {
        title: "Automation",
        link: "/inbox/automation",
      },
    ],
  },
];

export default function Sidebar() {
  return (
    <div className="h-screen flex flex-col justify-between min-w-[250px] max-w-[250px] border-r-2 border-gray-400">
      <div>
        <Logo />
      </div>
      <div className="flex flex-col justify-center flex-grow px-4 py-2">
        <div className="space-y-1">
          {sidebarItems.map((item) => (
            <div key={item.title}>
              {item.children ? (
                <Accordion type="single" collapsible>
                  <AccordionItem value={item.title}>
                    <AccordionTrigger>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start"
                      >
                        <span className="mr-2">{item.icon}</span>
                        {item.title}
                      </Button>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="pl-6 border-l-2 border-gray-300 ml-4">
                        {item.children.map((child) => (
                          <Link key={child.title} href={child.link}>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="w-full justify-start"
                            >
                              {child.title}
                            </Button>
                          </Link>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ) : (
                <Link href={item.link}>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start"
                  >
                    <span className="mr-2">{item.icon}</span>
                    {item.title}
                  </Button>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="px-4 py-2">
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
          <SignInButton />
        </SignedOut>
      </div>

      {/* Small Sidebar for sm and md viewports */}
      <div className="sm:hidden bg-gray-100 border-t border-gray-200">
        <div className="flex justify-center items-center h-12">
          <span className="text-gray-500">Sidebar</span>
        </div>
      </div>
    </div>
  );
}
