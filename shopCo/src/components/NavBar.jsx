import { useState } from "react";
import {
    FiSearch,
    FiShoppingCart,
    FiUser,
    FiMenu,
    FiX,
} from "react-icons/fi";
import { IoChevronDown } from "react-icons/io5";

function Navbar() {
    const [open, setOpen] = useState(false);

    return (
        <div className="w-full bg-white border-b border-gray-200">

            <div className="w-full px-4 sm:px-6 lg:px-10 py-4 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="lg:hidden">
                        {open ? (
                            <FiX
                                className="text-2xl cursor-pointer"
                                onClick={() => setOpen(false)}
                            />
                        ) : (
                            <FiMenu
                                className="text-2xl cursor-pointer"
                                onClick={() => setOpen(true)}
                            />
                        )}
                    </div>

                    <h1 className="text-[24px] sm:text-[28px] font-black tracking-tight">
                        SHOP.CO
                    </h1>
                </div>

                <ul className="hidden lg:flex items-center gap-6 text-sm text-gray-700">
                    <li className="flex items-center gap-1 cursor-pointer hover:text-black">
                        Shop <IoChevronDown size={14} />
                    </li>
                    <li className="cursor-pointer hover:text-black">On Sale</li>
                    <li className="cursor-pointer hover:text-black">New Arrivals</li>
                    <li className="cursor-pointer hover:text-black">Brands</li>
                </ul>

                <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 max-w-[500px] ml-6">
                    <FiSearch className="text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search for products..."
                        className="bg-transparent outline-none ml-2 text-sm w-full"
                    />
                </div>

                <FiSearch className="text-xl cursor-pointer md:hidden ml-auto" />

                <div className="flex items-center gap-4 ml-4">
                    <FiShoppingCart className="text-xl cursor-pointer" />
                    <FiUser className="text-xl cursor-pointer" />
                </div>
            </div>

            {open && (
                <div className="lg:hidden px-4 sm:px-6 pb-4">
                    <ul className="flex flex-col gap-4 text-sm text-gray-700">
                        <li className="flex items-center gap-1 cursor-pointer">
                            Shop <IoChevronDown size={14} />
                        </li>
                        <li className="cursor-pointer">On Sale</li>
                        <li className="cursor-pointer">New Arrivals</li>
                        <li className="cursor-pointer">Brands</li>
                    </ul>
                </div>
            )}

        </div>
    );
}

export default Navbar;