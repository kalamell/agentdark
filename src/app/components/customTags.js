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
  sidebarState // Pass sidebar state here
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState(value_data || []);
  const selectRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const closeDropdown = () => setIsOpen(false);

  // Use the useClickOutside hook to close the dropdown when clicking outside
  useClickOutside(selectRef, closeDropdown, sidebarState);

  const handleSelect = (option) => {
    let newSelectedOptions;
    
    if (option.value === "all") {
      // Select all options if "All" is selected
      newSelectedOptions = options.map((opt) => opt.value);
    } else {
      // Toggle the selected option, ensuring "All" is removed if others are selected
      newSelectedOptions = selectedOptions.includes("all")
        ? [option.value]
        : selectedOptions.includes(option.value)
        ? selectedOptions.filter((val) => val !== option.value)
        : [...selectedOptions, option.value];
    }
  
    setSelectedOptions(newSelectedOptions);
  
    // Call the onChange handler with updated values
    onChange({
      name,
      value: newSelectedOptions,
      label: newSelectedOptions
        .map((value) => options.find((opt) => opt.value === value)?.label || "")
        .join(", "),
    });
  };
  

  

  useEffect(() => {
    if (reset) {
      setSelectedOptions([]);
    }
  }, [reset]);

  // Function to determine the displayed label
  const getDisplayLabel = () => {
    if (selectedOptions.includes("all")) {
      return "ชั้นประกันทั้งหมด";
    }
    return selectedOptions.length > 0
      ? selectedOptions
          .map(
            (selected) =>
              options.find((opt) => opt.value === selected)?.label || ""
          )
          .join(", ")
      : defaultLabel;
  };

  

  return (
    <div className="text-left flex flex-col gap-y-2" ref={Ref}>
      <div className="relative" ref={selectRef}>
        <div
          className={`flex items-center border border-gray-300 bg-white p-2 rounded-lg shadow-sm cursor-pointer focus:ring-2 focus:ring-blue-400 ${
            roundedLeftNone ? "rounded-l-none" : ""
          }`}
          onClick={toggleDropdown}
          style={{ minWidth: "180px", maxWidth: "180px", overflow: "hidden" }}
        >
          {/* Display selected value or default label */}
          <span
            className="text-gray-500 flex-grow font-athitiSemiBold truncate w-full md:max-w-none"
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {getDisplayLabel()}
          </span>

          {/* Divider line */}
          <span className="border-l h-6 mx-2 border-gray-300"></span>

          {/* Dropdown arrow */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        {isOpen && (
          <div className="absolute bg-white border border-gray-300 mt-1 w-full max-h-48 overflow-y-auto rounded-lg shadow-md z-10">
            {options.map((item, index) => (
              <div
                key={index}
                className={`p-2 hover:bg-yellow-100 cursor-pointer font-athitiMedium ${
                  selectedOptions.includes(item.value)
                    ? "bg-blue-100 font-semibold"
                    : ""
                }`}
                onClick={() => handleSelect(item)}
              >
                {item.label}
              </div>
            ))}
          </div>
        )}
      </div>

      {placeholderBottom ? (
        <p className="text-sm text-gray-400">{placeholderBottom}</p>
      ) : null}
    </div>
  );
};

export default CustomSelect;
