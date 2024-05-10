"use client";

import { useState } from "react";
import MovieModel from "@/models/Movie";

import * as web3 from "@solana/web3.js";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

import Toast from "@/components/Toast";

const MOVIE_REVIEW_PROGRAM_ID =
  process.env.PUBLIC_MOVIE_REVIEW_PROGRAM_ID ||
  "CenYq6bDRB7p73EjsPEpiYN7uveyPUTdXkDkgUduboaN";

const Movie = () => {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [message, setMessage] = useState("");

  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const movie = new MovieModel(title, rating, message);
    handleTransactionSubmit(movie);
  };

  const handleTransactionSubmit = async (movie: MovieModel) => {
    if (!publicKey) {
      alert("Please connect your wallet!");
      return;
    }

    const buffer = movie.serialize();
    const transaction = new web3.Transaction();

    const [pda] = await web3.PublicKey.findProgramAddress(
      [publicKey.toBuffer(), Buffer.from(movie.title)],
      new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID)
    );

    const instruction = new web3.TransactionInstruction({
      keys: [
        {
          pubkey: publicKey,
          isSigner: true,
          isWritable: false,
        },
        {
          pubkey: pda,
          isSigner: false,
          isWritable: true,
        },
        {
          pubkey: web3.SystemProgram.programId,
          isSigner: false,
          isWritable: false,
        },
      ],
      data: buffer,
      programId: new web3.PublicKey(MOVIE_REVIEW_PROGRAM_ID),
    });

    transaction.add(instruction);

    try {
      let txid = await sendTransaction(transaction, connection);
      console.log(
        `Transaction submitted: https://explorer.solana.com/tx/${txid}?cluster=devnet`
      );
    } catch (e) {
      alert(JSON.stringify(e));
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-12">
        <div className="flex flex-col space-y-2 w-full pt-10 pl-24">
          <h2 className="text-center pl-[20%] text-3xl font-bold text-gray-500">
            Create New Moview Review
          </h2>
          <div className="flex">
            <label className="leading-10 text-lg pr-2 font-bold text-gray-500 w-[20%] text-right">
              Title:
            </label>
            <input
              type="text"
              value={title}
              name="title"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(e.target.value)
              }
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            />
          </div>
          <div className="flex">
            <label className="leading-10 text-lg pr-2 font-bold text-gray-500 w-[20%] text-right">
              Description:
            </label>
            <textarea
              rows={4}
              name="description"
              value={message}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setMessage(e.target.value)
              }
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            ></textarea>
          </div>
          <div className="flex">
            <label className="leading-10 text-lg pr-2 font-bold text-gray-500 w-[20%] text-right">
              Rating:
            </label>
            <input
              type="number"
              value={rating}
              name="rating"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setRating(parseFloat(e.target.value))
              }
              className="border rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1"
            />
          </div>
          <button
            //   onClick={sendSol}
            className="bg-white-500 hover:bg-gray-100 text-gray-500 font-bold py-2 px-4 rounded border border-gray-200 w-[80%] ml-[20%]"
          >
            Submit Movie Review
          </button>
        </div>
        <div className="flex flex-col pt-10">Movie Lists</div>
      </div>
      <Toast />
    </>
  );
};

export default Movie;
