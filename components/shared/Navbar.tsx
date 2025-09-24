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
    const storedUser = sessionStorage.getItem("user");

    if (storedUser) setUser(JSON.parse(storedUser));
  }, [sessionStorage.getItem("user")]);

  const handleLogOut = () => {
    sessionStorage.clear();
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
              <Link href="#">
                <MdLocalGroceryStore className="w-6 h-6" />
              </Link>

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
              <button onClick={handleLogOut}>
                <IoLogOut className="w-6 h-6 cursor-pointer" />
              </button>
            </>
          ) : (
            <Link
              href="/sign-in"
              className="text-gray-700 hover:text-gray-900 font-medium"
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
