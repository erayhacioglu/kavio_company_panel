import { forwardRef } from "react";
import cn from "classnames";
import "./switch_checkbox.scss";

const SwitchCheckbox = forwardRef(({ checked, onChange, label, disabled = false, size = "md", id, className },
  ref) => {
    return(
        <label
      htmlFor={id}
      className={cn("switch", size, { disabled }, className)}
    >
      <input
        id={id}
        type="checkbox"
        role="switch"
        aria-checked={!!checked}
        aria-label={label || "switch"}
        checked={!!checked}
        onChange={(e) => onChange?.(e.target.checked)}
        disabled={disabled}
        ref={ref}
      />
      <span className="track" aria-hidden="true" />
      {label && <span className="txt">{label}</span>}
    </label>
    );
})

export default SwitchCheckbox;