import classes from "./Loading.module.scss";


const Loading = () => {
  return (
    <div className={classes.loading_container}>
      <div className={classes.spinner}></div>
    </div>
  );
};

export default Loading;
