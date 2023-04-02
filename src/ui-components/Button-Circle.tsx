import classes from "./Button-Circle.module.scss"
import {MutableRefObject, useEffect, useRef} from "react";

type TButtonStyles = "fixed" | "primary"

interface IButtonCircleProps {
  icon: JSX.Element;
  onClick: () => void;
  btnStyle?: TButtonStyles;
  size?: string;
}

const ButtonCircle = ({icon, onClick, btnStyle = "fixed", size = "24px"}: IButtonCircleProps) => {

  const buttonClasses = `${classes.circle} ${btnStyle === "fixed" ? classes.fixed : ""}`

  const containerRef: MutableRefObject<any> = useRef();

  useEffect(() => {
    containerRef?.current?.style.setProperty("--size", size);
  }, [size]);


  return (
    <div className={buttonClasses}
         onClick={onClick}
         ref={containerRef}>
      {icon}
    </div>
  );
};

export default ButtonCircle;
