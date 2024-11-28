import { useState, useRef, useEffect } from "react";
import useClickOutside from "./useClickOutside";

const CustomSelect = ({
  options,
  onChange,
  defaultLabel,
  roundedLeftNone,
  title,
  required = true,
  placeholderBottom,
  hiddenTitle,
  reset,
  name,
  valid,
  value_data,
  Ref,
  mystyle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState({});
  const selectRef = useRef(null);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);
  const [value, setValue] = useState(value_data || "");
  useClickOutside(selectRef, closeDropdown);

  const handleSelect = (option) => {
    //setSelectedOption(option);
    //onChange(option);
    //closeDropdown();
  };

  useEffect(() => {
    if (reset) {
      setValue("");
    } else {
      if (value == '') {
        setValue(value_data);
      }
    }
    
  }, [reset, value]);

  return (
    <div className="text-left flex flex-col gap-y-[6px]" ref={Ref}>
      {title ? (
        <p className="font-athitiSemiBold text-base leading-[20px]">
          {title}
          &nbsp;
          {required ? <span className="text-[#FF0000]">*</span> : null}
        </p>
      ) : hiddenTitle ? null : (
        <span className="leading-[20px] max-md:hidden">&nbsp;</span>
      )}

      {/* `reset - ${reset} value : ${value} - data ${value_data }`*/}

     
      <select
        className={`style-select ${
          valid === false ? "border-[#FCA5A5] pr-9" : ""
        } ${value != "" ? "text-[#181B31]" : "text-[#808291]"} 
        ${roundedLeftNone ? "rounded-l-none py-[6px]" : ""} ${mystyle}`
      }
        value={value}
        name={name}
        disabled={options.length > 0 ? false : true}
        onChange={(e) => {
          setValue(e.target.value);
          onChange({
            name: e.target.name,
            value: e.target.value,
            label: e.target.options[e.target.selectedIndex].text,
          });
        }}
        required
      >
        <option value="">{defaultLabel}</option>

        {options.map((item, index) => {
          return (
            <option
              key={index}
              selected={value_data == item.value}
              value={item.value}
            >
              {item.label}
            </option>
          );
        })}
      </select>
      {placeholderBottom ? (
        <p className="font-athitiMedium  text-[#6B7280] text-sm">
          {placeholderBottom}
        </p>
      ) : null}
    </div>
  );
};

export default CustomSelect;
