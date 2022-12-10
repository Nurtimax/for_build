import { Link } from "react-router-dom";
import classes from "./NotquotesFound.module.css";
const NotQuotesFound = () => {
  return (
    <div className={classes.noquotes}>
      <p>No quotes found!</p>
      <Link to="/new-quote" className="btn">
        Add a Quote
      </Link>
    </div>
  );
};

export default NotQuotesFound;
