"use client";

import { useState } from "react";
import IGDBRequestBox from "./IGDBRequestBox";
import ReactJson from "react-json-view";

const prebakedRequests = [
  {
    endpoint: "/games",
    query: "fields *; sort id asc; where cover != null; limit 5;",
  },
];

export default function Playground() {
  const [res, setRes] = useState<Record<string, unknown> | null>(null);
  const [requests, setRequests] = useState(prebakedRequests);
  return (
    <div className="flex w-full h-full">
      <div className="flex-1 px-4 py-2">
        <div className="text-2xl my-2">IGDB API Explorer</div>
        <div className="text-xl font-semibold my-2 flex gap-x-2 items-center">
          <div> Endpoints</div>
          <button
            className="px-2 border rounded"
            onClick={() =>
              setRequests([...requests, { endpoint: "", query: "" }])
            }
          >
            {" "}
            +{" "}
          </button>
        </div>
        <div className="flex flex-col gap-y-4">
          {requests.toReversed().map((r, i) => (
            <IGDBRequestBox
              key={`${r.endpoint}-${r.query}`}
              endpoint={r.endpoint}
              query={r.query}
              onResponse={(r) => setRes(r)}
              onDelete={() => setRequests(requests.filter((_, j) => i !== j))}
            />
          ))}
        </div>
      </div>
      <div className="flex-1 h-full overflow-y-scroll">
        {res && <ReactJson src={res} />}
      </div>
    </div>
  );
}
