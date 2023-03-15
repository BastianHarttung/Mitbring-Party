import classes from "./Button.module.scss"

interface IButtonProps {
  onClick: () => void;
  style?: "primary" | "secondary";
  frontIcon?: JSX.Element | undefined;
  backIcon?: JSX.Element;
  children: string;
  className?: string;
}

const Button = ({onClick, style = "primary", frontIcon, backIcon, children, className, ...props}: IButtonProps) => {
  return (
    <button onClick={onClick}
            className={`${classes.button} ${classes[style]} ${className}`}
            {...props}>
      {frontIcon}

      {children}

      {backIcon}
    </button>
  );
};

export default Button;
