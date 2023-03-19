import classes from "./Button-Circle.module.scss"


interface IButtonCircleProps {
  icon: JSX.Element
}

const ButtonCircle = ({icon}: IButtonCircleProps) => {

  return (
    <div className={classes.circle}>
      {icon}
    </div>
  );
};

export default ButtonCircle;
