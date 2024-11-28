import Link from "next/link";

export default function navLink(props) {
  return (
    <div className="bg-[#F1F6F7] py-5 px-8">
      <div className="container mx-auto flex flex-wrap gap-x-[8px] gap-y-[4px]">
        {props.navLink.map((item, index) => (
          <div key={index} className="flex items-center flex-wrap gap-[8px]">
            <div className="items-center gap-x-4 font-athitiMedium text-base leading-[20px] text-[#6B7280]">
              <Link className="w-max" href={`${item.link}`}>
                {item.nav}
              </Link>
            </div>
            <svg
              width="6"
              height="10"
              viewBox="0 0 6 10"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`${props.navLink.length - 1 == index ? "hidden" : ""}`}
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0.292894 9.70711C-0.0976307 9.31658 -0.0976307 8.68342 0.292894 8.29289L3.58579 5L0.292893 1.70711C-0.0976311 1.31658 -0.0976311 0.683418 0.292893 0.292894C0.683417 -0.0976312 1.31658 -0.0976312 1.70711 0.292894L5.70711 4.29289C6.09763 4.68342 6.09763 5.31658 5.70711 5.70711L1.70711 9.70711C1.31658 10.0976 0.683418 10.0976 0.292894 9.70711Z"
                fill="#9CA3AF"
              />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
