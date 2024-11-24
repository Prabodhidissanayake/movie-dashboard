import Link from "next/link";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-gray-800 text-white p-4 min-h-screen flex flex-col">
            <nav className="flex flex-col gap-4">
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
    );
}
