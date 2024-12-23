"use client";
import { FormEvent, useState } from "react";
const IGDBRequestBox = ({
  endpoint: _endpoint,
  query: _query,
  onResponse,
  onDelete,
}: {
  endpoint: string;
  query: string;
  // eslint-disable-next-line
  onResponse: (res: any) => void;
  onDelete: () => void;
}) => {
  const [endpoint, setEndpoint] = useState(_endpoint);
  const [query, setQuery] = useState(_query);
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch(`http://localhost:3001/igdb`, {
        method: "POST",
        body: JSON.stringify({
          endpoint,
          query,
        }),
      });
      const json = await res.json();
      onResponse(json);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col border rounded-lg px-4 py-2"
    >
      <div className="my-1">
        <div className="text-xs">Endpoint</div>
        <input
          className="w-full px-2 py-1 border rounded"
          type="text"
          value={endpoint}
          onChange={(e) => setEndpoint(e.currentTarget.value)}
        />
      </div>
      <div className="my-1">
        <div className="text-xs">Query</div>
        <input
          className="w-full px-2 py-1 border rounded"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.currentTarget.value)}
        />
      </div>
      <div className="flex justify-between items-center">
        <div className="underline text-sm cursor-pointer" onClick={onDelete}>
          delete
        </div>
        <input
          disabled={loading}
          className="my-2 w-24 border rounded py-2 cursor-pointer active:bg-blue-500"
          type="submit"
          value={loading ? "loading..." : "submit"}
        />
      </div>
    </form>
  );
};
export default IGDBRequestBox;
