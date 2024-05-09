"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useWallet } from "@solana/wallet-adapter-react";

import "./ConnectWallet.css";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ConnectWallet = () => {
  const { publicKey } = useWallet();

  return (
    <div className="custom-btn">
      <WalletMultiButtonDynamic>
        {publicKey
          ? `${publicKey.toBase58().substring(0, 6)}...${publicKey
              .toBase58()
              .slice(-4)}`
          : "Connect Wallet"}
      </WalletMultiButtonDynamic>
    </div>
  );
};

export default ConnectWallet;
