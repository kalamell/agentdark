import { useState } from "react";
import * as Functions from "@/app/functions";

const InputCheck = ({
  required = true,
  title,
  initialValue = "",
  placeholderBottom,
  placeholder,
  valid,
  onChange,
  type,
  maxlength,
  onKeyPress = false,
  roundedLeft,
  value,
  name,
  freeDate = false,
  ref,
  min,
  errorShowLabel='',
  Ref

}) => {
  const [_value, setValue] = useState(initialValue);

  // Function to get the date 15 years ago (min age 15)
  const getMinAgeDate = () => {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    return minAgeDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };

  // Function to get the date 100 years ago (max age 100)
  const getMaxAgeDate = () => {
    const today = new Date();
    const maxAgeDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    return maxAgeDate.toISOString().split('T')[0]; // Format to YYYY-MM-DD
  };


  const handleChange = (event) => {
  
    const newValue = event.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-col gap-y-[6px]" ref={Ref}>
      {title ? (
        <p className="font-athitiSemiBold text-base leading-[20px]">
          {title}
          &nbsp;
          {required ? <span className="text-[#FF0000]">*</span> : null}
        </p>
      ) : null}

      <div className="relative">
        <input
          placeholder={placeholder}
          type={type}
          maxLength={maxlength}
          onChange={handleChange}
          value={value}
          name={name}
          max={type == 'date' && !freeDate ? getMinAgeDate() : undefined}
          min={min}
          
          onKeyPress={
            onKeyPress
              ? (event) => {
                  Functions.handleKeyPress(event);
                }
              : null
          }
          className={`${
            roundedLeft ? "rounded-l-md" : "rounded-md"
          } font-athitiMedium border-solid border border-[#D1D5DB] focus-visible:outline-none   w-full py-1.5 px-2 placeholder:text-[#6B7280] placeholder:text-base placeholder:leading-5 placeholder:font-athitiSemiBold ${
            valid === false ? "border-[#FCA5A5] pr-9" : "border-gray-300"
          }`}
        />

        {valid === false && (
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute top-[50%] right-[13px] mt-[-8px]"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 12C9 12.5523 8.55229 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55229 11 9 11.4477 9 12ZM8 3C7.44772 3 7 3.44772 7 4V8C7 8.55228 7.44772 9 8 9C8.55229 9 9 8.55228 9 8V4C9 3.44772 8.55229 3 8 3Z"
              fill="#EF4444"
            />
          </svg>
        )}
      </div>

      {placeholderBottom ? (
        <p className={`font-athitiMedium  ${errorShowLabel !== '' && valid === false ? 'text-[red]' : 'text-[#6B7280]'} text-sm`}>
          {errorShowLabel !== '' && valid === false ? errorShowLabel : placeholderBottom}
        </p>
      ) : null}
    </div>
  );
};

export default InputCheck;
