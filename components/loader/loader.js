import FadeLoader from "react-spinners/FadeLoader";
import classes from "./loader-container.module.css";

export default function Loader(props) {
  const { color } = props;
  return (
    <div className={classes.container}>
      <FadeLoader
        color={color}
        size={15}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
