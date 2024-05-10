"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import * as web3 from "@solana/web3.js";

import "./ConnectWallet.css";

const WalletMultiButtonDynamic = dynamic(
  async () =>
    (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
  { ssr: false }
);

const ConnectWallet = () => {
  const [balance, setBalance] = useState<any>(0);
  const { publicKey } = useWallet();
  const { connection } = useConnection();

  useEffect(() => {
    if (!connection || !publicKey) {
      return;
    }

    connection.onAccountChange(
      publicKey,
      (updateAccountInfo) => {
        setBalance(updateAccountInfo.lamports / LAMPORTS_PER_SOL);
      },
      "confirmed"
    );

    connection.getAccountInfo(publicKey).then((info) => {
      setBalance(info?.lamports);
    });
  }, [connection, publicKey]);

  return (
    <div className="custom-btn">
      <WalletMultiButtonDynamic>
        {publicKey
          ? `${publicKey.toBase58().substring(0, 6)}...${publicKey
              .toBase58()
              .slice(-4)} / ${balance / LAMPORTS_PER_SOL} SOL`
          : "Connect Wallet"}
      </WalletMultiButtonDynamic>
    </div>
  );
};

export default ConnectWallet;
