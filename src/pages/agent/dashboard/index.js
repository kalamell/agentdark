import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import CustomPagination from "@/app/components/pagination";
import Checkbox from "@/app/components/textComponent/checkbox";
import NavLink from "@/app/components/navLink";
import Head from "next/head";
import useStore from "@/store/store";
import agentStore from "@/store/agentStore";
import { useRouter } from "next/router";
import { formatNumberWithCommas }  from '@/lib/utils';
import Script from 'next/script';


const mySaletMockData = [
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

const teamSaleMockData = [
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
    total: 13000,
    target: 33000,
  },
  {
    month: "มี.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 43000,
    target: 53000,
  },
  {
    month: "เม.ษ.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 23000,
    target: 63000,
  },
  {
    month: "พ.ค.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 33000,
    target: 53000,
  },
  {
    month: "มิ.ย.",
    name: "Jane Cooper",
    email: "jane.cooper@example.com",
    image: "/img-5.png",
    total: 13000,
    target: 73000,
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

const customerMockData = [
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "รอจ่ายเงิน",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "รอตรวจสภาพ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
  {
    name: "Jane Cooper",
    plate: "5 ขส 2004",
    status: "สำเร็จ",
    total: "23,000",
  },
];

const pieChartMockData = [100, 80];

const myLineChartOptions = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 6,
  },
  series: [
    {
      name: "Sale",
      data: [],
      color: "#3DCEB2",
    },
    {
      name: "Comm",
      data: [],
      color: "#1A56DB",
    },
  ],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    show: true,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 10,
    },
  },
};

const teamLineChartOptions = {
  chart: {
    height: "100%",
    maxWidth: "100%",
    type: "line",
    fontFamily: "Inter, sans-serif",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 6,
  },
  series: [
    {
      name: "Sale",
      data: [],
      color: "#3DCEB2",
    },
    {
      name: "Comm",
      data: [],
      color: "#1A56DB",
    },
  ],
  legend: {
    show: false,
  },
  stroke: {
    curve: "smooth",
  },
  xaxis: {
    categories: [],
  },
  yaxis: {
    show: true,
  },
  grid: {
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 10,
    },
  },
};

const pieChartOptions = {
  chart: {
    type: "donut",
  },
  series: pieChartMockData,
  labels: [],
  colors: ["#3dceb2", "#984333", "#181B31", "#fef9c3", "#FEE042"],
  dataLabels: {
    enabled: true,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "65%",
      },
    },
  },
  legend: {
    position: "bottom",
    fontSize: "16px",
    labels: {
      colors: ["#00000061", "#00000061"],
    },
    itemMargin: {
      horizontal: 30,
      vertical: 20,
    },
  },
};

export default function Sale() {
  const [isOpen, setIsOpen] = useState(false);
  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ระบบงานขาย", link: "#" },
  ];

  const router = useRouter();
  const { user, setCom, cc } = useStore();
  const { myAgent, agent } = agentStore();

  const [selectedMonth, setSelectedMonth] = useState(6);
  const [myChartoptions, setMyChartOptions] = useState(myLineChartOptions);
  const [teamChartoptions, setTeamChartOptions] =
    useState(teamLineChartOptions);
  const [mySaleTableData, setMySaleTableData] = useState([]);
  // const [teamSaleableData, setteamSaleableData] = useState([]);
  const [customerTableData, setCustomerTableData] = useState(customerMockData);
  const lineChartRefmy = useRef(null);
  const lineChartRefTeam = useRef(null);
  const PieRefTeam = useRef(null);
  
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(10);


  const hasFetched = useRef(false);


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


  const handleChange = (event) => {
    if (event && event.target) {
      setSelectedMonth(Number(event.target.value));
    }
  };

  const copyToClipboard = async (id) => {
    await navigator.clipboard.writeText(document.getElementById(id).value);
    //console.log(id);
  };

  useEffect(() => {
    if (!hasFetched.current) {
     
      //fetchTeamSaleChart();
      
      myAgent();
      //fetchPieChartData();
      //fetchMySaleChart();

      hasFetched.current = true;
    }
  }, []);

  useEffect(() => {
    console.log("AGEN T: ", agent);
    if (agent) {
      console.log("FETCH CHART");
      fetchPieChartData();
      fetchMySaleChart();
      fetchTeamSaleChart();
    }

     
  }, [agent]);

  useEffect(() => {
    // fetchTeamSaleChart();
    
    //fetchMySaleTableData();
    // fetchteamSaleableData();
    
    myAgent({
      month: selectedMonth
    });

  }, [selectedMonth]);

  const fetchPieChartData = () => {
    
    const label = [];
    const series = [];
    for (const data of agent.apps_status) {
      label.push(data._id);
    }
    for (const data of agent.apps_status) {
      series.push(data.count);
    }

    pieChartOptions.labels = label;
    pieChartOptions.series = series;

    if (PieRefTeam.current) {
      PieRefTeam.current.destroy();
    }

    if (
      document.getElementById("pie-chart") &&
      typeof ApexCharts !== "undefined"
    ) {
      PieRefTeam.current = new ApexCharts(
        document.getElementById("pie-chart"),
        pieChartOptions
      );
      PieRefTeam.current.render();
    }
  };

  const fetchMySaleChart = () => {
    const totalList = [];
    const targetLits = [];
    const categories = [];


    if (agent) {
      for (const data of agent.sale_months) {
        totalList.push(Number(data.sale).toFixed(2));
        targetLits.push(Number(data.comm).toFixed(2));
        categories.push(convertDatesToThaiMonths(data._id));

      }
      //teamLineChartOptions.xaxis.categories = [agent.sale_months];
      myChartoptions.series[0].name = 'ยอดขาย';
      myChartoptions.series[1].name = 'ค่าคอม';
      myChartoptions.series[0].data = totalList;
      myChartoptions.series[1].data = targetLits;
      myChartoptions.xaxis.categories = categories;

      /*for (let i = 0; i < selectedMonth; i++) {
        totalList.push(mySaletMockData[i].total);
        targetLits.push(mySaletMockData[i].target);
        categories.push(mySaletMockData[i].month);
      }
      myChartoptions.series[0].data = totalList;
      myChartoptions.series[1].data = targetLits;
      myChartoptions.xaxis.categories = categories;
      */
      if (lineChartRefmy.current) {
        lineChartRefmy.current.destroy();
      }
      if (
        document.getElementById("line-chart-my") &&
        typeof ApexCharts !== "undefined"
      ) {
        console.log("11111");
        lineChartRefmy.current = new ApexCharts(
          document.getElementById("line-chart-my"),
          myChartoptions
        );
        lineChartRefmy.current.render();
      }
    }
  };

  const fetchTeamSaleChart = () => {
    const totalList = [];
    const targetLits = [];
    const categories = [];
    /*for (let i = 0; i < 6; i++) {
      totalList.push(teamSaleMockData[i].total);
      targetLits.push(teamSaleMockData[i].target);
      categories.push(teamSaleMockData[i].month);
    }*/
   if (agent) {
    for (const data of agent.teams_months) {
      totalList.push(Number(data.sale).toFixed(2));
      targetLits.push(Number(data.comm).toFixed(2));
      categories.push(convertDatesToThaiMonths(data._id));

    }
    //teamLineChartOptions.xaxis.categories = [agent.sale_months];
    teamChartoptions.series[0].data = totalList;
    teamChartoptions.series[1].data = targetLits;
    teamChartoptions.xaxis.categories = categories;

    if (lineChartRefTeam.current) {
      lineChartRefTeam.current.destroy();
    }
    if (
      document.getElementById("line-chart-team") &&
      typeof ApexCharts !== "undefined"
    ) {
      console.log("2222");
      lineChartRefTeam.current = new ApexCharts(
        document.getElementById("line-chart-team"),
        teamChartoptions
      );
      lineChartRefTeam.current.render();
    }
  }
  };

  // const fetchteamSaleableData = () => {
  //     const data = [];
  //     for (let i = 0; i < selectedMonth; i++) {
  //         const item = {
  //             fullMonth: mySaletMockData[i].fullMonth,
  //             total: mySaletMockData[i].total,
  //             target: mySaletMockData[i].target
  //         }
  //         data.push(item)
  //     }
  //     setteamSaleableData(data)
  // }

  const fetchMySaleTableData = () => {
    const data = [];
    for (let i = 0; i < selectedMonth; i++) {
      const item = {
        fullMonth: mySaletMockData[i].fullMonth,
        total: mySaletMockData[i].total,
        target: mySaletMockData[i].target,
      };
      data.push(item);
    }
    setMySaleTableData(data);
  };

  const handlePageChange = (page) => {
    setPage(page);
  };

  useEffect(() => {
    let timer;
    if (user) {
        if (user.agent) {
            if (user.approve_at) {
                return;
            } else {
                router.push('/agent/registered');
            }
        } else {
            router.push('/agent/register');
        }
    } else if (user === null) {
    // Set a 10-second delay before redirecting to login
        timer = setTimeout(() => {
            router.push('/login');
        }, 500);
    }

    return () => clearTimeout(timer);

  }, [user, router]);

  const [formData, setFormData] = useState({ accept: cc});

  const handleCheck = (label, value) => {
    const [parent, key] = label.split(".");
    console.log(parent, '- ', value);
    setFormData((prev) => ({
      ...prev,
      accept: value
    }));
  };

  useEffect(() => {


    console.log('form data : ', formData);
    

  }, [formData]);

  const monthsInThai = {
    "01": "มกราคม",
    "02": "กุมภาพันธ์",
    "03": "มีนาคม",
    "04": "เมษายน",
    "05": "พฤษภาคม",
    "06": "มิถุนายน",
    "07": "กรกฎาคม",
    "08": "สิงหาคม",
    "09": "กันยายน",
    "10": "ตุลาคม",
    "11": "พฤศจิกายน",
    "12": "ธันวาคม"
  };
  
  const convertDatesToThaiMonths = (date) => {
    const [year, month] = date.split("-");
    return `${monthsInThai[month]}`;
  };

  return (
    <>
      <Head>
        <title>ระบบงานขาย</title>
      </Head>
      <NavLink navLink={navLink} />
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto">
          <div className="flex flex-col justify-center items-center pt-[48px] pb-[36px] px-4 py-9">
            <p className="font-athitiBold pb-[24px] text-[36px] leading-[48px] text-[#181B31] text-center max-mp:leading-[38px] max-mp:text-[30px]">
              ระบบงานขาย
            </p>
            <div className="flex flex-col p-[24px] shadow-md bg-[#FFFFFF] rounded-[24px] gap-y-[24px] w-full">
              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31 bg-[#F1F5D8] rounded-t-[12px] max-mp:w-full">
                  งานขายของฉัน
                </p>
                <div className="flex flex-row bg-[#FBFCF3] px-[44px] py-[48px] gap-[30px] rounded-[12px] max-mp:p-5 max-mp:flex-col">
                  <div className="flex flex-col justify-center items-center w-full gap-y-[24px] max-mp:w-full max-mp:flex-col">
                    <div className="flex bg-white p-[24px] shadow-md border rounded-[12px] items-center w-full h-[128px] max-mp:w-full max-mp:h-full max-mp:mb-5">
                      <div className="w-full">
                        <div className="flex flex-row justify-between h-[38px] max-md:flex-col">
                          <p className="flex font-athitiRegular text-[18px] text-[#111827] items-center max-md:pl-0 max-md:pb-[12px]">
                            ยอดขายทั้งหมด
                          </p>
                          <div className="relative inline-block w-[140px] max-md:w-full">
                            <select
                              className="focus:outline-none py-[9px] px-[16px] shadow-sm font-athitiRegular text-[16px] text-[#6B7280] leading-[20px] bg-white border rounded-[40px] block w-[100%] appearance-none"
                              onChange={handleChange}
                              value={selectedMonth}
                            >
                              <option className="bg-white" value="6" selected>
                                6 เดือนล่าสุด
                              </option>
                              <option className="bg-white" value="12">
                                12 เดือนล่าสุด
                              </option>
                            </select>
                            <div className="flex absolute h-[20px] w-[20px] right-[12px] top-[10px] items-center justify-center pointer-events-none">
                              <svg
                                className="w-4 h-4 text-[#6B7280]"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                              </svg>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-row justify-content max-md:mt-[39px]">
                          <p className="font-athitiSemiBold text-[#3DCEB2] text-[30px] leading-[40px] max-mp:pl-0 max-mp:pt-2">
                          { Number(agent?.sale_all).toLocaleString() }
                          </p>
                          {/*<p className="flex items-end font-athitiRegular text-[#6B7280] text-[18px] leading-[22px] pl-[8px] max-mp:pt-4">
                            จาก { Number(agent?.target).toLocaleString() }
                          </p>*/}
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full h-[38px] justify-end">
                      <div className="flex flex-row w-[400px] h-[20px] justify-end items-center">
                        <hr className="h-1 w-[73px] bg-[#2D5A7A] border-0 rounded" />
                        <div className="pl-[16px] pr-[25px] font-athitiRegular text-[#667085] text-[16px] leadinf-[20px]">
                          คอมมิชชั่น
                        </div>
                        <hr className="h-1 w-[73px] bg-[#3DCEB2] border-0 rounded" />
                        <div className="pl-[16px] font-athitiRegular text-[#667085] text-[16px] leadinf-[20px]">
                          ยอดขาย
                        </div>
                      </div>
                    </div>
                    <div className="max-mp:w-full h-[500px] w-full">
                      <div className="bg-white" id="line-chart-my"></div>
                    </div>
                  </div>
                  <div className="flex flex-col max-mp:flex-col items-center w-full max-mp:w-full gap-y-7">
                    <div className="flex flex-row justify-center items-center shadow-md bg-white border rounded-[12px] w-full h-[128px] max-mp:w-full">
                      <div className="flex flex-col flex-1 justify-center items-center border-r h-full p-[24px]">
                        <p className="font-athitiSemiBold text-[30px] leading-[40px]">
                          { Number(agent?.target).toLocaleString() }
                        </p>
                        <p className="font-athitiRegular flex justify-center w-[78px] h-[24px] border rounded-[12px] bg-[#0288D133] text-[#2D5A7A] text-[16px] leading-[20px] px-[10px] py-[2px] mt-[8px]">
                          เป้าหมาย
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 justify-center items-center md:border-r h-full p-[24px]">
                        <p className="font-athitiSemiBold text-[30px] leading-[40px]">
                        { Number(agent?.sale_sum).toLocaleString() }
                        </p>
                        <p className="font-athitiRegular flex justify-center w-[78px] h-[24px] border rounded-[12px] text-[16px] leading-[20px] px-[10px] py-[2px] bg-[#3DCEB2] text-[#FFFFFF]  mt-[8px]">
                          ยอดขาย
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col w-full max-mp:flex-col max-mp:w-full gap-[28px]">
                      <div className="flex flex-row h-[36px] justify-between items-center max-mp:flex-col max-mp:items-start max-mp:mb-10">
                          
                          <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#181B31] max-mp:mb-4">
                            งานขายของฉัน
                          </p>
                          <div className="flex flex-row h-[36px] gap-[12px] font-athitiSemiBold max-mp:w-full max-md:justify-between">

                            <div className="mx-auto flex items-center">
                              <Checkbox 
                                onChange={() => {
                                  
                                  if (formData.accept == '') {
                                    setCom('Y');
                                    handleCheck("accept", 'Y');
                                  } else {
                                    handleCheck("accept", '');
                                    setCom('');
                                  }
                                  //alert('c');
                                }}
                                value={Boolean(cc)}
                                text="เปิดคอมมิชชั่น" />
                            </div>
                              
                            <Link href="/agent/mysale">
                            <p className="flex text-nowrap items-center px-[18px] py-[6px] text-[14px] leading-[20px] border border-[#984333] bg-[#FFFFFF] text-[#984333] rounded-[32px] max-mp:mr-0 max-mp:pl-7 max-mp:pr-7 max-md:w-full max-mp:justify-center">
                              ดูของฉันทั้งหมด
                            </p>
                            </Link>
                          </div>

                      </div>
                    </div>
                      
                    <div className="w-full h-auto max-h-[500px] bg-white rounded-[8px] border overflow-y-auto overflow-x-auto max-mp:min-w-[100%]">                      
                      <div className="font-athitiMedium text-[18px] text-left bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[150%]">
                        <p className="leading-[22px] flex-[1]">เดือน</p>
                        <p className="leading-[22px] flex-[1] text-right ml-auto max-w-[250px]">ยอดขาย (บาท)</p>
                        <p className="leading-[22px] flex-[1] text-right ml-auto max-w-[250px]">ผลตอบแทน (บาท)</p>
                      </div>
                      {
                        agent?.sale_months.map((item, index) => (
                          <div
                            key={index}
                            className="font-athitiMedium text-[16px] text-left text-[#6B7280] bg-[#FFFFFF] flex flex-row items-center h-[72px] px-[24px] border-b max-md:min-w-[150%]"
                          >
                            <p className="leading-[20px] flex-[1] text-[#111827]">
                              {convertDatesToThaiMonths(item._id)}
                            </p>
                            <p className="leading-[20px] flex-[1] text-right max-w-[250px]">
                              {Number(item.sale.toFixed(2)).toLocaleString()}
                            </p>
                            <p className="leading-[20px] flex-[1] text-right max-w-[250px]">
                              {Number(item.comm.toFixed(2)).toLocaleString()}
                            </p>
                          </div>

                        ))
                      }
                      {
                      /*mySaleTableData.map((item, index) => (
                        <div
                          key={index}
                          className="font-athitiMedium text-[16px] text-left text-[#6B7280] bg-[#FFFFFF] flex flex-row items-center h-[72px] px-[24px] border-b max-md:min-w-[150%]"
                        >
                          <p className="leading-[20px] flex-[1] text-[#111827]">
                            {item.fullMonth}
                          </p>
                          <p className="leading-[20px] flex-[1]">
                            {item.total}
                          </p>
                          <p className="leading-[20px] flex-[1]">
                            {item.target}
                          </p>
                        </div>
                      ))*/}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31 bg-[#FED7AA] rounded-t-[12px] max-mp:w-full">
                  ลูกค้าของฉัน
                </p>
                <div className="flex flex-row bg-[#FFF7ED] py-[48px] rounded-[12px] max-mp:p-5 max-mp:flex-col">
                  <div className="flex flex-[1] h-[432px] w-full mx-auto max-xl:w-[500px] max-mp:flex-col max-md:w-full">
                    <div
                      className="flex flex-grow items-center"
                      id="pie-chart"
                    ></div>

                  </div>
                  <div className="flex flex-[1.5] flex-col mr-[44px] max-mp:flex-col justify-center flex flex-row max-mp:mr-0 gap-y-7">
                    <div className="bg-transparent font-athitiMedium  rounded-[12px]   w-full h-auto grid grid-cols-1 md:grid-cols-3 max-md:pt-[20px] max-md:pb-[20px]">
                      
                      {
                        agent?.apps_status.map((item, index) => {

                          let textCount = 'text-[#3DCEB2]';
                          let status = item._id;
                          let color = 'bg-[#D1FAE5] text-[#065F46]';

                          if (item._id == 'Paid') {
                            status = 'สำเร็จ';
                           
                          }

                          if (item._id == 'CheckOut') {
                            status = 'รอจ่ายเงิน';
                            textCount = 'text-[#984333]';
                            color = 'text-[#991B1B] bg-[#FEE2E2]';
                           
                          }

                          if (item._id == 'Document') {
                            status = 'รอส่งเอกสาร';
                            textCount = 'text-[#984333]';
                            color = 'text-[#984333] bg-[#FEE042]'
                           
                          }

                          if (item._id == 'Quotation') {
                            status = 'ใบเสนอราคา';
                            textCount = 'text-[#984333]';
                            color = 'text-[#181B31] bg-yellow-100';
                           
                          }

                          if (item._id == 'New') {
                            status = 'รอทำรายการ';
                            textCount = 'text-[#984333]';
                            color = 'text-[#181B31] bg-yellow-100';
                           
                          }

                          return(
                            <div
                            key={index}
                            className={`bg-white flex flex-col items-center justify-center border-r  border-b max-md:pb-[20px]  p-4
                                        ${index === agent.apps_status.length - 1 ? '' : ''}`}
                          >
                              <p className={`font-athitiSemiBold text-[68px] leading-[48px] ${textCount}`}>
                                {item.count}
                              </p>
                              <p className={`mt-[8px] px-[12px] py-[2px] text-[16px] leading-[20px] rounded-[12px] ${color}`}>
                                {status}
                              </p>
                            </div>
                          )
                        })
                      }
                      
                      {/*<div className="flex flex-col flex-1 items-center justify-center border-r max-md:border-r-0 max-md:pb-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#3DCEB2]">
                          250
                        </p>
                        <p className="mt-[8px] px-[12px] py-[2px] text-[16px] leading-[20px] rounded-[12px] bg-[#D1FAE5] text-[#065F46]">
                          สำเร็จ
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 min-h-full items-center justify-center border-r max-md:border-r-0 max-md:pb-[20px]  max-md:pt-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#181B31]">
                          2
                        </p>
                        <p className="mt-2 pl-2 pr-2 rounded-[12px] bg-[#FEF3C7] text-[#181B31]">
                          รอตรวจสภาพ
                        </p>
                      </div>
                      <div className="flex flex-col flex-1 min-h-full items-center justify-center  max-md:pt-[20px]">
                        <p className="font-athitiSemiBold text-[48px] leading-[48px] text-[#984333]">
                          5
                        </p>
                        <p className="mt-2 pl-2 pr-2 rounded-[12px] bg-[#FEE2E2] text-[#991B1B]">
                          รอจ่ายเงิน
                        </p>
                      </div>
                      */} 
                    </div>

                    <div className="flex flex-[1.4] flex-col w-full max-mp:flex-col max-mp:w-full gap-[28px]">
                      <div className="flex flex-row h-[36px] justify-between items-center  max-mp:items-start max-mp:mb-2">
                        <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#181B31] ">
                          ลูกค้าของฉัน
                        </p>
                        <div className="flex flex-row h-[36px] gap-[12px] font-athitiSemiBold">
                          
                          <Link href="/agent/mycustomer">
                          <p className="flex text-nowrap items-center px-[18px] py-[6px] text-[14px] leading-[20px] border border-[#984333] bg-[#FFFFFF] text-[#984333] rounded-[32px] max-mp:mr-0 max-mp:pl-7 max-mp:pr-7 max-md:w-full max-mp:justify-center">
                            ดูลูกค้าของฉันทั้งหมด
                          </p>
                          </Link>
                          
                        </div>
                      </div>
                    </div>

                    <div className="w-full h-auto max-h-[776px] max-mp:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[8px] border-2">
                      <div className="font-athitiMedium text-[18px] bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                        <p className="leading-[22px] flex-[1.3]">
                          รายชื่อลูกค้า
                        </p>
                        <p className="leading-[22px] flex-[1]">ทะเบียนรถยนต์</p>
                        <p className="leading-[22px] flex-[1] text-center max-w-[250px]">สถานะ</p>
                        <p className="leading-[22px] flex-[1] text-right max-w-[250px]">ราคา (บาท)</p>
                      </div>
                      { agent?.apps_latest.map((item, index) => {

                        let link = `/app/${item._id}`;
                        
                        let color = 'text-[#181B31] bg-yellow-100';
                        let status = item.status;

                        if (item.status == 'CheckOut') {
                          status = 'รอจ่ายเงิน';
                          color = 'text-[#991B1B] bg-[#FEE2E2]';
                        }


                        if (item.status == 'Quotation') {
                          status = 'ใบเสนอราคา';
                        }

                        if (item.status == 'Document') {
                          link = `/app/${item._id}/upload`;
                          status = 'รอส่งเอกสาร';
                          color = 'text-[#984333] bg-[#FEE042]'
                        }

                        if (item.status == 'Paid') {
                          link = '#';
                          color = 'text-green-800 bg-green-100';
                          status = 'สำเร็จ';
                        }

                        return (
                          <Link href={link}>
                          <div
                          key={index}
                          className="text-[16px] bg-[#FFFFFF] font-athitiMedium flex flex-row p-5 max-md:min-w-[220%] border-b-2"
                          >
                          <p className="leading-[20px] flex-[1.3]">
                          {`${item.covered.name.first} ${item.covered.name.last}`}
                          </p>
                          <p className="leading-[20px] flex-[1] text-left text-[#6B7280]">
                            {item.covered.car.no.length > 0 ? item.covered.car.no[0] + ' ' + item.covered.car.no[1] : '-'}
                          </p>
                          <div className="flex flex-[1] justify-center">
                              <p className={`font-athitiSemiBold text-sm leading-[20px]  rounded-[10px] py-0.5 px-2.5 ${color}`}>
                                {status}
                              </p>
                          </div>

                          <p className="leading-[20px] flex-[1] text-right max-w-[250px] text-[#6B7280]">
                            {formatNumberWithCommas( item.price.toFixed(2) )}
                          </p>

                          {/*item.status == "สำเร็จ" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#D1FAE5] text-[#065F46] inline-block">
                                สำเร็จ
                              </p>
                            </div>
                          )}
                          {item.status == "รอจ่ายเงิน" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#FEE2E2] text-[#991B1B] inline-block">
                                รอจ่ายเงิน
                              </p>
                            </div>
                          )}
                          {item.status == "รอตรวจสภาพ" && (
                            <div className="flex-[1]">
                              <p className="px-[10px] py-[2px] rounded-[10px] bg-[#FEF3C7] text-[#181B31] inline-block">
                                รอตรวจสภาพ
                              </p>
                            </div>
                          )*/}
                          
                          </div>
                          </Link>
                        )


                      })}


                    </div>
                    {/*
                    <div className="p-[24px]">
                      <CustomPagination
                        props={{ total: total, page: page }}
                        onPageChange={handlePageChange}
                      />
                    </div>
                    */}
                  </div>
                </div>
              </div>

              <div>
                <p className="font-athitiSemiBold text-[22px] py-[16px] px-[20px] leading-[30px] text-[#181B31] max-mp:w-full bg-[#FDE68A] rounded-t-[12px]">
                  ลูกทีมของฉัน
                </p>
                <div className="w-full max-mp:w-full bg-[#FFFBEB] pt-[48px] pb-[112px] px-[44px] gap-[30px] max-mp:p-5 flex flex-row max-mp:flex-col max-mp:gap-0">
                  <div className="flex flex-[1] ">
                    <div className="flex-grow flex flex-col gap-[40px] max-mp:w-full h-[554px] max-mp:mb-[7rem]">
                      <div className="flex flex-row w-full justify-end items-center">
                        <hr className="h-1 w-[73px] bg-[#2D5A7A] border-0 rounded" />
                        <div className="pl-[16px] pr-[25px] font-athitiRegular text-[#667085]">
                          คอมมิชชั่น
                        </div>
                        <hr className="h-1 w-[73px] bg-[#3DCEB2] border-0 rounded" />
                        <div className="pl-[16px] font-athitiRegular text-[#667085]">
                          ยอดขาย
                        </div>
                      </div>
                      <div className="bg-white" id="line-chart-team"></div>
                    </div>
                  </div>
                  <div className="flex flex-[1.4] flex-col max-mp:flex-col max-mp:w-full gap-[28px]">
                    <div className="flex flex-row h-[36px] justify-between items-center max-mp:flex-col max-mp:items-start max-mp:mb-2">
                      <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#181B31] max-mp:mb-4">
                        ลูกทีมของฉัน
                      </p>
                      <div className="flex flex-row h-[36px] gap-[12px] font-athitiSemiBold max-mp:w-full max-md:justify-between">
                        
                        <Link href="/agent/mymember">
                        <p className="flex text-nowrap items-center px-[18px] py-[6px] text-[14px] leading-[20px] border border-[#984333] bg-[#FFFFFF] text-[#984333] rounded-[32px] max-mp:mr-0 max-mp:pl-7 max-mp:pr-7 max-md:w-full max-mp:justify-center">
                          ดูลูกทีมทั้งหมด
                        </p>
                        </Link>
                        <div onClick={handleClick}  className="flex flex-row border px-[18px] py-[6px] bg-[#984333] items-center justify-center rounded-[32px] max-mp:pl-7 max-mp:pr-7 max-md:w-full gap-[6px] cursor-pointer">
                          <Image
                            src="/icon-16.svg"
                            width={15}
                            height={15}
                            alt=""
                            priority={true}
                          />
                          <p className="text-[14px] leading-[20px] text-[#FFFFFF]">
                            เพิ่มลูกทีม
                          </p>
                        </div>
                      </div>
                    </div>

                    
                    <div className="flex-grow w-full h-auto max-h-[500px] max-mp:min-w-[100%] bg-white overflow-y-auto overflow-x-auto rounded-[8px] border-2 max-xl:mt-[30px]">
                      
                      <div className="font-athitiMedium text-[18px] bg-[#E7E5E4] flex flex-row items-center h-[46px] px-[24px] sticky top-0 max-md:min-w-[220%]">
                        <p className="leading-[22px] flex-[1.3]">
                          ชื่อ - นามสกุล
                        </p>
                        <p className="leading-[22px] flex-[1] text-right max-w-[250px]">คอมมิชชั่น (บาท)</p>
                        <p className="leading-[22px] flex-[1] text-right max-w-[250px]">ยอดขาย (บาท)</p>
                      </div>
                      { 

                      
                      
                      
                      agent?.team_sales.map((item, index) => {

                       

                        return (

                          <Link href={`/agent/sale/${item._id}`}>
                        
                          <div
                          key={index}
                          className="text-[16px] bg-[#FFFFFF] font-athitiMedium flex flex-row p-5  max-md:min-w-[220%] border-b-2"
                          >
                          <p className="leading-[20px] flex-[1.3]">
                          {` ${agent.teams_all[item._id].name.first} ${agent.teams_all[item._id].name.last }`}
                          </p>
                          
                          <p className="leading-[20px] flex-[1] text-right max-w-[250px] text-[#6B7280]">
                            { formatNumberWithCommas(Number(item.comm).toFixed(2)) }
                          </p>

                          <p className="leading-[20px] flex-[1] text-right max-w-[250px] text-[#6B7280]">
                            { formatNumberWithCommas(Number(item.sale).toFixed(2)) }
                          </p>

                        
                          </div>
                          </Link>
                        )


                      })}
                    </div>

                  </div>
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
              <div className="relative bg-white rounded-lg shadow  h-full w-full">
                <button
                  id="close-button"
                  type="button"
                  onClick={closeModal}
                  className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
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
                      defaultValue="https://dev-sale.9singhabroker.com/agent/register"
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
                      defaultValue={user?.agent.id}
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
        <Script
          src="https://cdn.jsdelivr.net/npm/apexcharts"
          strategy="lazyOnload" // Load the script only after the page is loaded
          onLoad={() => console.log('ApexCharts script loaded!')}
        />
      </div>
    </>
  );
}
