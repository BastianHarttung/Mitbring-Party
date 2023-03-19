import classes from "./Button-Circle.module.scss"


interface IButtonCircleProps {
  icon: JSX.Element;
  onClick: () => void;
}

const ButtonCircle = ({icon, onClick}: IButtonCircleProps) => {

  return (
    <div className={classes.circle}
         onClick={onClick}>
      {icon}
    </div>
  );
};

export default ButtonCircle;
