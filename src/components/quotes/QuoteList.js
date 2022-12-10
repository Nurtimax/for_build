import QuoteItem from "./QuoteItem";
import { useSearchParams } from "react-router-dom";
import classes from "./QuoteList.module.css";
import { useLocation } from "react-router-dom";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const queryParams = new URLSearchParams(location.search);

  const isSortingAscending = queryParams.get("sort") === "asc"; //return true/false

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
    setSearchParams({ sort: isSortingAscending ? "desc" : "asc" });
  };
  return (
    <div className={classes.sorting}>
      <button onClick={changeSortingHandler}>
        Sort {isSortingAscending ? "Descending" : "Ascending"}
      </button>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </div>
  );
};

export default QuoteList;
