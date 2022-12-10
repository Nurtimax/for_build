import { Outlet, useParams } from "react-router";
import HighlightedQuote from "../quotes/HighlightedQuote";
import { Link, Route, Routes } from "react-router-dom";
import useHttp from "./../hooks/use-http";
import { getSingleQuote } from "./../../lib/api";
import LoadingSpinner from "./../UI/LoadingSpinner";
import { useEffect } from "react";

const QuoteDetail = () => {
  const params = useParams();
  const { quoteId } = params;
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered">{error}</p>;
  }

  if (!loadedQuote.text) {
    return <p>No Quote found</p>;
  }
  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Routes>
        <Route
          path={`/`}
          element={
            <div className="centered">
              <Link
                className="btn--flat"
                to={`/quotes/${params.quoteId}/comments`}
              >
                Load Comments
              </Link>
            </div>
          }
        />
      </Routes>
      <Outlet />
    </>
  );
};

export default QuoteDetail;
