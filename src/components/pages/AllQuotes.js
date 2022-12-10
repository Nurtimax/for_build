import QuoteList from "../quotes/QuoteList";
import LoadingSpinner from "./../UI/LoadingSpinner";
import useHttp from "./../hooks/use-http";
import { getAllQuotes } from "./../../lib/api";
import { useEffect } from "react";
import NotQuotesFound from "../quotes/NotQuotesFound";
const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getAllQuotes, true);
  console.log(loadedQuotes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuotes || loadedQuotes.length === 0)) {
    return <NotQuotesFound />;
  }
  return <QuoteList quotes={loadedQuotes} />;
};

export default AllQuotes;
