"use client";

import { SquareMenu } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            {/* Hamburger Button */}
            {!isOpen && (
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-gray-800 text-white fixed top-4 left-4 z-50 md:hidden"
                    aria-label="Toggle sidebar"
                >
                    <SquareMenu />
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-screen bg-gray-800 text-white p-4 transform ${isOpen ? "translate-x-0" : "-translate-x-full"
                    } transition-transform duration-300 md:translate-x-0 md:static md:flex md:flex-col w-64`}
            >
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-gray-800 text-white fixed top-4 right-4 z-50 md:hidden"
                    aria-label="Close sidebar"
                >
                    ✕
                </button>

                <nav className="flex flex-col gap-4 mt-16">
                    <Link href="/" className="text-lg font-semibold hover:underline">
                        Home
                    </Link>
                    <Link href="/movies" className="text-lg font-semibold hover:underline">
                        Movies
                    </Link>
                    <Link href="/favorites" className="text-lg font-semibold hover:underline">
                        Favorites
                    </Link>
                    <Link href="/settings" className="text-lg font-semibold hover:underline">
                        Settings
                    </Link>
                </nav>
            </aside>
        </>
    );
}
