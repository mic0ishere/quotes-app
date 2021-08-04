import { useEffect, useState } from "react";
import Prism from "prismjs";
import useSWR from "swr";
import "prismjs/components/prism-json";

const fetcher = (url) => fetch(url).then((r) => r.json());

export default function MainPage() {
  const { data, error, isLoading } = useSWR("/api/quote", fetcher, {
    refreshInterval: 10 * 1000,
  });
  const [dataString, setDataString] = useState({
    data: {},
    string: "{}",
  });
  useEffect(() => {
    function setData() {
      if (dataString.data !== data && data) {
        setDataString({
          data,
          string: JSON.stringify(data.data, null, "\t"),
        });
      }
    }
    Prism.highlightAll();
    setInterval(setData, 10000);
    setData();
  }, [data, dataString]);
  return (
    <>
      <h1
        style={{
          marginBottom: 0,
        }}
      >
        Showcase
      </h1>
      <p
        style={{
          marginTop: "3px",
        }}
      >
        It refreshes every 10 seconds
      </p>
      {!error && !isLoading ? (
        <pre className="max-w">
          <code className="language-json">{dataString.string}</code>
        </pre>
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
}
