import "./badge.scss"
import cn from "classnames";

const Badge = ({
  color = "red",
  variant = "soft",
  size = "md",
  shape = "pill",
  className,
  children,
  ...rest
}) => {
    return(
        <span
      className={cn(
        "ui-badge",
        `ui-badge--${color}`,
        `ui-badge--${variant}`,
        `ui-badge--${size}`,
        `ui-badge--${shape}`,
        className
      )}
      {...rest}
    >
      {children}
    </span>
    );
}

export default Badge;