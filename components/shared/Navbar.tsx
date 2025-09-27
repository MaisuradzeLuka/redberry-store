"use client";

import Image from "next/image";
import Link from "next/link";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaUser } from "react-icons/fa6";
import { IoLogOut } from "react-icons/io5";
import { useEffect, useState } from "react";
import { UserType } from "@/types";

const Navbar = () => {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = sessionStorage.getItem("user");
      if (storedUser) setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogOut = () => {
    if (typeof window !== "undefined") {
      sessionStorage.clear();
    }
    setUser(null);
  };

  return (
    <header className="w-full px-25 ">
      <nav className="h-20 flex items-center justify-between">
        <Link href="/">
          <Image src="/Logo.png" width={180} height={24} alt="main logo" />
        </Link>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <button
                onClick={() =>
                  window.dispatchEvent(new CustomEvent("openCart"))
                }
                className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <MdLocalGroceryStore className="w-6 h-6" />
              </button>

              {user.avatar ? (
                <Image
                  src={user.avatar}
                  alt="user avatar"
                  width={40}
                  height={40}
                  className="object-cover w-10 h-10 rounded-full"
                />
              ) : (
                <FaUser className="w-6 h-6" />
              )}
              <button onClick={handleLogOut} className="cursor-pointer">
                <IoLogOut className="w-6 h-6" />
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-700 hover:text-gray-900 font-medium cursor-pointer"
            >
              Log In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
