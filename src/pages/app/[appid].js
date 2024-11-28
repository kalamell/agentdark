import NavLink from "@/app/components/navLink";
import CustomSelect from "@/app/components/customSelect";
import { useState, useEffect, useRef, Suspense } from "react";
import InputCheck from "@/app/components/inputCheck";
import FormCard from "@/app/components/templateComponent/form-card";
import TextOnLine from "@/app/components/textComponent/text-on-line";
import Checkbox from "@/app/components/textComponent/checkbox";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonWhite from "@/app/components/button/btn-white";
import TableCard from "@/app/components/templateComponent/table-card";
import Image from "next/image";
import useCarStore from "@/store/carStore";
import useAddressStore from "@/store/addressStore";
import applicationStore from "@/store/applicationStore";
import useStore from "@/store/store";
import Warning from "@/app/components/warning";


import { formatNumberWithCommas }  from '@/lib/utils';

import useCompareStore from '@/store/compareStore';

import axios from "axios";
import { useRouter } from "next/router";

import Head from "next/head";

export default function ComparesCar({ appid }) {
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState("");
  const [isHiddin, setIsHidden] = useState(true);
  const [step, setStep] = useState(1); //my step
  const { car, fetchCarId } = useCarStore();
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const [errors1, setErrors1] = useState({});
  const [errors2, setErrors2] = useState({});
  const [errors3, setErrors3] = useState({});

  const [insuredInformation, setInsuredInformation] = useState(false);
  const [carInformation, setCarInformation] = useState(false);
  const [orderingInformation, setOrderingInformation] = useState(false);

  const [formData, setFormData] = useState(null);
  const [informUser, setInformUser] = useState({});

  const hasFetched = useRef(false);

  const [statusPay, setStatusPay] = useState(false);
  const { clearItems } = useCompareStore();

  const {
    fetchApplication,
    application,
    carid,
    packageid,
    updateApplication,
    checkoutApplication,
  } = applicationStore();

  const { user, token } = useStore();

  const filterclass = {
    1: "1",
    2: "2+",
    3: "2",
    4: "3+",
    5: "3",
    6: "พ.ร.บ",
  };

  const formatDateAndAddYear = (inputDate) => {
    const date = new Date(inputDate);
  
    // Format date as DD/MM/YYYY
    const formattedDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
    // Add one year
    date.setFullYear(date.getFullYear() + 1);
    const nextYearDate = `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${date.getFullYear()}`;
  
    return { formattedDate, nextYearDate };
  };

  useEffect(() => {

    const fetchData = async () => {
      try {
        const carData = await fetchApplication(appid);

        console.log(' data : ', carData);

        if (!carData) {
          //console.log('error : ');
          router.push("/login");
          return;
        }

        if (carData.status == 'Document') {
          router.push(`/app/${appid}/upload`)
        }
        
        

        setFormData(carData);
        setIsLoading(false);

        setProvince(carData.covered.address.province);
        setAmphoe(carData.covered.address.district);

        //fetchAmphoes2(carData.del_address.province);
        //setProvince2(carData.del_address.province);
        //setAmphoe2(carData.del_address.district);x
        //fetchDistricts2();

        setFormData((prevState) => ({
          ...prevState,
          covered: {
            ...prevState.covered,
            car: {
              ...prevState.covered.car,
              no1: prevState.covered.car.no[0], // Set no1 to the first element of "no"
              no2: prevState.covered.car.no[1], // Set no2 to the second element of "no"
            },
          },
        }));

        

        
      } catch (error) {
        //alert(' .. ', error);
        setIsLoading(false);
        //router.push('/login');
      }
    };

    if (appid && !hasFetched.current) {
      fetchData();
      hasFetched.current = true;
    }

    clearItems();
    
  }, [appid]);

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    /*{ nav: brand, link: "#" },
    { nav: model, link: "#" },
    { nav: year, link: "#" },
    { nav: `ประกันภัยรถยนต์ ${car.model?.main} ${car.model?.sub}`, link: "#" }*/
  ];

  const titleOption = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];

  const occupationOption = [
    { value: "0001", label: "เกษตรกร" },
    { value: "0004", label: "เจ้าของกิจการ" },
    { value: "0005", label: "นักลงทุน" },
    { value: "0007", label: "นักเรียน/นิสิต/นักศึกษา" },
    { value: "0011", label: "พนักงาน/ลูกจ้างของรัฐ" },
    { value: "0012", label: "พนักงาน/ผู้บริหารบริษัทเอกชน" },
    { value: "0013", label: "พ่อบ้าน/แม่บ้าน/ไม่ได้ทำงาน" },
    { value: "0100", label: "ผู้บริหารระดับสูง" },
    { value: "0101", label: "ผู้จัดการทั่วไป" },
    { value: "0102", label: "ผู้อำนวยการ" },
    { value: "0103", label: "กรรมการ" },
    { value: "0104", label: "พลตำรวจตรี-เอก" },
    { value: "0200", label: "ผู้บริหารระดับกลาง" },
    { value: "0201", label: "ผู้จัดการ" },
    { value: "0202", label: "หัวหน้าฝ่าย" },
    { value: "0203", label: "ร้อยตำรวจตรี-พันตำรวจเอก" },
    { value: "0210", label: "ผู้ช่วยผู้จัดการ" },
    { value: "0301", label: "ข้าราชการ" },
    { value: "0302", label: "พนักงานรัฐวิสาหกิจ" },
    { value: "0401", label: "ข้าราชการตำรวจ" },
    { value: "0402", label: "ข้าราชการทหาร" },
    { value: "0500", label: "นักการเมือง" },
    { value: "0600", label: "แพทย์" },
    { value: "0700", label: "อาชีพที่เกี่ยวกับการรักษาพยาบาล" },
    { value: "0701", label: "พยาบาล" },
    { value: "0801", label: "วิศวกร" },
    { value: "0802", label: "ช่างเทคนิค" },
    { value: "0803", label: "ช่างเชื่อม" },
    { value: "0804", label: "ช่างกลึง" },
    { value: "0901", label: "สถาปนิก" },
    { value: "0902", label: "นักออกแบบ" },
    { value: "0903", label: "ช่างศิลป์" },
    { value: "0904", label: "ศิลปิน" },
    { value: "1000", label: "อาชีพที่เกี่ยวกับธุรกิจบันเทิง" },
    { value: "1001", label: "นักแสดง" },
    { value: "1002", label: "นักร้อง" },
    { value: "1100", label: "พนักงานที่ต้องติดต่อลูกค้านอกสถานที่" },
    { value: "1101", label: "พนักงานขาย" },
    { value: "1102", label: "พนักงานตลาด" },
    { value: "1103", label: "พนักงานประจำโรงงาน" },
    { value: "1104", label: "พนักงานขับรถ" },
    { value: "1402", label: "ผู้รับเหมา" },
    { value: "1403", label: "ที่ปรึกษา" },
    { value: "1700", label: "แม่บ้าน" },
    { value: "1801", label: "นักข่าว" },
    { value: "1802", label: "ช่างภาพทำข่าว" },
    { value: "1901", label: "ครู/อาจารย์" },
    { value: "1903", label: "นักวิชาการ" },
    { value: "2001", label: "พนักงานบัญชี" },
    { value: "2002", label: "พนักงานการเงิน" },
    { value: "2003", label: "พนักงานบริษัท" },
    { value: "2100", label: "เจ้าหน้าที่ที่ทำงานอยู่ในสำนักงาน" },
    { value: "2101", label: "เจ้าหน้าที่ธุรการ" },
    { value: "2102", label: "เลขานุการ" },
    { value: "2103", label: "เสมียน" },
    { value: "2202", label: "นักธุรกิจ" },
    { value: "2203", label: "รักษาความสะอาด" },
    { value: "2206", label: "ตัวแทน" },
    { value: "2207", label: "ค้าขาย" },
    { value: "2210", label: "ข้าราชการบำนาญ" },
    { value: "2212", label: "นักกฏหมาย" },
    { value: "2213", label: "ธุรกิจนำเที่ยว" },
    { value: "1104", label: "พนักงานขับรถ" },
  ];

  const isValidThaiID = (id) => {
    if (!/^\d{13}$/.test(id)) {
      return false;
    }

    // Calculate the checksum
    let sum = 0;
    for (let i = 0; i < 12; i++) {
      sum += parseInt(id.charAt(i)) * (13 - i);
    }

    const remainder = sum % 11;
    const checkDigit = (11 - remainder) % 10;

    // Return true if the check digit matches the 13th digit
    return checkDigit === parseInt(id.charAt(12));
  };

  const gasOption = [
    { value: "ไม่ติดตั้งแก๊ส", label: "ไม่ติดตั้งแก๊ส" },
    { value: "ติดตั้ง NGV", label: "ติดตั้ง NGV" },
    { value: "ติดตั้ง LPG", label: "ติดตั้ง LPG" },
  ];

  const genderOption = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" },
    { value: "ไม่ระบุ", label: "ไม่ระบุ" },
  ];

  const router = useRouter();

  const {
    provinces,
    amphoes,
    districts,
    province,
    amphoe,
    district,
    zipcode,
    setProvince,
    setAmphoe,
    setDistrict,
    fetchProvices,
    fetchAmphoes,
    fetchDistricts,
    fetchZipcode,
    address_id,

    provinces2,
    amphoes2,
    districts2,
    province2,
    amphoe2,
    district2,
    zipcode2,
    setProvince2,
    setAmphoe2,
    setDistrict2,
    fetchProvices2,
    fetchAmphoes2,
    fetchDistricts2,
    fetchZipcode2,
    address_id2,
  } = useAddressStore();

  const [labelProvince, setLabelProvince] = useState("");
  const [labelAmphoe, setLabelAmphoe] = useState("");
  const [labelDistrict, setLabelDistrict] = useState("");
  const [labelZipcode, setLabelZipcode] = useState("");

  const [labelProvince2, setLabelProvince2] = useState("");
  const [labelAmphoe2, setLabelAmphoe2] = useState("");
  const [labelDistrict2, setLabelDistrict2] = useState("");
  const [labelZipcode2, setLabelZipcode2] = useState("");

  const titleRef = useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const birthdateRef = useRef(null);
  const idcardRef = useRef(null);
  const occupationRef = useRef(null);

  const mobileRef = useRef(null);
  const emailRef = useRef(null);
  const genderRef = useRef(null);
  const addressRef = useRef(null);
  const provinceRef = useRef(null);
  const districtRef = useRef(null);
  const subdistrictRef = useRef(null);
  const agentCardRef = useRef(null);
  const agentExpireRef = useRef(null);
  const titlePersonRef = useRef(null);
  const firstPersonRef = useRef(null);
  const lastPersonRef = useRef(null);
  const idcardPersonRef = useRef(null);
  const mobilePersonRef = useRef(null);
  const acceptRef = useRef(null);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (formData) {
      console.log('check form data');
      
      fetchAmphoes(formData.covered.address.province);
      fetchDistricts();


      if (formData.status == "CheckOut" || formData.status == "Pending") {
        setStep(4);
        setStatusPay(true);
      }

      if (formData.status == "Active") {
        router.push("/myInsurances");
      }

      //console.log("FORM DATA DEL ", formData.del_address);
    }
  }, [formData]);

  useEffect(() => {
    

    if (formData && formData.del_address) {
      if (formData.covered.send_post_same == '') {
        
        setResetAddr1(true);
        setResetAddr2(true);
        setResetAddr3(true);
        setResetAddr4(true);

        setTimeout(() => setResetAddr1(false), 0);
        setTimeout(() => setResetAddr2(false), 0);
        setTimeout(() => setResetAddr3(false), 0);
        setTimeout(() => setResetAddr4(false), 0);

        console.log(' send empty ');
        console.log(formData.del_address);

      } else {

        console.log('ccc');

        setProvince2(formData.del_address.province);
        setLabelProvince2(formData.del_address.province);
        fetchAmphoes2(formData.del_address.province);

        setAmphoe2(formData.del_address.district);
        fetchDistricts2();

        setDistrict2(formData.del_address.subdistrict);


        setResetAddr1(true);
        setResetAddr2(true);
        setResetAddr3(true);
        setResetAddr4(true);
        setLabelZipcode("");

        setTimeout(() => setResetAddr1(false), 0);
        setTimeout(() => setResetAddr2(false), 0);
        setTimeout(() => setResetAddr3(false), 0);
        setTimeout(() => setResetAddr4(false), 0);

        
      }

    }

  }, [formData?.del_address]);

  useEffect(() => {
    fetchProvices();
    fetchProvices2();
  }, [fetchProvices, fetchProvices2]);



  useEffect(() => {
    if (formData && formData.covered) {

      const province_text = provinces.find((pr) => pr.value == formData.covered.address.province);
      const district_text = amphoes.find((am) => am.value == formData.covered.address.district);
      const subdistrict_text = districts.find((ds) => ds.value == formData.covered.address.subdistrict);

      setInformUser({
        ...informUser,
        subdistrict: subdistrict_text?.label,
        district: district_text?.label,
        province: province_text?.label
      });
    } 
    

  }, [districts, amphoes, provinces]);

  const [errors, setErrors] = useState({});
  const [resetAddr1, setResetAddr1] = useState(false);
  const [resetAddr2, setResetAddr2] = useState(false);
  const [resetAddr3, setResetAddr3] = useState(false);
  const [resetAddr4, setResetAddr4] = useState(false);

  const DamageToCars = [
    {
      protection: "ความเสียหายต่อชีวิต ร่างกาย ต่อ คน",
      insuranceFund: "500,000 บาท (ต่อครั้ง)",
      sub: [],
    },
    {
      protection: "ความเสียหายต่อชีวิต ร่างกาย ต่อ ครั้ง",
      insuranceFund: "10,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
    {
      protection: "ความเสียหายต่อทรัพย์สิน ต่อ ครั้ง",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [],
    },
  ];

  const ThirdPartyLiability = [
    {
      protection: "ความเสียหายต่อรถยนต์",
      insuranceFund: "1,000,000 บาท (ต่อครั้ง)",
      sub: [
        {
          protection: "ความเสียหายส่วนแรก",
          insuranceFund: "ไม่มี",
        },
      ],
    },
    {
      protection: "ความรับผิดชอบรถยนต์สูญหาย/ไฟไหม้",
      insuranceFund: "100,000 บาท (ต่อครั้ง)",
      sub: [],
    },
  ];

  const ProtectedAccordingDocuments = [
    {
      protection: "อุบัติเหตุส่วนบุคคล",
      insuranceFund: "",
      sub: [
        {
          protection:
            "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
        {
          protection:
            "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้โดยสาร 6 คน)",
          insuranceFund: "100,000 บาท (ต่อคน)",
        },
      ],
    },
    {
      protection: "ค่ารักษาพยาบาล",
      insuranceFund: "",
      sub: [
        {
          protection:
            "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้ขับขี่ 1 คน)",
          insuranceFund: "100,000 บาท (ต่อครั้ง)",
        },
        {
          protection:
            "เสียชีวิต สูญเสียอวัยวะ ทุพพลภาพถาวร (จำนวนผู้โดยสาร 1 คน)",
          insuranceFund: "100,000 บาท (ต่อครั้ง)",
        },
      ],
    },
    {
      protection: "การประกันตัวผู้ขับขี่",
      insuranceFund: "200,000 บาท (ต่อครั้ง)",
      sub: [],
    },
  ];


  const handleSelectProvince = (label, value, text) => {
    setProvince(value);
    setLabelProvince(value);
    fetchAmphoes(value);

   
    setResetAddr2(true);
    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      console.log('text : ', text);

      if (subfield) {
        newData[section][field][subfield] = value;
        newData[section][field]["district"] = "";
        newData[section][field]["subdistrict"] = "";
        newData[section][field]["zipcode"] = "";
        newData[section][field]["thaipost_id"] = "";
      } else {
        newData[section][field] = value;
      }

      //validateFormStep1();

      return newData;
    });
  };

  const handleSelectAmphoe = (label, value) => {
    setAmphoe(value);
    setLabelProvince(value);
    fetchDistricts();

    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }

      //validateFormStep1();
      console.log(errors1);

      return newData;
    });
  };

  const handleSelectDistrict = async (label, value) => {
    setDistrict(value);
    setLabelProvince(value);
    const response = await fetchZipcode();
    setLabelZipcode(response.zipcode);

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
        newData[section][field]["zipcode"] = response.zipcode;
        newData[section][field]["thaipost_id"] = response.address_id;
      } else {
        newData[section][field] = value;
      }

      return newData;
    });
  };

  const handleZipcode = (value) => {
    console.log("zipcdoe : ", value);
  };

  // fetch province 2
  const handleSelectProvince2 = (label, value) => {
    setProvince2(value);
    setLabelProvince2(value);
    fetchAmphoes2(value);

    setResetAddr2(true);
    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      console.log(label);

      if (subfield) {
        newData[section][field][subfield] = value;
        newData[section][field]["district"] = "";
        newData[section][field]["subdistrict"] = "";
        newData[section][field]["zipcode"] = "";
        newData[section][field]["thaipost_id"] = "";
      } else {
        newData[section][field] = value;
        newData[section]["district"] = "";
        newData[section]["subdistrict"] = "";
        newData[section]["zipcode"] = "";
        newData[section]["thaipost_id"] = "";
      }

      return newData;
    });
  };

  const handleSelectAmphoe2 = (label, value) => {
    setAmphoe2(value);
    setLabelProvince2(value);
    fetchDistricts2();

    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);

    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }

      //validateFormStep3();
      console.log(errors1);

      return newData;
    });
  };

  const handleSelectDistrict2 = async (label, value) => {
    
    setDistrict2(value);
    
    const response = await fetchZipcode2();
    /*
    setLabelZipcode2(response.zipcode);
    */



    const [section, field, subfield] = label.split(".");


    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
        newData[section][field]["zipcode"] = response.zipcode;
        newData[section][field]["thaipost_id"] = response.address_id;
      } else {
        newData[section]["zipcode"] = response.zipcode;
        newData[section]["thaipost_id"] = response.address_id;
        newData[section][field] = value;
      }

      return newData;
    });
    
    console.log('change del address : ', formData.del_address);
  };

  const handleZipcode2 = (value) => {
    console.log("zipcdoe : ", value);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleOptionChange = (label, value) => {
    const [section, field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      if (subfield) {
        newData[section][field][subfield] = value;
      } else if (field) {
        newData[section][field] = value;
      } else {
        newData[section] = value;
      }

      if (step == 1) {
        //validateFormStep1();
      }

      if (step == 2) {
        //validateFormStep2();
      }

      if (step == 3) {
        //validateFormStep3();
      }

      return newData;
    });
  };

  const handleChange = (label, value) => {
    const [section, field, subfield] = label.split(".");
    setFormData((prevData) => {
      const newData = { ...prevData };
      if (subfield) {
        newData[section][field][subfield] = value;
      } else {
        newData[section][field] = value;
      }
      return newData;
    });
  };

  const confirmPay = async () => {
    try {
      const checkoutReponse = await checkoutApplication(appid);

      console.log('confirm pay : ', checkoutReponse);
      if (checkoutReponse.success) {
        router.push(`/app/${appid}/pay`);
        window.open(
          checkoutReponse.data.data.payment.invoice.invoice_url,
          "_blank",
          "noopener,noreferrer"
        );

        setStatusPay(true);

      }
    } catch (e) {
      console.error(e);
    }

    //setIsLoading(false);
  };

  const scrollToWithOffset = (ref) => {
    const elementPosition =
      ref.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80; // Offset by 50px

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  const scrollToFirstError = (newErrors) => {
    if (newErrors.length > 0) {
      scrollToWithOffset(newErrors[0]);
    }
  };

  const validateFormStep1 = () => {
    const newErrors = {};
    const errorFields = [];

    if (!formData.covered.name.title) {
      newErrors["name.title"] = "Title is required";
      errorFields.push(titleRef);
    }
    if (!formData.covered.name.first) {
      newErrors["name.first"] = "First name is required";
      errorFields.push(firstRef);
    }

    if (!formData.covered.name.last) {
      newErrors["name.last"] = "Last name is required";
      errorFields.push(lastRef);
    }

    if (!formData.covered.birthdate) {
      newErrors["birthdate"] = "Birtdate";
      errorFields.push(birthdateRef);
    }

    if (!formData.covered.id_nbr) {
      newErrors["covered.id_nbr"] = "ID  is required";
      errorFields.push(idcardRef);
    } else {
      if (formData.covered.id_nbr.length < 13) {
        newErrors["covered.id_nbr"] = "ID less than 13";
        errorFields.push(idcardRef);
      } else {
        if (!isValidThaiID(formData.covered.id_nbr)) {
          newErrors["covered.id_nbr"] = "Not valid idcard";
          errorFields.push(idcardRef);
        }
      }
    }

    if (!formData.covered.mobile) {
      newErrors["name.mobile"] = "mobile is required";
      errorFields.push(mobileRef);
    } else {
      if (formData.covered.mobile.length < 10) {
        newErrors["name.mobile"] = "mobile is required";
        errorFields.push(mobileRef);
      }
    }

    if (!formData.covered.occupation) {
      newErrors["occupation"] = "occupation is required";
      errorFields.push(occupationRef);
    }

    if (!formData.covered.email) {
      //newErrors["name.email"] = "Email is required";
    } else {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(formData.covered.email)) {
        newErrors["covered.email"] = "Invalid email format";
        errorFields.push(emailRef);
      }
    }

    if (!formData.covered.address.no) {
      newErrors["address.no"] = "Birtdate";
      errorFields.push(addressRef);
    }
    if (!formData.covered.address.province) {
      newErrors["address.province"] = "Province";
      errorFields.push(provinceRef);
    }
    if (!formData.covered.address.district) {
      newErrors["address.district"] = "District";
      errorFields.push(districtRef);
    }
    if (!formData.covered.address.subdistrict) {
      newErrors["address.subdistrict"] = "Subdistrict";
      errorFields.push(subdistrictRef);
    }

    console.log(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setErrors1(newErrors);
      scrollToFirstError(errorFields);
    }
    return Object.keys(newErrors).length === 0;
  };

  const validateFormStep2 = () => {
    const newErrors = {};
    if (!formData.covered.car.no1) newErrors["car.no1"] = "No1 required";
    if (!formData.covered.car.no2) newErrors["car.no2"] = "No2 required";
    if (!formData.covered.car.province_code)
      newErrors["car.province_code"] = "Car Province Code required";
    if (!formData.covered.car.body_no)
      newErrors["car.body_no"] = "Car Body  required";
    if (!formData.covered.car.engin) newErrors["car.engin"] = "ENgine required";

    setErrors2(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const validateFormStep3 = () => {
    const newErrors = {};
    const errorFields = [];
    if (!formData.start) newErrors["start"] = "Title is required";
    //if (!formData.covered.driver.first) newErrors["driver.first"] = "First name is required";
    //if (!formData.covered.driver.last) newErrors["driver.last"] = "Last name is required";

    //if (!formData.covered.protect_1year_start) newErrors["protect_1year_start"] = "Birtdate";
    //if (!formData.covered.prb_1year_start) newErrors["prb_1year_start"] = "Birtdate";

    console.log(
      "validtate form 3 ",
      formData.is_del,
      " - ",
      formData.covered.send_post_same
    );

    if (formData.is_del && formData.covered.send_post_same !== "Y") {
      if (!formData.del_address.no) {
        newErrors["del_address.no"] = "Address No";
        errorFields.push(addressRef);
      }
      if (!formData.del_address.province) {
        newErrors["del_address.province"] = "Province";
        errorFields.push(provinceRef);
      }
      if (!formData.del_address.district) {
        newErrors["del_address.district"] = "District";
        errorFields.push(districtRef);
      }
      if (!formData.del_address.subdistrict) {
        newErrors["del_address.subdistrict"] = "Subdistrict";
        errorFields.push(subdistrictRef);
      }
    } else {
      delete newErrors["del_address.no"];
      delete newErrors["del_address.province"];
      delete newErrors["del_address.district"];
      delete newErrors["del_address.subdistrict"];
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors3(newErrors);
      scrollToFirstError(errorFields);
    }

    return Object.keys(newErrors).length === 0;
  };

  const calculatePrice = () => {
    /*
    app.price - app.discount + 50(ถ้ามี)
    */
    const basePrice = formData.price;
    const discount = formData.discount;
    //const tax = basePrice * 0.07;

    const additionalFee = formData.is_del == true ? 50 : 0;
    const finalPrice = basePrice - discount + additionalFee;

    return finalPrice.toLocaleString(); // Convert to a localized string
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <Head>
        <title>
          ประกันภัยรถยนต์ {car.model?.main} {car.model?.sub}
        </title>
      </Head>

      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      <NavLink navLink={navLink} />
      {!isLoading ? (
        <>
          <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9 px-1 max-md:px-4 md:px-9">
            <div className="container mx-auto">
              <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-lg:leading-[38px] max-lg:text-[28px]">
                กรอกข้อมูล
                <br className="md:hidden" />
                เพื่อซื้อประกันรถยนต์
              </p>
              <div className="flex w-fit mx-auto justify-center gap-[120px] max-xl:gap-[60px] max-md:gap-[48px]  relative mt-[20px] mb-[36px] text-center">
                <div className="flex flex-col items-center gap-[12px]">
                  {step === 1 ? (
                    <Image
                      src="/circle-check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : (
                    <Image
                      src="/check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  )}
                  <p className="font-athitiSemiBold text-[22px] leading-[30px] text-[#984333] z-10 max-md:text-[18px]">
                    ข้อมูลผู้เอาประกัน
                  </p>
                </div>
                <hr
                  className={`h-px ${
                    step >= 2 ? "border-[#984333]" : "border-[#808291]"
                  }  border-[1px] absolute w-[220px] max-md:w-[155px] max-md:left-[45px] top-[15px] left-[90px]`}
                />
                <div className="flex flex-col items-center gap-[12px]">
                  {step === 1 ? (
                    <Image
                      src="/circle.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : step === 2 ? (
                    <Image
                      src="/circle-check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : step > 2 ? (
                    <Image
                      src="/check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : null}
                  <p
                    className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] ${
                      step >= 2 ? "text-[#984333]" : "text-[#808291]"
                    }`}
                  >
                    ข้อมูลรถยนต์
                  </p>
                </div>
                <hr
                  className={`h-px ${
                    step >= 3 ? "border-[#984333]" : "border-[#808291]"
                  } border-[1px] absolute w-[220px] max-md:w-[150px] top-[15px] right-[75px] max-md:right-[40px] `}
                />
                <div className="flex flex-col items-center gap-[12px]">
                  {step < 3 ? (
                    <Image
                      src="/circle.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : step === 3 ? (
                    <Image
                      src="/circle-check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : step === 4 ? (
                    <Image
                      src="/check.svg"
                      width={32}
                      height={32}
                      alt="promptpay"
                      priority={true}
                      className="z-20"
                    />
                  ) : null}
                  <p
                    className={`font-athitiSemiBold text-[22px] leading-[30px] max-md:text-[18px] ${
                      step == 4 ? "text-[#984333]" : "text-[#808291]"
                    }`}
                  >
                    ข้อมูลการสั่งซื้อ
                  </p>
                </div>
              </div>

              <div className="bg-[#ffffff] px-[24px] max-md:px-4 py-[24px] rounded-[12px] flex flex-col gap-y-[24px]">
                {step >= 2 ? (
                  <div>
                    <div
                      onClick={() => {
                        setInsuredInformation(!insuredInformation);
                      }}
                      className={`cursor-pointer flex bg-[#FDE68A] p-[16px] items-center justify-between ${
                        insuredInformation
                          ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                          : "rounded-2xl"
                      }`}
                    >
                      <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="30" height="30" rx="15" fill="#181B31" />
                          <path
                            d="M8 16L12 20L22 10"
                            stroke="#FDE68A"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
    
                        <p>ข้อมูลผู้เอาประกัน</p>
                      </div>
    
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${
                          insuredInformation ? "rotate-0" : "rotate-180"
                        }`}
                      >
                        <path
                          d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                          stroke="#111928"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {insuredInformation ? (
                      <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)]  rounded-b-2xl">
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                        { formData.covered?.name.title } { formData.covered?.name.first } { formData.covered?.name.last }
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          วันเกิด : { formData.covered.birthdate }
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          เลขบัตรประชาชน : { formData.covered.id_nbr}
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          โทรศัพท์มือถือ : { formData.covered.mobile }
                        </p>
                        {
                          formData.covered.email && (
                            <p className="font-athitiMedium text-[18px] leading-[22px] ">
                              อีเมล : { formData.covered.email }
                            </p>
                          )
                        }
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                        { formData.covered.address.no } {formData.covered.address.moo ? `หมู่ ${formData.covered.address.moo}` : ''} {formData.covered.address.village ? `หมู่บ้าน${formData.covered.address.village}` : ''} {formData.covered.address.project ? `โครงการ${formData.covered.address.project}` : ''} {formData.covered.address.floor ? `ชั้น${formData.covered.address.floor}` : ''} {formData.covered.address.room ? `ห้อง${formData.covered.address.room}` : ''} {formData.covered.address.soi ? `ซอย${formData.covered.address.soi}` : ''}  {formData.covered.address.road ? `ถนน${formData.covered.address.road}` : ''} {informUser.subdistrict ? `${informUser.subdistrict}` : ''} {informUser.district ? `${informUser.district}` : ''} {informUser.province ? `${informUser.province}` : ''} {formData.covered.address.zipcode ? `${formData.covered.address.zipcode}` : ''}
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {step >= 3 ? (
                  <div>
                    <div
                      onClick={() => {
                        setCarInformation(!carInformation);
                      }}
                      className={`cursor-pointer flex bg-[#FED7AA] p-[16px] items-center justify-between ${
                        carInformation
                          ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                          : "rounded-2xl"
                      }`}
                    >
                      <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="30" height="30" rx="15" fill="#181B31" />
                          <path
                            d="M8 16L12 20L22 10"
                            stroke="#FED7AA"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p>ข้อมูลรถยนต์</p>
                      </div>
    
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${carInformation ? "rotate-0" : "rotate-180"}`}
                      >
                        <path
                          d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                          stroke="#111928"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {carInformation ? (
                      <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-b-2xl">
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                       
                        {formData.covered.car.no ? `หมายเลขทะเบียน : ${formData.covered.car.no[0]} ${formData.covered.car.no[1]}` : ''} 
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          เลขตัวรถ (ตัวถัง) : { formData.covered.car.body_no}
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          ติดตั้งแก็ส : ไม่ติดตั้ง
                        </p>
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {step >= 4 ? (
                  <div>
                    <div
                      onClick={() => {
                        setOrderingInformation(!orderingInformation);
                      }}
                      className={`cursor-pointer flex bg-[#F1F5D8] p-[16px] items-center justify-between ${
                        orderingInformation
                          ? "drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-tl-2xl rounded-tr-2xl"
                          : "rounded-2xl"
                      }`}
                    >
                      <div className="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                        <svg
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect width="30" height="30" rx="15" fill="#181B31" />
                          <path
                            d="M8 16L12 20L22 10"
                            stroke="#F1F5D8"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <p>ข้อมูลการสั่งซื้อ</p>
                      </div>
    
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className={`${step >= 4 ? "rotate-180" : "rotate-0"}`}
                      >
                        <path
                          d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                          stroke="#111928"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    {orderingInformation ? (
                      <div className="bg-[#ffffff] flex flex-col gap-[12px] p-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.1)] rounded-b-2xl">
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                         

                          วันเริ่มต้นความคุ้มครอง : { formatDateAndAddYear(formData.start).formattedDate } (1 ปี)
                        </p>
                        <p className="font-athitiMedium text-[18px] leading-[22px] ">
                          วันหมดความคุ้มครอง : { formatDateAndAddYear(formData.start).nextYearDate } (1 ปี)
                        </p>
                        {
                          formData.is_del == true && (
                          <p className="font-athitiMedium text-[18px] leading-[22px] ">
                            จัดส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์
                          </p>
                          )}
                      </div>
                    ) : null}
                  </div>
                ) : null}
                {step === 1 ? (
                  <FormCard
                    title="ข้อมูลผู้เอาประกัน"
                    text="center"
                    bgTitle="#FDE68A"
                    bgContent="#FFFBEB"
                    paddingMbX="0"
                  >
                    <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                      <TextOnLine text="ข้อมูลผู้เอาประกัน" />
                      <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                        <CustomSelect
                          Ref={titleRef}
                          title="คำนำหน้าชื่อ"
                          placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                          options={titleOption}
                          onChange={(value) => {
                            handleOptionChange(
                              "covered.name.title",
                              value.value
                            );
                          }}
                          value_data={formData.covered?.name.title}
                          defaultLabel=""
                          valid={!errors1["name.title"]}
                        />

                        <InputCheck
                          Ref={firstRef}
                          title="ชื่อ"
                          placeholderBottom="โปรดกรอกชื่อ"
                          valid={!errors1["name.first"]}
                          value={formData.covered?.name.first}
                          onChange={(value) => {
                            handleChange("covered.name.first", value);
                          }}
                        />

                        <InputCheck
                          Ref={lastRef}
                          title="นามสกุล"
                          placeholderBottom="โปรดกรอกนามสกุล"
                          valid={!errors1["name.last"]}
                          value={formData.covered?.name.last}
                          onChange={(value) => {
                            handleChange("covered.name.last", value);
                          }}
                        />

                        <InputCheck
                          Ref={birthdateRef}
                          title="วัน/เดือน/ปี เกิด"
                          placeholderBottom="โปรดกรอกวัน/เดือน/ปี เกิด"
                          type="date"
                          valid={!errors1["birthdate"]}
                          onChange={(value) => {
                            handleChange("covered.birthdate", value);
                          }}
                          value={formData.covered?.birthdate}
                        />

                        <InputCheck
                          Ref={idcardRef}
                          title="เลขบัตรประชาชน 13 หลัก"
                          placeholderBottom="ตัวอย่าง 0123456789123"
                          maxlength={13}
                          onChange={(value) => {
                            handleOptionChange("covered.id_nbr", value);
                            /*let error = {};
                          if (!isValidThaiID(value) && value != '') {
                            error['covered.id_nbr'] = 'ID Not Valid';
                          } 
                          setErrors1(error);
                          */
                          }}
                          value={formData.covered?.id_nbr}
                          valid={!errors1["covered.id_nbr"]}
                          errorShowLabel="กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง"
                          onKeyPress
                          type="text"
                        />

                        <InputCheck
                          Ref={mobileRef}
                          title="หมายเลขติดต่อ"
                          placeholderBottom="*ตัวอย่าง 0987654321"
                          valid={!errors1["name.mobile"]}
                          maxlength="10"
                          onChange={(value) => {
                            handleOptionChange("covered.mobile", value);
                          }}
                          value={formData.covered?.mobile}
                          onKeyPress
                        />

                        <InputCheck
                          Ref={emailRef}
                          title="อีเมล"
                          required={false}
                          placeholderBottom="ตัวอย่าง example@gmail.com"
                          onChange={(value) => {
                            handleOptionChange("covered.email", value);
                            /*let error = {};
                
                          if (!validateEmail(value) && value != '') {
                            error['covered.email'] = false;
                          } 
                          setErrors1(error);
                          */
                          }}
                          value={formData.covered?.email}
                          valid={!errors1["covered.email"]}
                          errorShowLabel="กรุณากรอกอีเมลให้ถูกต้อง"
                          onKeyPress
                          type="email"
                        />

                        <CustomSelect
                          Ref={occupationRef}
                          title="อาชีพ"
                          placeholderBottom="โปรดกรอกอาชีพ"
                          options={occupationOption}
                          onChange={(value) => {
                            handleOptionChange(
                              "covered.occupation",
                              value.value
                            );
                          }}
                          value_data={formData.covered?.occupation}
                          defaultLabel=""
                          valid={!errors1["occupation"]}
                        />
                      </div>
                    </div>

                    <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                      <TextOnLine text="ที่อยู่หน้ากรมธรรม์" />

                      <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                        <InputCheck
                          Ref={addressRef}
                          title="บ้านเลขที่"
                          onChange={(value) => {
                            handleOptionChange("covered.address.no", value);
                          }}
                          value={formData.covered?.address.no}
                          valid={!errors1["address.no"]}
                          type="text"
                        />

                        <InputCheck
                          title="หมู่"
                          onChange={(value) => {
                            handleOptionChange("covered.address.moo", value);
                          }}
                          value={formData.covered?.address.moo}
                          type="text"
                          required={false}
                        />

                        <InputCheck
                          title="หมู่บ้าน"
                          onChange={(value) => {
                            handleOptionChange(
                              "covered.address.village",
                              value
                            );
                          }}
                          value={formData.covered?.address.village}
                          valid=""
                          required={false}
                        />

                        <InputCheck
                          title="โครงการ"
                          required={false}
                          valid=""
                          onChange={(value) => {
                            handleOptionChange(
                              "covered.address.project",
                              value
                            );
                          }}
                          value={formData.covered?.address.project}
                        />

                        <InputCheck
                          title="ชั้น"
                          required={false}
                          valid=""
                          onChange={(value) => {
                            handleOptionChange("covered.address.floor", value);
                          }}
                          value={formData.covered?.address.floor}
                        />

                        <InputCheck
                          title="ห้อง"
                          required={false}
                          valid=""
                          onChange={(value) => {
                            handleOptionChange("covered.address.room", value);
                          }}
                          value={formData.covered?.address.room}
                        />

                        <InputCheck
                          title="ซอย"
                          required={false}
                          valid=""
                          onChange={(value) => {
                            handleOptionChange("covered.address.soi", value);
                          }}
                          value={formData.covered?.address.soi}
                        />

                        <InputCheck
                          title="ถนน"
                          required={false}
                          valid=""
                          onChange={(value) => {
                            handleOptionChange("covered.address.road", value);
                          }}
                          value={formData.covered?.address.road}
                        />

                        <div className="md:col-start-1 md:col-end-3">
                          <CustomSelect
                            Ref={provinceRef}
                            title="จังหวัด"
                            placeholderBottom="โปรดเลือกจังหวัด"
                            options={provinces}
                            onChange={(value) => {
                              handleSelectProvince(
                                "covered.address.province",
                                value.value,
                                value.label
                              );
                            }}
                            defaultLabel=""
                            valid={!errors1["address.province"]}
                            value_data={formData.covered.address.province}
                            reset={resetAddr1}
                          />
                        </div>

                        <CustomSelect
                          Ref={districtRef}
                          title="อำเภอ / เขต"
                          placeholderBottom="โปรดเลือกอำเภอ / เขต"
                          options={amphoes}
                          value_data={formData.covered.address.district}
                          onChange={(value) => {
                            handleSelectAmphoe(
                              "covered.address.district",
                              value.value
                            );
                          }}
                          defaultLabel=""
                          reset={resetAddr2}
                          valid={!errors1["address.district"]}
                        />

                        <CustomSelect
                          Ref={subdistrictRef}
                          title="ตำบล / แขวง"
                          placeholderBottom="โปรดเลือกตำบล / แขวง"
                          options={districts}
                          valid={!errors1["address.subdistrict"]}
                          value_data={formData.covered.address.subdistrict}
                          onChange={(value) => {
                            handleSelectDistrict(
                              "covered.address.subdistrict",
                              value.value
                            );
                          }}
                          defaultLabel=""
                          reset={resetAddr3}
                        />

                        <div className="md:col-start-1 md:col-end-3">
                          <InputCheck
                            title="รหัสไปรษณีย์"
                            placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                            initialValue={zipcode}
                            valid={!errors1["address.zipcode"]}
                            value={formData.covered.address.zipcode}
                            onChange={handleZipcode}
                          />
                        </div>
                      </div>
                    </div>

                    {/*
                  <div className="bg-[#FFFFFF] md:rounded-[12px] max-md:bg-[#FFFBEB] p-[16px] flex flex-col gap-[20px]">
                    <TextOnLine text="ที่อยู่ในการจัดส่งเอกสาร" />
                    <Checkbox 
                      value={formData.covered?.send_doc}
                      onChange={() => {
                        if (formData.covered.send_doc == '' || formData.covered.send_doc == undefined) {
                          handleOptionChange('covered.send_doc', 'Y');
                        } else {
                          handleOptionChange('covered.send_doc', '');
                        }
                      }}
                      text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                  </div>

                  <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                    <TextOnLine text="ที่อยู่ในการออกใบกำกับภาษี" />
                    <Checkbox 
                    value={formData.covered?.send_vat}
                    onChange={() => {
                      if (formData.covered.send_vat == '' || formData.covered.send_vat == undefined) {
                        handleOptionChange('covered.send_vat', 'Y');
                      } else {
                        handleOptionChange('covered.send_vat', '');
                      }
                    }}
                    text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์" />
                  </div>
                  */}

                    <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                      <ButtonBrown
                        onClick={async () => {
                          if (!validateFormStep1()) {
                            setIsOpenWarning(true);
                            setTextWarning("กรุณากรอกข้อมูลให้เรียบร้อย");
                            return;
                          } else {
                            //setIsLoading(true);

                            setIsSending(true);

                            const updateRespons = await updateApplication(
                              formData,
                              appid
                            )
                              .then((response) => {
                                setIsSending(false);
                                setStep(2);
                              })
                              .catch((error) => {
                                console.log("ERROR : ", error);
                                setIsSending(false);
                                setTextWarning(error.message);
                                setIsOpenWarning(true);
                              });

                            //setStep(2);
                          }
                          /*
                        if (formData.covered.name.title === '' &&formData.covered.name.first === '' && formData.covered.name.last === '') {
                          setIsOpenWarning(true);
                          setTextWarning('กรุณากรอกข้อมูลให้เรียบร้อย')
                        } else {
                          setStep(2);

                        }
                          */
                        }}
                        text={isSending ? "กำลังบันทึก" : "ถัดไป"}
                      />
                    </div>
                  </FormCard>
                ) : step === 2 ? (
                  <FormCard
                    title="ข้อมูลรถยนต์"
                    text="center"
                    bgTitle="#FED7AA"
                    bgContent="#FFF7ED"
                    paddingMbX="20"
                  >
                    <div className="grid grid-cols-2 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                      <div className="grid gap-x-1 max-md:grid-cols-1 max-md:gap-y-[20px] grid-cols-[50%_50%]">
                        <InputCheck
                          title="เลขทะเบียน(หมวดอักษร)"
                          placeholderBottom="*ตัวอย่าง กข หรือ 1กข"
                          maxlength="3"
                          onChange={(value) => {
                            handleOptionChange("covered.car.no1", value);
                          }}
                          value={formData.covered.car.no1}
                          valid={!errors2["car.no1"]}
                          onKeyPress
                        />

                        <InputCheck
                          maxlength="5"
                          title="เลขทะเบียน(ตัวเลข)"
                          placeholderBottom="*ตัวอย่าง 1234"
                          onChange={(value) => {
                            handleOptionChange("covered.car.no2", value);
                          }}
                          onKeyPress
                          value={formData.covered.car.no2}
                          valid={!errors2["car.no2"]}
                        />
                      </div>

                      <CustomSelect
                        title="จังหวัด"
                        placeholderBottom="โปรดเลือกจังหวัด"
                        options={provinces}
                        onChange={(value) => {
                          handleSelectProvince2(
                            "covered.car.province_code",
                            value.value
                          );
                        }}
                        defaultLabel=""
                        valid={!errors2["car.province_code"]}
                        value_data={formData.covered.car.province_code}
                        reset={resetAddr1}
                      />

                      <InputCheck
                        title="เลขตัวรถ (ตัวถัง)"
                        placeholderBottom="*ตัวอย่าง JHBAXXMAMT1200004"
                        maxlength={20}
                        onChange={(value) => {
                          handleOptionChange("covered.car.body_no", value);
                        }}
                        value={formData.covered.car.body_no}
                        valid={!errors2["car.body_no"]}
                      />

                      <CustomSelect
                        title="ติดตั้งแก็ส"
                        required
                        options={gasOption}
                        onChange={(value) => {
                          handleOptionChange("covered.car.engin", value.value);
                        }}
                        value={(formData.covered.car.engin = "ไม่ติดตั้งแก๊ส")}
                        valid={!errors2["car.engin"]}
                        defaultLabel="ติดตั้งแก๊ส"
                        value_data={formData.covered.car.engin}
                      />
                    </div>
                    <div className="flex flex-col gap-[20px]">
                      <p className="font-athitiMedium text-[#808291] text-[16px] leading-[20px]">
                        * หมายเหตุ มีผลต่อการคิดคำนวณเบี้ยประกันภัย
                      </p>
                      <hr className="h-px bg-[#FFFFFF] border-0" />
                      <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                        <ButtonWhite
                          onClick={() => {
                            setStep(1);
                          }}
                          text="ย้อนกลับ"
                        />
                        <ButtonBrown
                          onClick={async () => {
                            if (!validateFormStep2()) {
                              setIsOpenWarning(true);
                              setTextWarning("กรุณากรอกข้อมูลให้เรียบร้อย");
                              return;
                            } else {
                              setIsLoading(true);

                              const updatedFormData = {
                                ...formData,
                                covered: {
                                  ...formData.covered,
                                  car: {
                                    ...formData.covered.car,
                                    no: [
                                      formData.covered.car.no1,
                                      formData.covered.car.no2,
                                    ],
                                  },
                                },
                              };

                              formData.covered.car.no = [
                                formData.covered.car.no1,
                                formData.covered.car.no2,
                              ];
                              let no1 = formData.covered.car.no1;
                              let no2 = formData.covered.car.no2;

                              delete formData.covered.car.no1;
                              delete formData.covered.car.no2;

                              //console

                              //console.log(updatedFormData);

                              const updateRespons = await updateApplication(
                                formData,
                                appid
                              )
                                .then((response) => {
                                  formData.covered.car.no1 = no1;
                                  formData.covered.car.no2 = no2;

                                  setIsSending(false);
                                  setStep(3);
                                })
                                .catch((error) => {
                                  setTextWarning(error.message);
                                  setIsOpenWarning(true);
                                });

                              /*const updateResponse = await axios.post("/api/application", { action: 'update', app_id: appid, formData: updatedFormData, token })
                              .then((response) => {
                                if (response.status == 200) {
                                  setStep(3);
                                } else {
                                  setIsOpenWarning(true);
                                  setTextWarning('ERROR : update')
                                }
                              })
                              .catch((error) => {
                                console.log("ERROR : ", error);
                                
                                setTextWarning( error.message);
                                setIsOpenWarning(true);
                              })
                                */

                              setIsLoading(false);

                              //setStep(2);
                            }
                            /*
                          if (formData.covered.name.title === '' &&formData.covered.name.first === '' && formData.covered.name.last === '') {
                            setIsOpenWarning(true);
                            setTextWarning('กรุณากรอกข้อมูลให้เรียบร้อย')
                          } else {
                            setStep(2);
  
                          }
                            */
                          }}
                          text={isLoading ? "Loading..." : "ถัดไป"}
                        />
                      </div>
                    </div>
                  </FormCard>
                ) : step === 3 ? (
                  <FormCard
                    title="ข้อมูลการสั่งซื้อ"
                    text="center"
                    bgTitle="#F1F5D8"
                    bgContent="#FBFCF3"
                    paddingMbX={20}
                  >
                    {/*
                  <TextOnLine text="รายละเอียดประกันภัย" />

                  <p className="font-athitiSemiBold text-base leading-[22px]">
                    ระบุผู้ขับขี่
                  </p>

                  <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                    
                   
                    <CustomSelect
                        title="คำนำหน้าชื่อ"
                        placeholderBottom="โปรดกรอกคำนำหน้าชื่อ.."
                        options={titleOption}
                        onChange={(value) => {
                          handleOptionChange('covered.driver.title', value.value);
                        }}
                        value_data={formData.covered?.driver.title}
                        defaultLabel="คำนำหน้าชื่อ"
                        valid={!errors3['driver.title']}
                      />

                      <InputCheck
                        title="ชื่อ"
                        placeholderBottom="โปรดกรอกชื่อ"
                        valid={!errors3['driver.first']}
                        value={formData.covered?.driver.first}
                        onChange={(value) => {
                          handleOptionChange('covered.driver.first', value);
                        }}
                      />

                      <InputCheck
                        title="นามสกุล"
                        placeholderBottom="โปรดกรอกนามสกุล"
                        valid={!errors3['driver.last']}
                        value={formData.covered?.driver.last}
                        onChange={(value) => {
                          handleOptionChange('covered.driver.last', value)
                        }}
                      />

                    
                    <p className="font-athitiSemiBold text-base leading-[20px]">
                      ระยะเวลา : 1 ปี วันเริ่มต้นความคุ้มครอง
                      <span className="text-[#FF0000]">*</span>
                    </p>
                    <InputCheck
                        title="วัน/เดือน/ปี"
                        placeholderBottom="โปรดกรอก วัน/เดือน/ปี"
                        type="date"
                        valid={!errors3['protect_1year_start']}
                        onChange={(value) => {
                          handleOptionChange('covered.protect_1year_start', value)
                        }}
                        value={formData.covered?.protect_1year_start}
                        freeDate={true}

                      />
                  </div>
                  

                  <TextOnLine text="รายละเอียดประกันภัย" />
                 
                  <Checkbox 
                      value={formData.covered?.prb}
                      onChange={() => {
                        if (formData.covered.prb == '' || formData.covered.prb == undefined) {
                          handleOptionChange('covered.prb', 'Y');
                        } else {
                          handleOptionChange('covered.prb', '');
                        }
                      }}
                      text="ซื้อประกันภัยภาคบังคับ (พ.ร.บ.)" />

                    */}

                    <TextOnLine text="ระยะเวลาความคุ้มครอง : 1 ปี" />
                    <div className="grid grid-cols-[auto_37%_37%] items-center max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                      <p className="font-athitiSemiBold text-base leading-[20px]">
                        วันเริ่มคุ้มครอง
                        <span className="text-[#FF0000]">*</span> :
                      </p>
                      <InputCheck
                        required={false}
                        placeholder="วันเดือนปี"
                        type="date"
                        valid={!errors3["start"]}
                        onChange={(value) => {
                          handleOptionChange("start", value);
                        }}
                        min={today}
                        value={formData.start}
                        freeDate={true}
                      />
                    </div>
                    {/*
                  <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                    * เอกสารกรมธรรม์ภาคบังคับ (พ.ร.บ.)
                    เพื่อนำไปยื่นชำระภาษีประจำปีจะได้รับการจัดส่งให้คุณทางไปรษณีย์โดยไม่มีค่าใช้จ่ายเพิ่มเติม
                  </p>
                  */}

                    <TextOnLine text="ค่าบริการจัดส่งเอกสาร" />

                    <Checkbox
                      value={formData?.is_del}
                      onChange={() => {
                        if (
                          formData.is_del == false ||
                          formData.is_del == undefined
                        ) {
                          handleOptionChange("is_del", true);
                        } else {
                          handleOptionChange("is_del", false);
                          handleOptionChange("covered.send_post_same", "");
                        }
                      }}
                      text="จัดส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์ (+50 บาท)"
                    />

                    {formData.is_del ? (
                      <div className="md:rounded-[12px]  flex flex-col gap-[20px]">
                        <TextOnLine text="ที่อยู่ในการจัดส่งเอกสาร" />

                        <Checkbox
                          value={formData.covered?.send_post_same}
                          onChange={() => {
                            console.log("SEND POST NAME : ", formData.covered.send_post_same);
                            if (
                              formData.covered.send_post_same == "" ||
                              formData.covered.send_post_same == undefined
                            ) {
                              setFormData((prevState) => ({
                                ...prevState,
                                del_address: {
                                  no: prevState.covered.address.no,
                                  moo: prevState.covered.address.moo,
                                  village: prevState.covered.address.village,
                                  project: prevState.covered.address.project,
                                  floor: prevState.covered.address.floor,
                                  room: prevState.covered.address.room,
                                  soi: prevState.covered.address.soi,
                                  road: prevState.covered.address.road,
                                  province: prevState.covered.address.province,
                                  district: prevState.covered.address.district,
                                  subdistrict: prevState.covered.address.subdistrict,
                                  zipcode: prevState.covered.address.zipcode,
                                  thaipost_id:
                                    prevState.covered.address.thaipost_id,
                                },
                              }));
                              
                              handleOptionChange("covered.send_post_same", "Y");
                    

                            } else {
                              setFormData((prevState) => ({
                                ...prevState,
                                del_address: {
                                  no: "",
                                  moo: "",
                                  village: "",
                                  project: "",
                                  floor: "",
                                  room: "",
                                  soi: "",
                                  road: "",
                                  province: "",
                                  district: "",
                                  subdistrict: "",
                                  zipcode: "",
                                  thaipost_id: "",
                                },
                              }));

                              /*setResetAddr1(true);
                              setResetAddr2(true);
                              setResetAddr3(true);
                              setResetAddr4(true);*/

                              handleOptionChange("covered.send_post_same", "");
                            }

                            console.log('DEL ADDRESS : ', formData);
                          }}
                          text="ใช้ที่อยู่เดียวกับที่อยู่หน้ากรมธรรม์"
                        />

                        
                        <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                          <InputCheck
                            Ref={addressRef}
                            title="บ้านเลขที่"
                            onChange={(value) => {
                              handleOptionChange("del_address.no", value);
                            }}
                            value={formData?.del_address?.no}
                            valid={!errors3["del_address.no"]}
                            type="text"
                          />

                          <InputCheck
                            title="หมู่"
                            onChange={(value) => {
                              handleOptionChange("del_address.moo", value);
                            }}
                            value={formData?.del_address?.moo}
                            type="text"
                            required={false}
                          />

                          <InputCheck
                            title="หมู่บ้าน"
                            onChange={(value) => {
                              handleOptionChange(
                                "del_address.village",
                                value
                              );
                            }}
                            value={formData?.del_address?.village}
                            valid=""
                            required={false}
                          />

                          <InputCheck
                            title="โครงการ"
                            required={false}
                            valid=""
                            onChange={(value) => {
                              handleOptionChange(
                                "del_address.project",
                                value
                              );
                            }}
                            value={formData?.del_address?.project}
                          />

                          <InputCheck
                            title="ชั้น"
                            required={false}
                            valid=""
                            onChange={(value) => {
                              handleOptionChange("del_address.floor", value);
                            }}
                            value={formData?.del_address?.floor}
                          />

                          <InputCheck
                            title="ห้อง"
                            required={false}
                            valid=""
                            onChange={(value) => {
                              handleOptionChange("del_address.room", value);
                            }}
                            value={formData?.del_address?.room}
                          />

                          <InputCheck
                            title="ซอย"
                            required={false}
                            valid=""
                            onChange={(value) => {
                              handleOptionChange("del_address.soi", value);
                            }}
                            value={formData?.del_address?.soi}
                          />

                          <InputCheck
                            title="ถนน"
                            required={false}
                            valid=""
                            onChange={(value) => {
                              handleOptionChange("del_address.road", value);
                            }}
                            value={formData?.del_address?.road}
                          />

                          <div className="md:col-start-1 md:col-end-3">
                            <CustomSelect
                              Ref={provinceRef}
                              title="จังหวัด"
                              placeholderBottom="โปรดเลือกจังหวัด"
                              options={provinces2}
                              onChange={(value) => {
                                handleSelectProvince2(
                                  "del_address.province",
                                  value.value
                                );
                              }}
                              defaultLabel=""
                              valid={!errors3["del_address.province"]}
                              value_data={formData?.del_address?.province}
                              reset={resetAddr1}
                            />
                          </div>

                          <CustomSelect
                            Ref={districtRef}
                            title="อำเภอ / เขต"
                            placeholderBottom="โปรดเลือกอำเภอ / เขต"
                            options={amphoes2}
                            value_data={formData?.del_address?.district}
                            onChange={(value) => {
                              handleSelectAmphoe2(
                                "del_address.district",
                                value.value
                              );
                            }}
                            defaultLabel=""
                            reset={resetAddr2}
                            valid={!errors3["del_address.district"]}
                          />

                          <CustomSelect
                            Ref={subdistrictRef}
                            title="ตำบล / แขวง"
                            placeholderBottom="โปรดเลือกตำบล / แขวง"
                            options={districts2}
                            valid={!errors3["del_address.subdistrict"]}
                            value_data={formData?.del_address?.subdistrict}
                            onChange={(value) => {
                              handleSelectDistrict2(
                                "del_address.subdistrict",
                                value.value
                              );
                            }}
                            defaultLabel=""
                            reset={resetAddr3}
                          />

                          <div className="md:col-start-1 md:col-end-3">
                            <InputCheck
                              title="รหัสไปรษณีย์"
                              placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                              initialValue={zipcode2}
                              valid={!errors3["del_address.zipcode"]}
                              value={formData?.del_address?.zipcode}
                              onChange={handleZipcode2}
                            />
                          </div>
                        </div>
                        
                      </div>
                    ) : null}

                    <p className="font-athitiMedium  text-[#808291] text-[16px] leading-[20px]">
                      * กรมธรรม์ประกันภัยภาคสมัครใจ (ประเภท 1, 2, 2+, 3+ หรือ 3)
                      จะได้รับการส่งให้คุณทางอีเมลภายหลังการชำระเงินเสร็จสิ้นสมบูรณ์ในกรณีที่คุณ
                      ต้องการได้รับกรมธรรม์ภาคสมัครใจทางไปรษณีย์
                      กรุณาชำระค่าบริการจัดส่ง 50 บาท
                    </p>

                    <hr className="h-px bg-[#FFFFFF] border-0" />

                    <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                      <ButtonWhite
                        onClick={() => {
                          setStep(2);
                        }}
                        text="ย้อนกลับ"
                      />
                      <ButtonBrown
                        onClick={async () => {
                          //setStep(4);

                          if (!validateFormStep3()) {
                            setIsOpenWarning(true);
                            setTextWarning("กรุณากรอกข้อมูลให้เรียบร้อย");
                            return;
                          } else {
                            setIsLoading(true);

                            delete formData.covered.is_del;
                            delete formData.Is_del;
                            delete formData.covered.car.no1;
                            delete formData.covered.car.no2;
                            delete formData.covered.car.post_plus_50;
                            delete formData.covered.car.prb;
                            delete formData.covered.car.prb_1year_start;
                            delete formData.covered.car.sned_doc;
                            delete formData.covered.car.send_post_same;
                            delete formData.covered.car.send_vat;
                            delete formData.covered.del_address;

                            let no1 = formData.covered.car.no1;
                            let no2 = formData.covered.car.no2;

                            delete formData.covered.car.no1;
                            delete formData.covered.car.no2;

                            const updateRespons = await updateApplication(
                              formData,
                              appid
                            )
                              .then((response) => {
                                formData.covered.car.no1 = no1;
                                formData.covered.car.no2 = no2;

                                setIsSending(false);
                                setStep(4);
                              })
                              .catch((error) => {
                                setTextWarning(error.message);
                                setIsOpenWarning(true);
                              });

                            setIsLoading(false);
                          }
                        }}
                        text={isLoading ? "Loading..." : "ถัดไป"}
                      />
                    </div>
                  </FormCard>
                ) : step === 4 ? (
                  <FormCard
                    title="สรุปการสั่งซื้อประกันรถยนต์"
                    text="center"
                    bgTitle="#E7E5E4"
                    bgContent="#F5F5F4"
                    paddingMbX="20"
                  >
                    <TextOnLine text=" สรุปข้อมูลการชำระเงิน" />

                    <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end gap-[14px] max-md:gap-[6px] font-athitiMedium text-[18px] leading-[22px]">
                      <p>
                        {formData.package.insurer.name} ชั้น{" "}
                        {filterclass[formData.package.class]}{" "}
                      </p>
                      <p className="max-md:pb-[12px]">
                        {formData.price.toLocaleString()} บาท
                      </p>

                      {/*<p>ประกันภัยภาคบังคับ (พ.ร.บ.)</p>
                    <p className="max-md:pb-[12px]"> บาท</p>*/}

                      <p>ส่วนลด</p>
                      <p className="max-md:pb-[12px]">
                        - {formatNumberWithCommas(Number(formData.discount).toFixed(2))} บาท
                      </p>

                      {formData.is_del == true ? (
                        <>
                          <p>ส่งกรมธรรม์ภาคสมัครใจทางไปรษณีย์</p>
                          <p className="max-md:pb-[12px]">50 บาท</p>
                        </>
                      ) : null}
                    </div>
                    <hr className="h-px bg-[#FFFFFF] border-0" />
                    <div className="grid grid-cols-2 max-md:grid-cols-1 md:[&>*:nth-child(even)]:text-end">
                      <p className="font-athitiSemiBold text-[22px] leading-[20px] text-start">
                        ยอดเงินรวม <br />
                        <span className="font-athitiMedium text-[16px] leading-[20px] text-[#808291]">
                          (รวมภาษีมูลค่าเพิ่ม 7% แล้ว)
                        </span>
                      </p>
                      <p className="font-athitiSemiBold text-[22px] leading-[40px]">
                        {calculatePrice()} บาท
                      </p>
                    </div>

                    <div
                      class="cursor-pointer flex bg-[#E7E5E4] rounded-2xl p-[16px] items-center justify-between"
                      onClick={() => setIsHidden(!isHiddin)}
                    >
                      <div class="flex items-center font-athitiSemiBold text-[18px] leading-[22px] gap-[12px]">
                        <p>รายละเอียดความคุ้มครอง</p>
                      </div>
                      <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        class="rotate-180"
                      >
                        <path
                          d="M1.33334 5.99967L6.00001 1.33301L10.6667 5.99967"
                          stroke="#111928"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>

                    {!isHiddin ? (
                      <>
                        <TableCard
                                    bgTitle="#FDE68A"
                                    bgContent="#FFFBEB"
                                    title="ความผิดต่อบุคคลภายนอก"
                                    type="thirdparty"
                                    props={formData.package.coverage.thirdparty}
                                  />

                                  <TableCard
                                    bgTitle="#FED7AA"
                                    bgContent="#FFF7ED"
                                    title="ความรับผิดชอบต่อรถยนต์เสียหาย สูญหาย ไฟไหม้"
                                    type="vehicle"
                                    props={formData.package.coverage.vehicle}
                                  />

                                  <TableCard
                                    bgTitle="#F1F5D8"
                                    bgContent="#FBFCF3"
                                    title="ความคุ้มครองตามเอกสารแนบท้าย"
                                    type="additional"
                                    props={formData.package.coverage.additional}
                                  />

                        
                      </>
                    ) : null}

                    <p className="font-athitiMedium text-[16px] leading-[20px] text-[#808291] text-center">
                      การกดยืนยันหมายถึงคุณได้ยอมรับ&nbsp;
                      <br className="md:hidden" />
                      <span className="underline">ในข้อตกลงและเงื่อนไข</span>
                      &nbsp;แล้ว
                      <br />
                      คำเตือน :
                      ผู้ซื้อควรทำความเข้าใจในรายละเอียดความคุ้มครองและเงื่อนไข
                      ก่อนตัดสินใจซื้อทุกครั้ง
                    </p>
                    <hr className="h-px bg-[#FFFFFF] border-0" />

                    
                    <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[10px] md:mx-auto">
                      
                      <ButtonWhite
                      
                        disabled={statusPay}
                        
                        onClick={() => {
                          setFormData((prevState) => ({
                            ...prevState,
                            covered: {
                              ...prevState.covered,
                              car: {
                                ...prevState.covered.car,
                                no1: prevState.covered.car.no[0], // Set no1 to the first element of "no"
                                no2: prevState.covered.car.no[1], // Set no2 to the second element of "no"
                              },
                            },
                          }));
                          setStep(3);
                        }}
                        text="ย้อนกลับ"
                      />
                    

                      <ButtonBrown
                        isLoading={isLoading}
                        onClick={confirmPay}
                        text="ยืนยันคำสั่งซื้อ"
                      />
                    </div>

                  </FormCard>
                ) : null}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9">
            <div className="container mx-auto">
              <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-lg:leading-[38px] max-lg:text-[28px]">
                กรุณารอสักครู่
              </p>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export const getServerSideProps = async ({ params }) => {
  // Assuming params.slug is something like '123-car-model'
  const { appid } = params;

  return {
    props: {
      appid,
    },
  };
};
