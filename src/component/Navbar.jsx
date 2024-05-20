"use client";
import React from "react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setPoliticianAuthenticated } from "../redux/slices/politician/politicianSlice";
import { setVoterAuthenticated } from "../redux/slices/voter/voterSlice";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const pathname = usePathname();
  const { isVoterAuthenticated, isPoliticianAuthenticated } = useSelector(
    (state) => ({
      isVoterAuthenticated: state.voter.isVoterAuthenticated,
      isPoliticianAuthenticated: state.politician.isPoliticianAuthenticated,
    })
  );
  return (
    <div className="flex justify-between items-center p-5 mb-5 border-b">
      <strong className="text-3xl font-bold">E-Voting</strong>
      <div className="flex gap-2.5">
        {pathname.includes("voter") && (
          <>
            <button
              onClick={() => router.push("/politician/login")}
              className="text-lg bg-green-500 text-white px-5 py-2 rounded-full"
            >
              Politician
            </button>
            <button
              onClick={() => router.push("/result")}
              className="text-lg bg-blue-500 text-white px-5 py-2 rounded-full"
            >
              Result
            </button>
            {isVoterAuthenticated && (
              <button
                onClick={() => {
                  dispatch(setVoterAuthenticated(false));
                  router.push("/voter/login");
                }}
                className="text-lg bg-white border border-black text-black px-5 py-2 rounded-full"
              >
                Logout
              </button>
            )}
          </>
        )}
        {pathname.includes("politician") && (
          <>
            <button
              onClick={() => router.push("/voter/login")}
              className="text-lg bg-blue-500 text-white px-5 py-2 rounded-full"
            >
              Voter
            </button>
            <button
              onClick={() => router.push("/result")}
              className="text-lg bg-green-500 text-white px-5 py-2 rounded-full"
            >
              Result
            </button>
            {isPoliticianAuthenticated && (
              <button
                onClick={() => {
                  dispatch(setPoliticianAuthenticated(false));
                  router.push("/politician/login");
                }}
                className="text-lg bg-white border border-black text-black px-5 py-2 rounded-full"
              >
                Logout
              </button>
            )}
          </>
        )}
        {pathname.includes("result") && (
          <>
            <button
              onClick={() => router.push("/politician/login")}
              className="text-lg bg-green-500 text-white px-5 py-2 rounded-full"
            >
              Politician
            </button>
            <button
              onClick={() => router.push("/voter/login")}
              className="text-lg bg-blue-500 text-white px-5 py-2 rounded-full"
            >
              Voter
            </button>
          </>
        )}
        {pathname === "/" && (
          <button
            onClick={() => router.push("/result")}
            className="text-lg bg-green-500 text-white px-5 py-2 rounded-full"
          >
            Result
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
