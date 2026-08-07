import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";

function Navbar() {
  return (
    <>
      <header className="bg-white shadow-sm px-5 py-3 dark:text-black">
        <nav className="flex items-center max-w-7xl mx-auto justify-between">
          <Link href="/">
            <span className="font-bold text-xl">Dalse<span className="text-blue-500">Blog</span></span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Link href="/post/create" className="font-medium hover:text-red-500">Create</Link>
            <Link href="/profile" className="font-medium hover:text-red-500">MyPost</Link>
            <ModeToggle className="bg-gray-200 dark:bg-gray-700" />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
