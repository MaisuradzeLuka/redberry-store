import Image from "next/image";
import Link from "next/link";
import { MdLocalGroceryStore } from "react-icons/md";
import { FaRegUserCircle } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";

const Navbar = () => {
  return (
    <header className="w-full px-25 ">
      <nav className="h-20 flex items-center justify-between">
        <Link href="/">
          <Image src="/Logo.png" width={180} height={24} alt="main logo" />
        </Link>

        <div className="flex items-center gap-2">
          <Link href="#">
            <MdLocalGroceryStore className="w-6 h-6" />
          </Link>

          <FaRegUserCircle className="w-10 h-10" />

          <button>
            <IoLogOut className="w-6 h-6" />
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
