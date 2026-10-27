"use client";

import { SidebarClassNames } from "@/lib/constansts";
import {
  AlertCircle,
  AlertOctagon,
  AlertTriangle,
  Briefcase,
  ChevronDown,
  ChevronUp,
  Home,
  Layers3,
  LockIcon,
  Search,
  Settings,
  ShieldAlert,
  User,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/lib/redux/globalSlice";
import { useGetProjectsQuery } from "@/lib/redux/api";
import SidebarLink from "../atoms/SidebarLink";

const Sidebar = () => {
  const [showProjects, setShowProjects] = useState(true);
  const [showPriority, setShowPriority] = useState(true);

  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );

  return (
    <div
      className={`${SidebarClassNames} ${isSidebarCollapsed ? "hidden w-0" : "w-64"}`}
    >
      <div className="flex h-full w-full flex-col justify-start">
        <div className="z-50 flex min-h-14 w-64 items-center justify-between bg-white px-6 pt-3 dark:bg-black">
          {/* Top Logo */}
          <div className="text-xl font-bold text-gray-800 uppercase dark:text-white">
            Plotline
          </div>
          {isSidebarCollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
              className="py-3"
            >
              <X className="h-6 w-6 cursor-pointer text-gray-600 hover:text-gray-500 dark:text-white" />
            </button>
          )}
        </div>
        {/* Top Logo */}
        {/* Team */}
        <div className="flex items-center gap-5 border-y-[1.5px] border-gray-200 px-8 py-4 dark:border-gray-700">
          <Image
            src={"/icon.svg"}
            alt="Logo"
            width={40}
            height={40}
            className=""
          />
          <div>
            <h3 className="text-base font-bold tracking-wide text-nowrap uppercase dark:text-gray-200">
              Jovialet Team
            </h3>
            <div className="mt-1 flex items-start gap-2">
              <LockIcon className="mt-[0.1rem] h-3 w-3 text-gray-500 dark:text-gray-400" />
              <p className="text-xs text-gray-500">Private</p>
            </div>
          </div>
        </div>
        {/* Team */}

        {/* Navbar Links */}
        <nav className="z-10 w-full">
          <SidebarLink href="/" icon={Home} label="Home" />
          <SidebarLink href="/timeline" icon={Briefcase} label="Timeline" />
          <SidebarLink href="/search" icon={Search} label="Search" />
          <SidebarLink href="/settings" icon={Settings} label="Settings" />
          <SidebarLink href="/users" icon={User} label="Users" />
          <SidebarLink href="/teams" icon={Users} label="Teams" />
        </nav>
        {/* Navbar Links */}

        <button
          onClick={() => setShowProjects((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Projects</span>
          {showProjects ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>

        {/* Project List */}
        {showProjects &&
          projects?.map((project) => (
            <SidebarLink
              key={project.id}
              href={`/projects/${project.id}`}
              label={project.name}
              icon={Briefcase}
            />
          ))}
        {/* Project List */}

        <button
          onClick={() => setShowPriority((prev) => !prev)}
          className="flex w-full items-center justify-between px-8 py-3 text-gray-500"
        >
          <span className="">Priority</span>
          {showPriority ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </button>
        {/* Priorities */}
        {showPriority && (
          <>
            <SidebarLink
              href="/priority/urgent"
              icon={AlertCircle}
              label="Urgent"
            />
            <SidebarLink
              href="/priority/high"
              icon={ShieldAlert}
              label="High"
            />
            <SidebarLink
              href="/priority/medium"
              icon={AlertTriangle}
              label="Medium"
            />
            <SidebarLink href="/priority/low" icon={AlertOctagon} label="Low" />
            <SidebarLink
              href="/priority/backlog"
              icon={Layers3}
              label="Backlog"
            />
          </>
        )}
        {/* Priorities */}
      </div>
    </div>
  );
};

export default Sidebar;
