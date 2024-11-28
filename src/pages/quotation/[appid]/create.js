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
  const [discount, setDiscount] = useState(0);

  const hasFetched = useRef(false);

  const {
    fetchApplication,
    application,
    carid,
    packageid,
    updateApplication,
    updateQuotation,
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

        if (carData.status == 'Quotation') {
          //router.push(`/quotation/${appid}`)

        }

        setFormData(carData);
        setIsLoading(false);


        setFormData((prevState) => ({
          ...prevState,
          qt: {
            discount: 0
          },
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

      console.log(checkoutReponse);
      if (checkoutReponse.success) {
        window.open(
          checkoutReponse.data.data.payment.invoice.invoice_url,
          "_blank",
          "noopener,noreferrer"
        );
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

    if (!formData.covered.mobile) {
      newErrors["name.mobile"] = "mobile is required";
      errorFields.push(mobileRef);
    } else {
      if (formData.covered.mobile.length < 10) {
        newErrors["name.mobile"] = "mobile is required";
        errorFields.push(mobileRef);
      }
    }

    if (formData.qt.discount) {
      if (formData.qt.discount > formData.discount) {
        newErrors["qt.discount"] = "ราคาส่วนลดมากกว่าที่ลดจริง";
        setTextWarning('ราคาส่วนลดมากกว่าที่ลดจริง');
        errorFields.push(emailRef);
      }
    }


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
                เพื่อสร้างใบเสนอราคา
              </p>
              

              <div className="bg-[#ffffff] px-[24px] max-md:px-4 py-[24px] rounded-[12px] flex flex-col gap-y-[24px] mt-[20px] mb-[36px]">
                
                {step === 1 ? (
                  <FormCard
                    title="รายละเอียดการเอาประกัน"
                    text="center"
                    bgTitle="#FDE68A"
                    bgContent="#FFFBEB"
                    paddingMbX="0"
                  >
                    <div className="bg-[#F5F5F4] md:rounded-[12px] p-[16px] flex flex-col gap-[20px]">
                      <TextOnLine text="รายละเอียดการเอาประกัน " />
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
                          title="ส่วนลด"
                          placeholderBottom={`ส่วนลดไม่เกิน ${formData.discount}`}
                          valid={!errors1["qt.discount"]}
                          maxlength="5"
                          onChange={(value) => {
                            handleOptionChange("qt.discount", value);
                          }}
                          value={formData.qt?.discount}
                          onKeyPress
                        />

                        

                        
                      </div>
                    </div>

                    

                    <div className="max-w-[210px] w-full mx-auto mt-[40px]  flex items-center">
                      <ButtonBrown
                        onClick={async () => {
                          if (!validateFormStep1()) {
                            setIsOpenWarning(true);
                            setTextWarning("กรุณาตรวจสอบข้อมูลให้เรียบร้อย");
                            
                            
                            return;
                          } else {
                           

                            setIsSending(true);

                            const updateRespons = await updateApplication(
                              formData,
                              appid
                            )
                              .then((response) => {
                                //setIsSending(false);
                                //const qt = await updateQuotation(appid, formData.qt.discount);
                                //if (response.status === 200) {
                                  return updateQuotation(appid, formData.qt.discount);
                                //}
                                //setStep(2);
                              })
                              .then((responseqt) => {
                                //if (responseqt.status === 200) {
                                  router.push('/myInsurances');
                                  //router.push(`/app/${appid}/quotation`, '_blank');
                                  window.open(`/quotation/${appid}`, '_blank')
                                //}

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
                        text={isSending ? "กำลังบันทึก" : "ยืนยัน"}
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
