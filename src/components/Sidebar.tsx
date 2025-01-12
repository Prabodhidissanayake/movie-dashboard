"use client";

import {
  Film,
  FolderHeart,
  Hourglass,
  House,
  Settings,
  SquareMenu,
  SquareX,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={toggleSidebar}
          className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 md:hidden"
          aria-label="Toggle sidebar"
        >
          <SquareMenu size={16} strokeWidth={1} absoluteStrokeWidth />
        </button>
      )}

      <aside
        className={`fixed top-0 left-0 h-screen bg-mutedPink text-darkBlue p-4 transform z-30 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 md:translate-x-0 md:static md:flex md:flex-col w-64`}
      >
        {isOpen && (
          <button
            onClick={toggleSidebar}
            className="p-2 bg-mutedPink text-darkBlue fixed top-4 right-4 z-50 md:hidden"
            aria-label="Close sidebar"
          >
            <SquareX />
          </button>
        )}

        <nav className="flex flex-col gap-4 mt-16">
          <Link
            href="/"
            className="text-lg font-semibold hover:underline flex gap-2 items-center"
          >
            <House /> Home
          </Link>
          <Link
            href="/movies"
            className="text-lg font-semibold hover:underline flex gap-2 items-center"
          >
            <Film /> Movies
          </Link>
          <Link
            href="/favorites"
            className="text-lg font-semibold hover:underline flex gap-2 items-center"
          >
            <FolderHeart /> Favorites
          </Link>
          <Link
            href="/upcoming"
            className="text-lg font-semibold hover:underline flex gap-2 items-center"
          >
            <Hourglass /> Upcoming
          </Link>
          <Link
            href="/settings"
            className="text-lg font-semibold hover:underline flex gap-2 items-center"
          >
            <Settings /> Settings
          </Link>
        </nav>
      </aside>
    </>
  );
}
