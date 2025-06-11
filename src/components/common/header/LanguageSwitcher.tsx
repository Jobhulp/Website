import React, { useState, useRef, useEffect } from "react";
import "./style.css";

const languages = [
  { value: "Nl", label: "Nl" },
  { value: "En", label: "En" },
  { value: "Fr", label: "Fr" },
  { value: "De", label: "De" },
  { value: "It", label: "It" },
];

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(languages[0]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`custom-select-container${open ? " open" : ""}`} ref={ref}>
      <div
        className="custom-select-selected"
        onClick={() => setOpen((o) => !o)}
      >
        <span>{selected.label}</span>
        <span className={`custom-select-arrow${open ? " up" : ""}`}>
        <i className="puzzle-icon far fa-angle-down"></i>
        </span>
      </div>
      {open && (
        <ul className="custom-select-dropdown">
          {languages.map((lang) => (
            <li
              key={lang.value}
              className={`custom-select-option${
                selected.value === lang.value ? " selected" : ""
              }`}
              onClick={() => {
                setSelected(lang);
                setOpen(false);
              }}
            >
              {lang.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageSwitcher;