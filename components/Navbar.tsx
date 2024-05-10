"use client";

import React from "react";
import ConnectWallet from "./ConnectWallet";

import Link from "next/link";

const NavBar = () => {
  return (
    <div className="flex justify-between p-4 border">
      <div className="flex items-center space-x-4">
        <h3 className="font-serif">ChampionDev</h3>
      </div>
      <div className="flex space-x-5">
        <nav className="p-4">
          <ul className="flex">
            <li className="px-3">
              <Link
                href="/"
                className="text-[#515151] hover:text-gray-300 cursor-pointer "
              >
                Home
              </Link>
            </li>
            <li className="px-3">
              <Link
                href="/movie"
                className="text-[#515151] hover:text-gray-300 cursor-pointer"
              >
                Movie Review
              </Link>
            </li>
            <li className="px-3">
              <Link
                href="student"
                className="text-[#515151] hover:text-gray-300 cursor-pointer"
              >
                Students
              </Link>
            </li>
            <li className="pl-3">
              <Link
                href="contact"
                className="text-[#515151] hover:text-gray-300 cursor-pointer"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
