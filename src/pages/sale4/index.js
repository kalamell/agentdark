import { useState } from "react";
import Image from "next/image";
import CustomPagination from "@/app/components/pagination";
import NavLink from "../../app/components/navLink";

const mockData = [
  {
    month: "ม.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.พ.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "มี.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "เม.ษ.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "พ.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "มิ.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ส.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ต.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "พ.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
  {
    month: "ธ.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 53000,
  },
];
export default function Sale4() {
  const [customerTableData, setCustomerTableData] = useState(mockData);
  const [isOpen, setIsOpen] = useState(false);
  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];
  const handleClick = () => {
    setIsOpen(true);
    document.getElementById("popup-add-team").classList.remove("hidden");
  };

  const closeModal = (e) => {
    console.log(e.target.id);
    if (e.target.id === "popup-add-team" || e.target.id === "close-button") {
      setIsOpen(false);
      document.getElementById("popup-add-team").classList.add("hidden");
    }
  };

  const copyToClipboard = async (id) => {
    await navigator.clipboard.writeText(document.getElementById(id).value);
  };

  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);
  const handlePageChange = (page) => {
    setPage(page);
  };

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[100%] max-md:w-full py-9">
          <p className="font-athitiBold text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
            ลูกทีมของฉัน
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-[24px] shadow-md">
              <div className="flex flex-row justify-between h-[38px] mb-[24px]">
                <p className="font-athitiSemiBold text-[22px] leading-[30px] max-md:w-full rounded-[12px]">
                  ลูกทีมของฉัน
                </p>
                <p
                  onClick={handleClick}
                  className="items-center justify-center font-athitiSemiBold cursor-pointer flex flex-row pt-2 pb-2 pl-4 pr-4 border bg-[#984333] text-[#FFFFFF] rounded-full max-md:px-[12px] h-full max-md:w-[65%]"
                >
                  <Image
                    src="/icon-16.svg"
                    width={15}
                    height={15}
                    alt=""
                    priority={true}
                    className="mr-2"
                  />
                  เพิ่มลูกทีม
                </p>
              </div>
              <div className="relative z-20  w-full h-auto max-h-[863px] max-md:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[12px] border">
                <div className="bg-[#FDE68A] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[3] max-md:flex-[2]">
                    ชื่อ - นามสกุล
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[1] text-left">
                    เป้าหมาย
                  </p>
                  <p className="font-athitiMedium text-[18px] leading-[22px] text-[#181B31] flex-[1] max-lg:flex-[1.3] text-left">
                    ยอดสะสมเดือนมิถุนายน
                  </p>
                </div>
                {customerTableData.map((item, index) => (
                  <div
                    key={index}
                    className="bg-[#FFFFFF] flex flex-row items-center px-[24px] h-[72px] max-md:min-w-[220%] border-b"
                  >
                    <div className="flex flex-row flex-[3] max-md:flex-[2] items-center">
                      <Image
                        src={item.image}
                        width={40}
                        height={40}
                        alt=""
                        priority={true}
                        className="m-4 ml-0"
                      />
                      <div className="flex flex-col">
                        <p className="font-athitiMedium text-[16px] leading-[20px] text-[#181B31] break-word">
                          {item.name}
                        </p>
                        <p className="font-athitiMedium text-[16px] leading-[20px] text-[#181B31] break-word text-[#6B7280]">
                          {item.email}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-[1] items-center justify-center">
                      <p className="font-athitiMedium text-[16px] leading-[20px] text-[#6B7280] w-full">
                        {item.target}
                      </p>
                    </div>
                    <div className="flex flex-[1] max-lg:flex-[1.3] items-center justify-center">
                      <p className="font-athitiMedium text-[16px] leading-[20px] text-[#6B7280] w-full">
                        {item.total}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="relative z-10 p-[24px] bg-[#FFFFFF] mt-[-10px] rounded-b-[12px]">
                <CustomPagination
                  props={{ total: total, page: page }}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          id="popup-add-team"
          onClick={closeModal}
          tabIndex="-1"
          className="hidden fixed inset-0 flex justify-center items-center z-50"
        >
          <div className="relative p-4 w-[456px] h-[350px] max-md:w-[355px] max-md:h-[360px]">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-full w-full">
              <button
                id="close-button"
                type="button"
                onClick={closeModal}
                className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="popup-add-team"
              >
                <svg
                  id="close-button"
                  className="w-3 h-3"
                  aria-hidden="true"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    id="close-button"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="p-5 text-center">
                <div className="flex h-full w-full justify-center items-center">
                  <Image
                    src="/icon-26.svg"
                    width={48}
                    height={48}
                    alt=""
                    priority={true}
                    className="mr-2"
                  />
                </div>
                <p className="mb-3 mt-3 font-athitiSemiBold">เพิ่มลูกทีม</p>
                <p className="mb-3 mt-3 font-athitiMedium text-[#6B7280] max-md:text-center">
                  Step 1 : copy link ส่งให้ลูกทีมเพื่อลงทะเบียน
                </p>
                <div className="flex flex-row justfi-between h-[43px]">
                  <input
                    id="modal-inout-1"
                    className="font-athitiMedium  border-2 text-left h-[43px] w-[352px] rounded-l-[6px] text-[#6B7280] p-1 pl-2"
                    type="text"
                    defaultValue="link/AAA"
                  />
                  <div
                    onClick={() => copyToClipboard("modal-inout-1")}
                    className="flex cursor-pointer w-[56px] border-2 border-l-0 rounded-r-[6px] justify-center items-center"
                  >
                    <Image
                      src="/icon-27.svg"
                      width={18}
                      height={18}
                      alt="copy"
                      priority={true}
                    />
                  </div>
                </div>
                <p className="mb-3 mt-3 font-athitiMedium text-[#6B7280] max-md:text-center">
                  Step 2 : copy code <br className="md:hidden" />
                  นำโค้ดส่งให้ลูกทีมกรอกช่องผู้แนะนำ
                </p>
                <div className="flex flex-row justfi-between h-[43px]">
                  <input
                    id="modal-inout-2"
                    className="font-athitiMedium  border-2 text-left h-[43px] w-[352px] rounded-l-[6px] text-[#6B7280] p-1 pl-2"
                    type="text"
                    defaultValue="Code : 1234444"
                  />
                  <div
                    onClick={() => copyToClipboard("modal-inout-2")}
                    className="flex cursor-pointer w-[56px] border-2 border-l-0 rounded-r-[6px] justify-center items-center"
                  >
                    <Image
                      src="/icon-27.svg"
                      width={18}
                      height={18}
                      alt="copy"
                      priority={true}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {isOpen && (
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-40"
            onClick={closeModal}
          ></div>
        )}
      </div>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    </>
  );
}
