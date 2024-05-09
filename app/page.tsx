"use client";

import React, { useState } from "react";
import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

import * as web3 from "@solana/web3.js";

const Home = () => {
  const [sol, setSol] = useState("");
  const [address, setAddress] = useState("");

  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  // send Sol function
  const sendSol = () => {
    const transaction = new web3.Transaction();
    const recipientPubKey = new web3.PublicKey(address);

    if (publicKey) {
      const sendSolInstruction = web3.SystemProgram.transfer({
        fromPubkey: publicKey,
        toPubkey: recipientPubKey,
        lamports: LAMPORTS_PER_SOL * parseFloat(sol),
      });

      transaction.add(sendSolInstruction);
      sendTransaction(transaction, connection).then((sig) => {
        console.log(sig);
      });
    }
  };
  return (
    <main className="flex justify-center w-full p-24 ">
      <div className="w-[50%] flex flex-col space-y-2">
        <div className="flex">
          <label className="leading-10 text-lg pr-2 font-bold text-gray-500">
            Amount to send:
          </label>
          <input
            type="number"
            value={sol}
            name="sol"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSol(e.target.value)
            }
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
          />
        </div>
        <div className="flex">
          <label className="leading-10 text-lg pr-2 font-bold text-gray-500">
            Address to send:
          </label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAddress(e.target.value)
            }
            className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
          ></input>
        </div>
        <button
          onClick={sendSol}
          className="bg-white-500 hover:bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded border border-gray-200"
        >
          Send Sol
        </button>
      </div>
    </main>
  );
};

export default Home;
