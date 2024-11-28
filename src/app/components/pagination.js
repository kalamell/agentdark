import { useEffect, useState } from "react";

const CustomPagination = ({ props, onPageChange }) => {
  const [listItems, setListItems] = useState([]);
  const [total, setTotal] = useState(props.total);
  const [page, setPage] = useState(props.page);

  useEffect(() => {
    renderPages();
  }, []);

  const handleClick = (page) => {
    setPage(page);
  };

  const handleNext = () => {
    if (page + 1 <= total) setPage(page + 1);
  };

  const handlePrevious = () => {
    if (page - 1 > 0) setPage(page - 1);
  };

  useEffect(() => {
    renderPages();
    onPageChange(page);
  }, [page]);

  const renderPages = () => {
    const item = [];
    const firstPart = [];
    let midPart = false;
    const lastPart = [];
    let lastCount = 2;
    let firstCount = 2;
    let isLastcount = false;
    if (total > 6) {
      if (page + 1 >= total - 2) {
        lastCount = total - 2 - (page + 1);
        firstCount = total - 2 - (page + 1);
        lastCount += 1;
        firstCount -= 1;
        firstCount = Math.abs(firstCount);
        isLastcount = true;
      }
      for (let i = lastCount; i >= 0; i--) {
        lastPart.push(total - i);
      }
      if (page == 1) {
        for (let i = 1; i <= page + 2; i++) {
          firstPart.push(i);
        }
      } else {
        if (isLastcount) {
          for (let i = firstCount + 1; i >= 1; i--) {
            firstPart.push(page - i);
          }
        } else {
          firstPart.push(page - 1);
        }
        firstPart.push(page);
        if (page + 1 <= total) firstPart.push(page + 1);
      }
      if (page < total - 1) midPart = true;
    } else {
      for (let i = 1; i <= total; i++) {
        firstPart.push(i);
      }
    }
    for (const first of firstPart) {
      if (first === page) {
        item.push(
          <p className="border-t-[2px] border-[#984333] flex h-full items-end justify-center font-athitiRegular w-[41px] text-[16px] leading-[20px] text-[#984333] pt-[12px]">
            {first}
          </p>
        );
      } else {
        item.push(
          <p
            onClick={() => handleClick(first)}
            className="cursor-pointer flex h-full items-end justify-center font-athitiRegular w-[41px] text-[16px] leading-[20px] text-[#6B7280]"
          >
            {first}
          </p>
        );
      }
    }
    if (midPart) {
      item.push(
        <p className="flex h-full items-end justify-center font-athitiRegular w-[41px] text-[16px] leading-[20px] text-[#6B7280]">
          ...
        </p>
      );
    }
    for (const last of lastPart) {
      item.push(
        <p
          onClick={() => handleClick(last)}
          className="cursor-pointer flex h-full items-end justify-center font-athitiRegular w-[41px] text-[16px] leading-[20px] text-[#6B7280]"
        >
          {last}
        </p>
      );
    }

    setListItems(item);
  };

  return (
    <>
      <div className="flex flex-row justify-between max-xl:justify-center items-end gap-[65px]">
        <div
          onClick={() => handlePrevious()}
          className="cursor-pointer flex items-center gap-[12px] max-md:hidden"
        >
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M5.70711 10.3321C5.31658 10.7226 4.68342 10.7226 4.2929 10.3321L0.292894 6.33211C-0.0976312 5.94158 -0.0976312 5.30842 0.292894 4.91789L4.29289 0.917894C4.68342 0.527369 5.31658 0.527369 5.70711 0.917894C6.09763 1.30842 6.09763 1.94158 5.70711 2.33211L3.41421 4.625L15 4.625C15.5523 4.625 16 5.07271 16 5.625C16 6.17728 15.5523 6.625 15 6.625L3.41421 6.625L5.70711 8.91789C6.09763 9.30842 6.09763 9.94158 5.70711 10.3321Z"
              fill="#9CA3AF"
            />
          </svg>

          <p className="whitespace-nowrap font-athitiRegular text-[16px] leading-[20px] text-[#6B7280]">
            ย้อนกลับ
          </p>
        </div>
        {/* <div className="flex w-[294px] h-full items-end justify-center">
          {listItems}
        </div> */}

        <div className="flex w-[294px] h-full items-end justify-center">
          {listItems.map((item, i) => (
            <span key={i}>{item}</span>
          ))}
        </div>
        <div
          onClick={() => handleNext()}
          className="flex items-center gap-[12px] cursor-pointer max-md:hidden"
        >
          <p className="whitespace-nowrap font-athitiRegular text-[16px] leading-[20px] text-[#6B7280]">
            ถัดไป
          </p>
          <svg
            width="16"
            height="11"
            viewBox="0 0 16 11"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2929 0.917893C10.6834 0.527369 11.3166 0.527369 11.7071 0.917893L15.7071 4.91789C16.0976 5.30842 16.0976 5.94158 15.7071 6.33211L11.7071 10.3321C11.3166 10.7226 10.6834 10.7226 10.2929 10.3321C9.90238 9.94158 9.90238 9.30842 10.2929 8.91789L12.5858 6.625H1C0.447716 6.625 -2.41411e-08 6.17728 0 5.625C2.41411e-08 5.07272 0.447716 4.625 1 4.625H12.5858L10.2929 2.33211C9.90238 1.94158 9.90238 1.30842 10.2929 0.917893Z"
              fill="#9CA3AF"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

export default CustomPagination;
