import classes from "./Button.module.scss"
import {CSSProperties} from "react";

interface IButtonProps {
  onClick: () => void;
  btnStyle?: "primary" | "secondary";
  frontIcon?: JSX.Element | undefined;
  backIcon?: JSX.Element;
  children: string;
  className?: string;
  style?: CSSProperties;
}

const Button = ({
                  onClick,
                  btnStyle = "primary",
                  frontIcon,
                  backIcon,
                  children,
                  className,
                  style,
                  ...restProps
                }: IButtonProps) => {
  return (
    <button onClick={onClick}
            className={`${classes.button} ${classes[btnStyle]} ${className}`}
            style={style}
            type="button"
            {...restProps}>
      {frontIcon}

      {children}

      {backIcon}
    </button>
  );
};

export default Button;
