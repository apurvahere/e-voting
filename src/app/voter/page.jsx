"use client";

import React from "react";
import Image from "next/image";
import {
  setAllVotersData,
  setCurrentVoterData,
} from "../../redux/slices/voter/voterSlice";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

const Voter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [voteConfirm, setVoteConfirm] = React.useState(false);
  const {
    currentVoterData,
    allVotersData,
    allPoliticianData,
    isVoterAuthenticated,
  } = useSelector((state) => ({
    currentVoterData: state.voter.currentVoterData,
    allVotersData: state.voter.allVotersData,
    isVoterAuthenticated: state.voter.isVoterAuthenticated,
    allPoliticianData: state.politician.allPoliticianData,
  }));

  React.useEffect(() => {
    if (!isVoterAuthenticated) {
      router.replace("/voter/login");
    }
  }, [isVoterAuthenticated, router]);

  const handleVoteChange = (politician) => {
    const updatedVotersData = allVotersData.map((voter) => {
      if (
        voter.name === currentVoterData.name &&
        voter.identityNumber === currentVoterData.identityNumber
      ) {
        return {
          ...voter,
          votedPolitician: politician,
        };
      }
      return voter;
    });

    dispatch(setAllVotersData(updatedVotersData));
    dispatch(
      setCurrentVoterData({ ...currentVoterData, votedPolitician: politician })
    );
    toast.success("you vote has been casted, thank you");
  };

  return (
    <div className="h-screen flex flex-col gap-2.5 justify-start items-center">
      <div className="border p-5 rounded-md w-max flex gap-2.5">
        <div className="flex justify-center max-w-32 max-h-20">
          <Image
            src={currentVoterData?.image}
            alt={currentVoterData?.name}
            height={50}
            width={50}
          />
        </div>
        <div className="flex flex-col">
          <h1>Voter name: {currentVoterData?.name}</h1>
          <h1>Identity number: {currentVoterData?.identityNumber}</h1>
          <h1>Location: {currentVoterData?.location}</h1>
        </div>
      </div>
      <div className="flex flex-col justify-center">
        {!currentVoterData?.votedPolitician &&
          allPoliticianData.filter(
            (politician) =>
              politician.standoutArea === currentVoterData?.location
          ).length !== 0 && (
            <h1 className="text-center font-semibold text-xl">
              Please select person to vote
            </h1>
          )}
        {currentVoterData?.votedPolitician ? (
          <div className="flex gap-2 mt-5">
            You gave vote to
            <strong>{currentVoterData?.votedPolitician?.name}</strong> from
            party {currentVoterData?.votedPolitician?.partyName}
          </div>
        ) : (
          <div className="flex flex-col gap-10 mt-10">
            {allPoliticianData.filter(
              (politician) =>
                politician.standoutArea === currentVoterData?.location
            ).length === 0 ? (
              <strong>
                Oops! Politician from your location is not registered yet.
              </strong>
            ) : (
              allPoliticianData
                .filter(
                  (politician) =>
                    politician.standoutArea === currentVoterData?.location
                )
                .map((politician) => (
                  <div
                    className="border p-5 rounded-md w-max min-w-96 flex gap-2.5 justify-between items-start"
                    key={politician?.name}
                  >
                    <div className="flex gap-2.5">
                      <div className="flex flex-col justify-between items-center">
                        <Image
                          src={politician?.politicianImage}
                          alt={politician?.politicianImage}
                          width={40}
                          height={40}
                        />
                        <Image
                          src={politician?.partySignImage}
                          alt={politician?.partySignImage}
                          width={20}
                          height={20}
                        />
                      </div>
                      <div className="flex flex-col">
                        <h1 className="capitalize">Name: {politician?.name}</h1>
                        <h1 className="capitalize">
                          Standout Area: {politician?.standoutArea}
                        </h1>
                        <h1 className="capitalize">
                          Party name: {politician?.partyName}
                        </h1>
                      </div>
                    </div>
                    {!voteConfirm ? (
                      <button
                        onClick={() => setVoteConfirm(!voteConfirm)}
                        className="bg-blue-500 text-white px-5 py-2 rounded"
                      >
                        Vote
                      </button>
                    ) : (
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleVoteChange(politician)}
                          className="bg-green-500 text-white px-5 py-2 rounded"
                        >
                          confirm
                        </button>
                        <button
                          onClick={() => setVoteConfirm(!voteConfirm)}
                          className="bg-red-500 text-white px-5 py-2 rounded"
                        >
                          cancel
                        </button>
                      </div>
                    )}
                  </div>
                ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Voter;
