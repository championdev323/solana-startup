"use client";

import React from "react";
import ConnectWallet from "./ConnectWallet";

const NavBar = () => {
  return (
    <div className="flex justify-between p-4 border">
      <div className="flex items-center space-x-4">
        <h3 className="font-serif">ChampionDev</h3>
      </div>
      <div>
        <ConnectWallet />
      </div>
    </div>
  );
};

export default NavBar;
