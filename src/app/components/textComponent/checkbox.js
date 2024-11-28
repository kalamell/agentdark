import { useState, useEffect } from "react";

export default function Checkbox({ valid, text, value, onChange, Ref }) {
 
  const [isChecked, setIsChecked] = useState(Boolean(value));

  useEffect(() => {
    setIsChecked(Boolean(value));
  }, [value]);

  const handleCheckboxChange = (event) => {
    const newValue = event.target.checked;
    setIsChecked(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  console.log( "is check : ", isChecked);

  return (
    <div className="flex gap-x-2">
      <label className="flex gap-x-2" ref={Ref}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={`accent-[#984333] w-[16px] h-[16px] my-[2px] ${valid === false ? "border-[red]" : ""}`}
        />
        <p
          className={`font-athitiSemiBold text-base text-[#181B31] leading-[20px] cursor-pointer ${valid === false ? "text-[red]" : ""}`}
          dangerouslySetInnerHTML={{ __html: text }}
        />
      </label>
    </div>
  );
}
