import QuoteForm from "./../quotes/QuoteForm";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import useHttp from "./../hooks/use-http";
import { addQuote } from "../../lib/api";

const NewQuote = () => {
  const navigate = useNavigate();
  const { sendRequest, status } = useHttp(addQuote);
  console.log(status);

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [status, navigate]);

  const addQuoteHundler = (quoteData) => {
    sendRequest(quoteData);
    // navigate("/quotes");
  };

  return <QuoteForm onAddQuote={addQuoteHundler} />;
};

export default NewQuote;
