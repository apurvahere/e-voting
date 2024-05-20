"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const Politician = () => {
  const router = useRouter();

  const { currentPoliticianData, allVotersData, isPoliticianAuthenticated } =
    useSelector((state) => ({
      currentPoliticianData: state.politician.currentPoliticianData,
      allVotersData: state.voter.allVotersData,
      isPoliticianAuthenticated: state.politician.isPoliticianAuthenticated,
    }));

  const filteredVotersFromStandoutArea = allVotersData?.filter((voter) => {
    return voter.location === currentPoliticianData.standoutArea;
  });

  const votersWhoVotedSamePolitician = allVotersData?.filter((voter) => {
    return (
      voter.votedPolitician &&
      voter.votedPolitician.name === currentPoliticianData.name &&
      voter.votedPolitician.partyName === currentPoliticianData.partyName &&
      voter.votedPolitician.standoutArea === currentPoliticianData.standoutArea
    );
  });

  React.useEffect(() => {
    if (!isPoliticianAuthenticated) {
      router.replace("/politician/login");
    }
  }, [isPoliticianAuthenticated, router]);

  return (
    <div className="h-screen flex flex-col gap-2.5 justify-start items-center">
      <div className="border p-5 rounded-md w-max flex gap-2.5">
        <div className="flex flex-col justify-between items-center">
          <Image
            src={currentPoliticianData?.politicianImage}
            alt={currentPoliticianData?.politicianImage}
            width={40}
            height={40}
          />
          <Image
            src={currentPoliticianData?.partySignImage}
            alt={currentPoliticianData?.partySignImage}
            width={20}
            height={20}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="capitalize">
            Politician name: {currentPoliticianData?.name}
          </h1>
          <h1 className="capitalize">
            Standout Area: {currentPoliticianData?.standoutArea}
          </h1>
          <h1 className="capitalize">
            Party name: {currentPoliticianData?.partyName}
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-5">
        <h1 className="text-2xl font-bold capitalize">Voting information</h1>
        <div className="flex gap-2.5">
          <div className="flex flex-col gap-2.5 border border-gray-300 p-2">
            <div className="border-b border-gray-300 pb-2">
              Total voters from {currentPoliticianData?.standoutArea}
            </div>
            <div>{filteredVotersFromStandoutArea.length}</div>
          </div>
          <div className="flex flex-col gap-2.5 border border-gray-300 p-2">
            <div className="border-b border-gray-300 pb-2">
              Total votes to {currentPoliticianData?.name}
            </div>
            <div>{votersWhoVotedSamePolitician.length || "No votes yet"}</div>
          </div>
          <div className="flex flex-col gap-2.5 border border-gray-300 p-2">
            <div className="border-b border-gray-300 pb-2">
              Total voters from all states
            </div>
            <div>{allVotersData.length}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Politician;
