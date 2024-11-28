import { useEffect, useState, useRef } from "react";
import NavLink from "../../app/components/navLink";

const mockData = [
  {
    month: "ม.ค.",
    fullMonth: "มกราคม",
    year: "2024",
    total: 23000,
    target: 53000,
  },
  {
    month: "ก.พ.",
    fullMonth: "กุมภาพันธ์",
    total: 46000,
    target: 56000,
  },
  {
    month: "มี.ค.",
    fullMonth: "มีนาคม",
    total: 23000,
    target: 25000,
  },
  {
    month: "เม.ษ.",
    fullMonth: "เมษายน",
    total: 12999,
    target: 18999,
  },
  {
    month: "พ.ค.",
    fullMonth: "พฤษภาคม",
    total: 6400,
    target: 16400,
  },
  {
    month: "มิ.ย.",
    fullMonth: "มิถุนายน",
    total: 7000,
    target: 9000,
  },
  {
    month: "ก.ค.",
    fullMonth: "กรกฎาคม",
    total: 23000,
    target: 53000,
  },
  {
    month: "ส.ค.",
    fullMonth: "สิงหาคม",
    total: 46000,
    target: 56000,
  },
  {
    month: "ก.ย.",
    fullMonth: "กันยายน",
    total: 23000,
    target: 18999,
  },
  {
    month: "ต.ค.",
    fullMonth: "ตุลาคม",
    total: 12999,
    target: 53000,
  },
  {
    month: "พ.ย.",
    fullMonth: "พฤศจิกายน",
    total: 6400,
    target: 16400,
  },
  {
    month: "ธ.ค.",
    fullMonth: "ธันวาคม",
    total: 7000,
    target: 9000,
  },
];

export default function ChangePassword() {
  const [selectedMonth, setSelectedMonth] = useState(6);
  const [tableData, setTableData] = useState([]);
  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยรถยนต์ TOYOTA C-HR 1.8cc 4 Door ปี2023", link: "#" },
  ];
  const handleChange = (event) => {
    if (event && event.target) {
      setSelectedMonth(Number(event.target.value));
    }
  };

  useEffect(() => {
    fetchTableData();
  }, [selectedMonth]);

  const fetchTableData = () => {
    const data = [];
    for (let i = 0; i < selectedMonth; i++) {
      const item = {
        fullMonth: mockData[i].fullMonth,
        total: mockData[i].total,
        target: mockData[i].target,
      };
      data.push(item);
    }
    setTableData(data);
  };

  return (
    <>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto w-[100%] max-md:w-full py-9">
          <p className="font-athitiBold text-4xl max-md:text-3xl leading-[48px] max-md:leading-[38px] text-[#181B31] text-center">
            งานขายของลูกทีม
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-[24px] p-[24px] shadow-md max-md:pb-[62px]">
              <div className="flex flex-row justify-between h-[38px] mb-[24px] max-md:flex-col max-md:h-[78px]">
                <p className="font-athitiSemiBold text-[22px] leading-[30px] pb-[32px] max-md:w-full max-md:pb-[10px]">
                  งานขายของ Jane Cooper
                </p>
                <div className="relative inline-block w-[134px] max-md:w-[100%]">
                  <select
                    className="focus:outline-none py-[9px] px-[16px] shadow-sm font-athitiRegular text-[16px] text-[#6B7280] leading-[20px] bg-white border rounded-[40px] block w-[100%] appearance-none"
                    onChange={handleChange}
                    value={selectedMonth}
                  >
                    <option className="bg-white" value="6" selected="selected">
                      6 เดือนล่าสุด
                    </option>
                    <option className="bg-white" value="12">
                      12 เดือนล่าสุด
                    </option>
                  </select>
                  <div className="flex absolute h-[20px] w-[20px] right-[16px] top-[9px] items-center justify-center pointer-events-none">
                    <svg
                      className="w-4 h-4 text-[#6B7280]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path stroke-width="2" d="M19 9l-7 7-7-7"></path>
                    </svg>
                  </div>
                </div>
              </div>
              <div className="w-full h-auto max-h-[500px] max-md:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[12px] border">
                <div className="font-athitiMedium text-[18px] text-[#181B31] bg-[#FDE68A] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                  <p className=" leading-[22px]  flex-[3] max-lg:flex-[2] max-md:flex-[1.5]">
                    เดือน
                  </p>
                  <p className="leading-[22px] flex-[1]">ยอดรวม(บาท)</p>
                  <p className="leading-[22px] flex-[1]">ยอดรวม(บาท)</p>
                  <p className="leading-[22px] flex-[1]">ยอดรวม(บาท)</p>
                  <p className="leading-[22px] flex-[1]">เป้าหมาย(บาท)</p>
                </div>
                {tableData.map((item, index) => (
                  <div
                    key={index}
                    className="font-athitiMedium text-[16px] text-left text-[#6B7280] bg-[#FFFFFF] flex flex-row items-center px-[24px] h-[72px] max-md:min-w-[220%] border-b"
                  >
                    <p className="leading-[20px] flex-[3] text-[#181B31] max-lg:flex-[2] max-md:flex-[1.5]">
                      {item.fullMonth}
                    </p>
                    <p className="leading-[20px] flex-[1]">{item.total}</p>
                    <p className="leading-[20px] flex-[1]">{item.total}</p>
                    <p className="leading-[20px] flex-[1]">{item.total}</p>
                    <p className="leading-[20px] flex-[1]">{item.target}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
    </>
  );
}
