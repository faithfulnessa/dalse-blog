import React from "react";
import { ModeToggle } from "./ModeToggle";
import Link from "next/link";
import { Show, SignInButton, SignUpButton } from "@clerk/nextjs";

function Navbar() {
  return (
    <>
      <header className="bg-white shadow-sm px-5 py-3  dark:text-white dark:bg-black">
        <nav className="flex items-center max-w-7xl mx-auto justify-between">
          <Link href="/">
            <span className="font-bold text-xl">
              Dalse<span className="text-blue-500">Blog</span>
            </span>
          </Link>
          <div className="flex items-center gap-5 text-sm">
            <Show when="signed-in">
              <Link
                href="/post/create"
                className="font-medium hover:text-red-500"
              >
                Create
              </Link>
              <Link href="/profile" className="font-medium hover:text-red-500">
                MyPost
              </Link>
            </Show>

            <Show when="signed-out">
              <SignInButton mode="modal">
                <button className="font-medium hover:text-primary cursor-pointer">
                  Login
                </button>
              </SignInButton>
            </Show>
            <Show when="signed-out">
              <SignUpButton mode="modal">
                <button className="bg-[#6c47ff] text-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
                  Sign Up
                </button>
              </SignUpButton>
            </Show>
            <ModeToggle className="bg-gray-200 dark:bg-gray-700" />
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
