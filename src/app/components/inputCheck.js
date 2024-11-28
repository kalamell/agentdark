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
  errorShowLabel = '',
  Ref,
  showCheck = false,
  password= false
}) => {
  const [_value, setValue] = useState(initialValue);
  const [showPassword, setShowPassword] = useState(false);

  const getMinAgeDate = () => {
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 15, today.getMonth(), today.getDate());
    return minAgeDate.toISOString().split('T')[0];
  };

  const getMaxAgeDate = () => {
    const today = new Date();
    const maxAgeDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate());
    return maxAgeDate.toISOString().split('T')[0];
  };

  
  const handleChange = (event) => {
    const newValue = event.target.value;
    setValue(newValue);
    if (type === "password") {
      handlePasswordChange(newValue);
    }
    if (onChange) {
      onChange(newValue);
    }
  };

  const [checks, setChecks] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const passwordRequirements = {
    length: (value) => value.length >= 8 && value.length <= 25,
    uppercase: (value) => /[A-Z]/.test(value),
    lowercase: (value) => /[a-z]/.test(value),
    number: (value) => /\d/.test(value),
    specialChar: (value) => /[@$!%*#?&]/.test(value)
  };

  const handlePasswordChange = (value) => {
    setChecks({
      length: passwordRequirements.length(value),
      uppercase: passwordRequirements.uppercase(value),
      lowercase: passwordRequirements.lowercase(value),
      number: passwordRequirements.number(value),
      specialChar: passwordRequirements.specialChar(value),
      passwordmatch: value === password,
    });
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
          type={type === "password" && showPassword ? "text" : type}
          maxLength={maxlength}
          onChange={handleChange}
          value={value}
          name={name}
          max={type === 'date' && !freeDate ? getMinAgeDate() : undefined}
          min={min}
          onKeyPress={
            onKeyPress
              ? (event) => {
                  if (maxlength == 3) {
                      Functions.handleKeyPress(event, 'thai');
                  } else {
                    if (type == "email") {
                      Functions.handleKeyPress(event, 'email');
                    } else {
                      Functions.handleKeyPress(event);
                    }
                  }
                }
              : null
          }
          className={`${
            roundedLeft ? "rounded-l-md" : "rounded-md"
          } font-athitiMedium border-solid border border-[#D1D5DB] focus-visible:outline-none w-full py-1.5 px-2 placeholder:text-[#6B7280] placeholder:text-base placeholder:leading-5 placeholder:font-athitiSemiBold ${
            valid === false ? "border-[#FCA5A5] pr-9" : "border-gray-300"
          }`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className={`${ valid === false ? "right-[35px]" : "right-[13px]" }  absolute top-[50%] transform -translate-y-1/2`}
          >
            {showPassword ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 12C15 13.6569 13.6569 15 12 15C10.3431 15 9 13.6569 9 12C9 10.3431 10.3431 9 12 9C13.6569 9 15 10.3431 15 12Z" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M2.45825 12C3.73253 7.94288 7.52281 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.2684 16.0571 16.4781 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12Z" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              
            ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 3L6.58916 6.58916M21 21L17.4112 17.4112M13.8749 18.8246C13.2677 18.9398 12.6411 19 12.0005 19C7.52281 19 3.73251 16.0571 2.45825 12C2.80515 10.8955 3.33851 9.87361 4.02143 8.97118M9.87868 9.87868C10.4216 9.33579 11.1716 9 12 9C13.6569 9 15 10.3431 15 12C15 12.8284 14.6642 13.5784 14.1213 14.1213M9.87868 9.87868L14.1213 14.1213M9.87868 9.87868L6.58916 6.58916M14.1213 14.1213L6.58916 6.58916M14.1213 14.1213L17.4112 17.4112M6.58916 6.58916C8.14898 5.58354 10.0066 5 12.0004 5C16.4781 5 20.2684 7.94291 21.5426 12C20.8357 14.2507 19.3545 16.1585 17.4112 17.4112" stroke="#787878" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
            )}
          </button>
        )}

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
        <p className={`font-athitiMedium ${errorShowLabel !== '' && valid === false ? 'text-[red]' : 'text-[#6B7280]'} text-sm`}>
          {errorShowLabel !== '' && valid === false ? errorShowLabel : placeholderBottom}
        </p>
      ) : null}

    {(type === "password" && showCheck) && (
        <div className="">
          <ul className="text-sm ml-1 font-athitiMedium">
            {name == 'password' && (
              <>
            <li className={checks.length ? "text-green-600" : "text-red-600"}>
              • รหัสผ่าน 8 ตัวอักษรขึ้นไป
            </li>
            <li className={checks.uppercase ? "text-green-600" : "text-red-600"}>
              • ตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ (A-Z)
            </li>
            <li className={checks.lowercase ? "text-green-600" : "text-red-600"}>
              • ตัวอักษรภาษาอังกฤษพิมพ์เล็ก(a-z)
            </li>
            <li className={checks.number ? "text-green-600" : "text-red-600"}>
              • มีตัวเลข (0-9) 
            </li>
            <li className={checks.specialChar ? "text-green-600" : "text-red-600"}>
              • มีอักขระพิเศษ (@ $ ! % * # ? &)
            </li>
            </>
            )}
            {
              (name == 'cfpassword' && password) && (
                <li className={checks.passwordmatch ? "text-green-600" : "text-red-600"}>
                  • รหัสผ่านตรงกัน 
                </li>
              )
            }
          </ul>
        </div>
      )}

    </div>
  );
};

export default InputCheck;
