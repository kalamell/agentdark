import { useState, useEffect } from "react";

export default function StyledFileInput({
  label,
  fileChange,
  id,
  placeholderBottom,
  required,
  value,
  multiple = false, 
  accept = '',
  valid,
  defaultFilename='',
  Ref,
  reset=true

}) {
  const [fileNames, setFileNames] = useState(" ");

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const names = files.map((file) => file.name).join(", ");
      setFileNames(names);
      fileChange(multiple ? files : files[0]); // Return array if multiple, else single file
    } else {
      setFileNames("No file chosen");
    }
  };

  useEffect(() => {
    if (!reset) {
      setFileNames("");
    }
  });

  

  

  return (
    <div className="flex flex-col gap-y-1.5" ref={Ref}>
      <p className="font-athitiSemiBold text-base text-[#374151] leading-[20px]">
        {label} &nbsp;
        {required ? <span className="text-[#FF0000]">*</span> : null}
      </p>
      <div className="flex items-center w-full">
        <input
          type="file"
          id={id}
          className="hidden"
          onChange={handleFileChange}
          value={value}
          multiple={multiple}
          accept={accept}
        />
        <label
          htmlFor={id}
          className={`h-[40px] whitespace-nowrap text-ellipsis overflow-hidden cursor-pointer font-athitiSemiBold text-base bg-[#ffffff] text-[#6B7280] leading-[20px] border ${ valid === false ? "border-[#FCA5A5]" : "border-[#D1D5DB]" } w-full relative py-[8px] pl-[12px] pr-[127px] rounded-lg`}
        >
          <span className="">{fileNames}</span>
          <span className="absolute right-0 top-0 h-full text-[#374151] px-[12px] bg-[#F9FAFB] content-center rounded-r-lg border-l-[1px]">
            Choose a file {valid === false && (
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 absolute top-[50%] right-[120px] mt-[-8px]"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8ZM9 12C9 12.5523 8.55229 13 8 13C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11C8.55229 11 9 11.4477 9 12ZM8 3C7.44772 3 7 3.44772 7 4V8C7 8.55228 7.44772 9 8 9C8.55229 9 9 8.55228 9 8V4C9 3.44772 8.55229 3 8 3Z"
                    fill="#EF4444"
                  />
                </svg>
              )}
          </span>
        </label>
      </div>
      {placeholderBottom ? (
        <p className="font-athitiMedium text-[#6B7280] text-sm">
          {placeholderBottom}
        </p>
      ) : null}
    </div>
  );
}
