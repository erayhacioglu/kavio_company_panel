// CustomSelect.jsx
import React from "react";
import { useTranslation } from "react-i18next";
import Select from "react-select";

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderRadius: "5px",
    border: `1px solid var(--subTextColor)`,
    backgroundColor: "var(--background)",
    height: "35px",
    minHeight: "35px",
    width: "100%",
    paddingLeft: "7.5px",
    color: "var(--textColor)",
    lineHeight: "1",
    boxShadow: "none",
    appearance: "none",
    WebkitAppearance: "none",
    MozAppearance: "none",
    "&:hover": {
      borderColor: "var(--subTextColor)",
    },
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: "0",
    height: "35px",
  }),
  input: (provided) => ({
    ...provided,
    margin: 0,
    padding: 0,
    color: "var(--textColor)",
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "var(--textColor)",
    lineHeight: "1",
  }),
  placeholder: (provided) => ({
    ...provided,
    color: "var(--subTextColor)",
    fontSize: "0.9rem",
    lineHeight: "1",
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    height: "35px",
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    padding: "0 8px",
    color: "var(--textColor)",
    "&:hover": { color: "var(--textColor)" },
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  menu: (provided) => ({
    ...provided,
    borderRadius: "5px",
    backgroundColor: "var(--background)",
    border: `1px solid var(--subTextColor)`,
    color: "var(--textColor)",
    marginTop: "4px",
    zIndex: 9999,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? "var(--subTextColor)"
      : "var(--background)",
    color: state.isFocused ? "var(--background)" : "var(--textColor)",
    cursor: "pointer",
    "&:active": {
      backgroundColor: "var(--subTextColor)",
      color: "var(--background)",
    },
  }),
  noOptionsMessage: (provided) => ({
    ...provided,
    color: "var(--subTextColor)",
    padding: "10px",
    textAlign: "center",
    backgroundColor: "var(--background)",
  }),
};

const CustomSelect = ({
  options = [],
  ...props
}) => {
    const {t} = useTranslation();
  return (
    <Select
      options={options}
      styles={customStyles}
      placeholder={t("customSelect.placeholder")}
      noOptionsMessage={() => t("customSelect.noOptionsMessage")}
      {...props}
    />
  );
};

export default CustomSelect;
