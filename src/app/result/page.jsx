"use client";

import Image from "next/image";
import { statesOptions } from "../../utils/constants";
import React from "react";
import { useSelector } from "react-redux";

const Results = () => {
  const [selectedState, setSelectedState] = React.useState("");

  const { allVotersData, allPoliticianData } = useSelector((state) => ({
    allVotersData: state.voter.allVotersData,
    allPoliticianData: state.politician.allPoliticianData,
  }));

  const getVoterCountForPolitician = (politician) => {
    const votersForPolitician = allVotersData.filter(
      (voter) =>
        voter.votedPolitician &&
        voter.votedPolitician.name === politician.name &&
        voter.votedPolitician.partyName === politician.partyName &&
        voter.votedPolitician.standoutArea === politician.standoutArea
    );
    return votersForPolitician.length;
  };

  const sortedPoliticianData = [...allPoliticianData].sort((a, b) => {
    const countA = getVoterCountForPolitician(a);
    const countB = getVoterCountForPolitician(b);
    return countB - countA;
  });

  const filteredPoliticianData = selectedState
    ? sortedPoliticianData.filter(
        (politician) => politician.standoutArea === selectedState
      )
    : sortedPoliticianData;

  const votedSuccessful = allVotersData.filter(
    (voter) => voter.votedPolitician
  );

  return (
    <div className="h-screen flex flex-col gap-2.5 justify-start items-center">
      <div className="flex justify-evenly w-full">
        {allVotersData?.length > 0 && (
          <div>
            Total voters: <strong>{allVotersData?.length}</strong>
          </div>
        )}
        {allVotersData?.length > 0 && (
          <div>
            Total Voted successfully: <strong>{votedSuccessful?.length}</strong>
          </div>
        )}
        <select
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border px-2 py-0.5"
        >
          <option value="">Select State</option>
          {statesOptions.map((state) => (
            <option key={state.value} value={state.value}>
              {state.name}
            </option>
          ))}
        </select>
      </div>
      <h1 className="text-3xl font-bold">Results</h1>
      <div className="flex flex-col gap-10 mt-5">
        {filteredPoliticianData.length > 0 ? (
          filteredPoliticianData.map((politician) => (
            <div
              className="border p-5 rounded-md w-max min-w-96 flex justify-between items-start"
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
              <span>{getVoterCountForPolitician(politician)}</span>
            </div>
          ))
        ) : (
          <div>No results found</div>
        )}
      </div>
    </div>
  );
};

export default Results;
