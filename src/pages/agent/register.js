import CustomSelect from "../../app/components/customSelect";
import { useState, useEffect, useRef } from "react";
import FileInput from "../../app/components/fileInput";
import InputCheck from "../../app/components/inputCheck";
import FormCard from "../../app/components/templateComponent/form-card";
import ButtonWhite from "../../app/components/button/btn-white";
import ButtonBrown from "../../app/components/button/btn-brown";
import Warning from "../../app/components/warning";
import useAddressStore from "@/store/addressStore";
import Checkbox from "@/app/components/textComponent/checkbox";
import useStore from "@/store/store";
import agentStore from "@/store/agentStore";
import meStore from "@/store/meStore";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import axios from "axios";
import Image from "next/image";
import { default as FormData } from "form-data";


export default function Agent() {
  
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState('');

  const titleRef= useRef(null);
  const firstRef = useRef(null);
  const lastRef = useRef(null);
  const birthdateRef = useRef(null);
  const idcardRef = useRef(null);
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
  const agentOicRef = useRef(null);
  const agentIdNbrRef = useRef(null);
  const agentBookBankRef = useRef(null);


  const [validateAccept, setValidateAccept] = useState(false);


  

  const titleOption = [
    { value: "นาย", label: "นาย" },
    { value: "นาง", label: "นาง" },
    { value: "นางสาว", label: "นางสาว" },
  ];
  const genderOption = [
    { value: "ชาย", label: "ชาย" },
    { value: "หญิง", label: "หญิง" },
    { value: "ไม่ระบุ", label: "ไม่ระบุ" },
  ];

  const [formData, setFormData] = useState({
    name: {
      title: "",
      first: "",
      last: "",
    },
    birthdate: "",
    gender: "",
    id_nbr: "",
    mobile: "",
    mobile_other: "",
    email: "",
    address: {
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
    oic: {
      card: "",
      expire: ""
    },
    refer: {
      name: {
        title: "",
        first: "",
        last: "",
      },
      idcard: "",
      mobile: "",
    },
    refer_code: "",
    accept: '',
    agent: {
      oic: null,
      bookbank: null,
      id_nbr: null,
      other: null
      
    }
  });

  const [errors, setErrors] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  const [labelProvince, setLabelProvince] = useState("");
  const [labelAmphoe, setLabelAmphoe] = useState("");
  const [labelDistrict, setLabelDistrict] = useState("");
  const [labelZipcode, setLabelZipcode] = useState("");

  const [resetAddr1, setResetAddr1] = useState(false);
  const [resetAddr2, setResetAddr2] = useState(false);
  const [resetAddr3, setResetAddr3] = useState(false);
  const [resetAddr4, setResetAddr4] = useState(false);

  const { user, token, setUser, setToken } = useStore();
  const { createAgent, updateDocument } = agentStore();
  const { getMe } = meStore();

  useEffect(() => {
    let timer;
    
    
    if (user) {
        if (user.agent) {
            if (user.approve_at) {
                router.push('/agent/dashboard')
            } else {
                router.push('/agent/registered');
            }
        } else {
          if (!user.verify_at) {
            setUser(null);
            setToken(null);
            router.push('/register')
          }
          setIsLoading(false);
            
        }
    } else if (user === null) {
    // Set a 10-second delay before redirecting to login
        timer = setTimeout(() => {
            router.push('/login');
        }, 500);
    }

    return () => clearTimeout(timer);

  }, [user, router]);

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
  } = useAddressStore();

  const myState = useAddressStore((state) => state.address_id); // Get the current state

  useEffect(() => {
    if (!user) {
      //router.push('/');
    }
    fetchProvices();
    //console.log(zipcode, " - ", address_id);
    //console.log(formData);
  }, [fetchProvices]);

  const handleSelectProvince = (label, value) => {
    setProvince(value);
    setLabelProvince(value);
    fetchAmphoes(value);

    const [field, subfield] = label.split("."); // Split the input name to handle nested objects

    setFormData((prevData) => {
      const newData = { ...prevData };

      console.log(label);

      //if (subfield) {
        newData[field][subfield] = value;
        newData[field]["district"] = "";
        newData[field]["subdistrict"] = "";
        newData[field]["zipcode"] = "";
        newData[field]["thaipost_id"] = "";
      
      return newData;
    });

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }

    setResetAddr2(true);
    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);
  };

  const handleSelectAmphoe = (label, value) => {
    setAmphoe(value);
    setLabelProvince(value);
    fetchDistricts();

    const [parent, key] = label.split("."); // Split the input name to handle nested objects
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }

    setResetAddr3(true);
    setResetAddr4(true);
    setLabelZipcode("");

    setTimeout(() => setResetAddr2(false), 0);
    setTimeout(() => setResetAddr3(false), 0);
    setTimeout(() => setResetAddr4(false), 0);
  };

  const handleSelectDistrict = async (label, value) => {
    setDistrict(value);
    setLabelProvince(value);
    const response = await fetchZipcode();
    setLabelZipcode(response.zipcode);

    const [parent, key] = label.split("."); // Split the input name to handle nested objects
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));

    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        ["zipcode"]: response.zipcode,
        ["thaipost_id"]: response.address_id,
      },
    }));

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors["contact.zipcode"];
      return newErrors;
    });
  };

  const handleZipcode = (value) => {
    console.log("zipcdoe : ", value);
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


    console.log(formData);
    
    
    /*setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));*/

   // validateForm();

    /*if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }*/
  };

  const handleCheckboxChange = () => {
    
    setFormData((prev) => ({
      ...prev,
      accept: !prev.accept
    }));
    setValidateAccept(false);

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors['accept'];
      return newErrors;
    });
  };

  const handleChange = (label, value) => {
    const [parent, key] = label.split("."); // Split the input name to handle nested objects
    setFormData((prev) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [key]: value,
      },
    }));

    //console.log('>>> : ', errors[label]);

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }
  };

  const handleChangeSingle = (label, value) => {
    setFormData((prev) => ({
      ...prev,
      [label]: value,
    }));

    if (errors[label]) {
      setErrors((prevErrors) => {
        const newErrors = { ...prevErrors };
        delete newErrors[label];
        return newErrors;
      });
    }
  };

  const scrollToWithOffset = (ref) => {
    console.log(' ref : ', ref);
    const elementPosition = ref.current.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - 80; // Offset by 50px

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  };

  const scrollToFirstError = (newErrors) => {
    if (newErrors.length > 0) {
      scrollToWithOffset(newErrors[0]);
    }
    
  };

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
  }

  const validateForm = () => {
    const newErrors = {};
    const errorFields = [];

    // Validate 'name' fields
    if (!formData.name.title) {
      newErrors["name.title"] = "Title is required";
      errorFields.push(titleRef);
    }
    

    if (!formData.name.first) {
      newErrors["name.first"] = "First name is required";
      errorFields.push(firstRef)

    }
      
    if (!formData.name.last) {
      newErrors["name.last"] = "Last name is required";
      errorFields.push(lastRef);
    }
    if (!formData.birthdate) {
      newErrors["birthdate"] = "Last name is required";
      errorFields.push(birthdateRef)
    }

    
    
    if (!formData.id_nbr) {
      newErrors["idcard"] = "idcard is required";
      errorFields.push(idcardRef)
    } else {
      if (formData.id_nbr.length < 13) {
        newErrors["idcard"] = "idcard length";
        errorFields.push(idcardRef);
      } else {
        if (!isValidThaiID(formData.id_nbr)) {
          newErrors["idcard"] = "Not valid idcard";
          errorFields.push(idcardRef);
        }

      }
    }

    if (!formData.mobile) {
      newErrors["mobile"] = "mobile is required";
      errorFields.push(mobileRef);
    } else {
      if (formData.mobile.length < 10) {
        newErrors["mobile"] = "mobile is required";
        errorFields.push(mobileRef);
      }
    }

    //if (!formData.name.mobile_other) newErrors["name.mobile_other"] = "Mobile is required";
    
    if (!formData.email) {
      newErrors["email"] = "Email is required";
      errorFields.push(emailRef);
    } else {
      
      
      const emailRegex =  /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (!emailRegex.test(formData.email)) {
        newErrors["email"] = "Invalid email format";
        errorFields.push(emailRef);
      }
    }

    if (!formData.gender){
      newErrors["gender"] = "Gender";
      errorFields.push(genderRef);
    }

    // Validate 'contact' fields

    if (!formData.address.no) {
      newErrors["address.no"] = "Address is required";
      errorFields.push(addressRef);
    }

   // if (!formData.contact.moo) newErrors["contact.moo"] = "Moo is required";

    if (!formData.address.province) {
      newErrors["address.province"] = "Province is required";
      errorFields.push(provinceRef);
    }
    if (!formData.address.district) {
      newErrors["address.district"] = "District is required";
      errorFields.push(districtRef);
    }

    if (!formData.address.subdistrict) {
      newErrors["address.subdistrict"] = "Subdistrict is required";
      errorFields.push(subdistrictRef);
    }
    if (!formData.address.zipcode) {
      newErrors["address.zipcode"] = "zipcode is required";
      errorFields.push(subdistrictRef);
    }

    if (!formData.oic.card) {
      newErrors["oic.card"] = "agen card is required";
      errorFields.push(agentCardRef);
    }
    if (!formData.oic.expire) {
      newErrors["oic.expire"] = "agen expire is required";
      errorFields.push(agentExpireRef);
    }

    if (!formData.agent.oic) {
      newErrors["agent.oic"] = "agen expire is required";
      errorFields.push(agentOicRef);
    }

    if (!formData.agent.id_nbr) {
      newErrors["agent.id_nbr"] = "agen expire is required";
      errorFields.push(agentIdNbrRef);
    }

    if (!formData.agent.bookbank) {
      newErrors["agent.bookbank"] = "agen expire is required";
      errorFields.push(agentBookBankRef);
    }

    if (!formData.refer.name.title) {
      newErrors["refer.name.title"] = "titler refer is required";
      errorFields.push(titlePersonRef);
    }
    if (!formData.refer.name.first) {
      newErrors["refer.name.first"] = "name refer is required";
      errorFields.push(firstPersonRef);
    }
    if (!formData.refer.name.last) {
      newErrors["refer.name.last"] = "lastname refer is required";
      errorFields.push(lastPersonRef);
    }
    
    
    if (!formData.refer.idcard) {
      newErrors["refer.idcard"] = "idcard refer is required";
      errorFields.push(idcardPersonRef);
    } else {
      if (formData.refer.idcard.length < 13) {
        newErrors["refer.idcard"] = "idcard refer length";
        errorFields.push(idcardPersonRef);
      } else {
        if (!isValidThaiID(formData.refer.idcard)) {
          newErrors["refer.idcard"] = "Not valid idcard";
          errorFields.push(idcardPersonRef);
        }
      }
    }

    if (!formData.refer.mobile) {
      newErrors["refer.mobile"] = "mobile refer is required";
      errorFields.push(mobilePersonRef);
    } else {
      if (formData.refer.mobile.length < 10) {
        newErrors["refer.mobile"] = "mobile refer length";
        errorFields.push(mobilePersonRef);
      }

    }
  
    if (!formData.accept) {
      newErrors["accept"] = "accept required";
      errorFields.push(acceptRef);
    }

    
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      scrollToFirstError(errorFields);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setTextWarning('กรุณากรอกข้อมูลให้ครบค่ะ');
      setIsOpenWarning(true);
      return;
    }

    setIsLoading(true);

  
    setFormData((prev) => ({
      ...prev,
      ["oic_no"]: Date.now(),
    }));

    try {
      
      const response = await createAgent(formData);
      if (response) {

        const data = new FormData();
        if (formData.agent.oic) {
          data.append("oic", formData.agent.oic);
        }
        if (formData.agent.id_nbr) {
          data.append("id_nbr", formData.agent.id_nbr);
        }

        if (formData.agent.bookbank) {
          data.append("bookbank", formData.agent.bookbank);
        }

        if (formData.agent.other) {
          // For multiple files, append each file individually
          formData.agent.other.forEach((file, index) => {
            data.append(`other[${index}]`, file);
          });
        }

        if (formData.agent.oic && formData.agent.id_nbr && formData.agent.bookbank) {
          const uploadrespose = await updateDocument(data);
          const responseProfile2 = await getMe();
          setUser(responseProfile2);
          setIsLoading(false);
          router.push('/agent');
        } else {
          const responseProfile = await getMe();
          console.log('user : ', responseProfile);
          setUser(responseProfile);
          setIsLoading(false);
          router.push('/agent');
        }

        

      } else {
        setTextWarning('รหัสสมาชิกผู้แนะนำไม่ถูกต้อง');
        setIsOpenWarning(true);
        setIsLoading(false);

      }
      /*
      if (response.status == 200) {

        const responseProfile = await axios.post("/api/me", {
          token
        });

        if (responseProfile.status == 200) {
         
          //router.push('/agent');
          setUser(responseProfile.data.data);
          setIsLoading(false);


        } else {
          setTextWarning('ติดตั้งเจ้าหน้าที่เพื่อตรวจสอบ การเรียกข้อมูล');
          setIsOpenWarning(true);
          setIsLoading(false);
        }
      } else {
        setTextWarning('ติดตั้งเจ้าหน้าที่เพื่อตรวจสอบ การลงทะเบียน');
        setIsOpenWarning(true);
        setIsLoading(false);

      }
        */
    } catch (error) {
      //console.error("รหัสสมาชิกผู้แนะนำไม่ถูกต้อง");
      setTextWarning('รหัสสมาชิกผู้แนะนำไม่ถูกต้อง');
      setIsOpenWarning(true);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  const handleFileChange = (field, file) => {
    
    setFormData((prev) => ({
      ...prev,
      agent: {
        ...prev.agent,
        [field]: file,
      },
    }));
    
   console.log(formData);
  };

  return (
    <>
      <Head>
        <title>สมัครสมาชิก เดโมโบรกเกอร์</title>
      </Head>
      <Warning
        id="validateAgentForm"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />
      <div className="bg-singha max-xl:bg-[length:auto_60%]  py-9 max-md:px-3">
        <div className="container mx-auto md:p-[24px]">
          <h1 className="text-[#181B31] font-athitiBold text-[36px] leading-[48px] text-center">
            สมัครสมาชิก เดโมโบรกเกอร์
          </h1>
          <p className="text-[#181B31] pb-[12px] font-athitiMedium text-[20px] leading-[30px] text-center">
            กรอกข้อมูลของคุณเพื่อสมัครสมาชิก
          </p>
          <div className="bg-[#ffffff] p-[24px] rounded-[12px] flex flex-col gap-y-[24px] drop-shadow-[0_1px_2px_rgba(107,114,128,0.2)]">
            <FormCard
              title="ข้อมูลสมาชิก"
              text="left"
              bgTitle="#FDE68A"
              bgContent="#FFFBEB"
            >
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                <CustomSelect
                  title="คำนำหน้าชื่อ"
                  Ref={titleRef}
                  placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                  options={titleOption}
                  onChange={(value) => {
                    handleOptionChange("name.title", value.value);
                  }}
                  value={formData.name.title}
                  defaultLabel=""
                  valid={!errors["name.title"]}
                />

                <InputCheck
                  Ref={firstRef}
                  title="ชื่อ"
                  placeholderBottom="โปรดกรอกชื่อ"
                  valid={!errors["name.first"]}
                  value={formData.name.first}
                  maxlength={30}
                  onChange={(value) => {
                    handleOptionChange("name.first", value);
                    //console.log(value);
                  }}
                />

                <InputCheck
                  Ref={lastRef}
                  title="นามสกุล"
                  placeholderBottom="โปรดกรอกนามสกุล"
                  valid={!errors["name.last"]}
                  value={formData.name.last}
                  maxlength={30}
                  onChange={(value) => {
                    handleOptionChange("name.last", value);
                  }}
                />

                <InputCheck
                  Ref={birthdateRef}
                  title="วัน/เดือน/ปี เกิด"
                  placeholderBottom="โปรดกรอกวัน/เดือน/ปี เกิด"
                  type="date"
                  valid={!errors["birthdate"]}
                  onChange={(value) => {
                    handleOptionChange("birthdate", value);
                  }}
                  value={formData.birthdate}
                />

                <CustomSelect
                  Ref={genderRef}
                  title="เพศ"
                  placeholderBottom="โปรดเลือกเพศ"
                  options={genderOption}
                  onChange={(value) => {
                    handleOptionChange("gender", value.value);
                  }}
                  value={formData.gender}
                  defaultLabel=""
                  valid={!errors["gender"]}
                />

                <InputCheck
                  Ref={idcardRef}
                  title="เลขบัตรประชาชน 13 หลัก"
                  placeholderBottom="ตัวอย่าง 0123456789123"
                  valid={!errors["idcard"]}
                  maxlength="13"
                  onChange={(value) => {
                    handleOptionChange('id_nbr', value);
                    
                  }}

                  value={formData.id_nbr}
                  errorShowLabel="กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง"
                  onKeyPress
                />

                <InputCheck
                  Ref={mobileRef}
                  title="หมายเลขติดต่อ"
                  placeholderBottom="*ตัวอย่าง 0987654321"
                  valid={!errors["mobile"]}
                  maxlength="10"
                  onChange={(value) => {
                    handleOptionChange("mobile", value);
                  }}
                  value={formData.mobile}
                  onKeyPress
                />

                <InputCheck
                  title="หมายเลขติดต่อ ( เพิ่มเติม )"
                  placeholderBottom="*ตัวอย่าง 0987654321"
                  onChange={(value) => {
                    handleOptionChange("mobile_other", value);
                  }}
                  value={formData.mobile_other}
                  maxlength="10"
                  onKeyPress
                  required={false}
                />

                <InputCheck
                  Ref={emailRef}
                  title="อีเมล"
                  placeholderBottom="ตัวอย่าง example@gmail.com"
                  valid={!errors["email"]}
                  onChange={(value) => {
                    handleOptionChange("email", value);
                  }}
                  value={formData.email}
                  errorShowLabel="กรุณากรอกอีเมลให้ถูกต้อง"
                  onKeyPress
                  type="email"
                />
              </div>
            </FormCard>

            <FormCard
              title="ที่อยู่ที่ติดต่อได้สะดวก"
              text="left"
              bgTitle="#E7E5E4"
              bgContent="#F5F5F4"
            >
              <div className="grid grid-cols-[15%_15%_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                <InputCheck
                  Ref={addressRef}
                  title="บ้านเลขที่"
                  valid={!errors["address.no"]}
                  onChange={(value) => {
                    handleOptionChange("address.no", value);
                  }}
                  maxlength={40}
                  value={formData.address.no}
                />

                <InputCheck
                  title="หมู่"
                  onChange={(value) => {
                    handleOptionChange("address.moo", value);
                  }}
                  value={formData.address.moo}
                  required={false}
                  maxlength={20}
                />

                <InputCheck
                  title="หมู่บ้าน"
                  required={false}
                  onChange={(value) => {
                    handleOptionChange("address.village", value);
                  }}
                  value={formData.address.village}
                  maxlength={50}
                />

                <InputCheck
                  title="โครงการ"
                  required={false}
                  valid=""
                  onChange={(value) => {
                    handleOptionChange("address.project", value);
                  }}
                  value={formData.address.village_project}
                  maxlength={80}
                />

                <InputCheck
                  title="ชั้น"
                  required={false}
                  valid=""
                  onChange={(value) => {
                    handleOptionChange("address.floor", value);
                  }}
                  value={formData.address.floor}
                  maxlength={20}
                />

                <InputCheck
                  title="ห้อง"
                  required={false}
                  valid=""
                  onChange={(value) => {
                    handleOptionChange("address.room", value);
                  }}
                  value={formData.address.room}
                  maxlength={20}
                />

                <InputCheck
                  title="ซอย"
                  required={false}
                  valid=""
                  onChange={(value) => {
                    handleOptionChange("address.soi", value);
                  }}
                  value={formData.address.soi}
                  maxlength={50}
                />

                <InputCheck
                  title="ถนน"
                  required={false}
                  valid=""
                  onChange={(value) => {
                    handleOptionChange("address.road", value);
                  }}
                  value={formData.address.road}
                  maxlength={20}
                />

                <div className="md:col-start-1 md:col-end-3">
                  <CustomSelect
                    Ref={provinceRef}
                    title="จังหวัด"
                    placeholderBottom="โปรดเลือกจังหวัด"
                    options={provinces}
                    onChange={(value) => {
                      handleSelectProvince("address.province", value.value);
                    }}
                    defaultLabel=""
                    valid={!errors["address.province"]}
                    reset={resetAddr1}
                  />
                </div>

                <CustomSelect
                  Ref={districtRef}
                  title="อำเภอ / เขต"
                  placeholderBottom="โปรดเลือกอำเภอ / เขต"
                  options={amphoes}
                  onChange={(value) => {
                    handleSelectAmphoe("address.district", value.value);
                  }}
                  defaultLabel=""
                  reset={resetAddr2}
                  valid={!errors["address.district"]}
                />

                <CustomSelect
                  Ref={subdistrictRef}
                  title="ตำบล / แขวง"
                  placeholderBottom="โปรดเลือกตำบล / แขวง"
                  options={districts}
                  valid={!errors["address.subdistrict"]}
                  onChange={(value) => {
                    handleSelectDistrict("address.subdistrict", value.value);
                  }}
                  defaultLabel=""
                  reset={resetAddr3}
                />

                <div className="md:col-start-1 md:col-end-3">
                  <InputCheck
                    Ref={subdistrictRef}
                    title="รหัสไปรษณีย์"
                    placeholderBottom="โปรดกรอกรหัสไปรษณีย์"
                    initialValue={zipcode}
                    valid={!errors["address.zipcode"]}
                    value={zipcode}
                    onChange={handleZipcode}
                  />
                </div>
              </div>
            </FormCard>

            <FormCard
              title={
                <>
                  ใบอนุญาตนายหน้า
                  <br className="md:hidden" />
                  ประกันวินาศภัยโดยตรง
                </>
              }
              text="left"
              bgTitle="#FDE68A"
              bgContent="#FFFBEB"
            >
              <div className="grid grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                <InputCheck
                  Ref={agentCardRef}
                  title="เลขที่ใบอนุญาต"
                  placeholderBottom="โปรดกรอกเลขที่ใบอนุญาต"
                  valid={!errors["oic.card"]}
                  value={formData.oic.card}
                  onChange={(value) => {
                    handleOptionChange("oic.card", value);
                    //console.log(value);
                  }}
                  maxlength={15}
                />

                <InputCheck
                  Ref={agentExpireRef}
                  title="วันที่ใบอนุญาตหมดอายุ"
                  placeholderBottom="โปรดกรอกวัน/เดือน/ปี วันที่ใบอนุญาต"
                  type="date"
                  freeDate={true}
                  valid={!errors["oic.expire"]}
                  value={formData.oic.expire}
                  onChange={(value) => {
                    handleOptionChange("oic.expire", value);
                    //console.log(value);
                  }}
                />

                <FileInput
                  Ref={agentOicRef}
                  label="รูปบัตรอนุญาตนายหน้า"
                  valid={!errors['agent.oic']}
                  fileChange={(file) => handleFileChange('oic', file)}
                  placeholderBottom="โปรดอัพโหลดรูปบัตรอนุญาตนายหน้า"
                  id="broker-license-card"
                  required
                  accept="image/png, image/jpeg, image/jpg"
                />

                <FileInput
                  Ref={agentIdNbrRef}
                  label="รูปบัตรประชาชน"
                  valid={!errors['agent.id_nbr']}
                  fileChange={(file) => handleFileChange("id_nbr", file)}
                  placeholderBottom="โปรดอัพโหลดรูปบัตรประชาชน"
                  id="broker-id-card"
                  required
                  accept="image/png, image/jpeg, image/jpg"
                />

                <FileInput
                  Ref={agentBookBankRef}
                  label="รูปหน้าบัญชีธนาคาร"
                  valid={!errors['agent.bookbank']}
                  fileChange={(file) => handleFileChange("bookbank", file)}
                  placeholderBottom="โปรดอัพโหลดรูปหน้าบัญชีธนาคาร"
                  id="bank-account"
                  required
                  accept="image/png, image/jpeg, image/jpg"
                />

                <FileInput
                  label="เอกสารอื่น ๆ"
                  multiple={true}
                  
                  fileChange={(file) => handleFileChange("other", file)}
                  placeholderBottom="โปรดอัพโหลดเอกสารอื่น ๆ"
                  id="other-documents"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
            </FormCard>

            <FormCard
              title="บุคคลอ้างอิง"
              text="left"
              bgTitle="#E7E5E4"
              bgContent="#F5F5F4"
            >
              <div className="grid grid-cols-[auto_auto_auto] max-md:grid-cols-1 gap-y-[20px] gap-x-[20px] max-lg:gap-x-[10px]">
                <CustomSelect
                  Ref={titlePersonRef}
                  title="คำนำหน้าชื่อ"
                  placeholderBottom="โปรดกรอกคำนำหน้าชื่อ"
                  options={titleOption}
                  onChange={(value) => {
                    handleOptionChange("refer.name.title", value.value);
                  }}
                  value={formData.refer.name.title}
                  defaultLabel=""
                  valid={!errors["refer.name.title"]}
                />

                <InputCheck
                  Ref={firstPersonRef}
                  title="ชื่อ"
                  placeholderBottom="โปรดกรอกชื่อ"
                  value={formData.refer.name.first}
                  onChange={(value) => {
                    handleOptionChange("refer.name.first", value);
                    //console.log(value);
                  }}
                  maxlength={30}
                  valid={!errors["refer.name.first"]}
                />

                <InputCheck
                  Ref={lastPersonRef}
                  title="นามสกุล"
                  placeholderBottom="โปรดกรอกนามสกุล"
                  valid={!errors["refer.name.last"]}
                  value={formData.refer.name.last}
                  maxlength={30}
                  onChange={(value) => {
                    handleOptionChange("refer.name.last", value);
                  }}
                />

                <InputCheck
                  Ref={idcardPersonRef}
                  title="เลขบัตรประชาชน 13 หลัก"
                  placeholderBottom="ตัวอย่าง 0123456789123"
                  valid={!errors["refer.idcard"]}
                  maxlength="13"
                  onChange={(value) => {
                    
                    handleOptionChange('refer.idcard', value);
                    /*let error = {};
                    if (!isValidThaiID(value) && value != '') {
                      error['refer.idcard'] = 'ID Not Valid';
                    } 
                    setErrors(error);
                    */

                  }}

                  value={formData.refer.idcard}
                  errorShowLabel="กรุณากรอกหมายเลขบัตรประชาชนให้ถูกต้อง"
                  onKeyPress
                />

                <InputCheck
                  Ref={mobilePersonRef}
                  title="หมายเลขติดต่อ"
                  placeholderBottom="*ตัวอย่าง 0987654321"
                  valid={!errors["refer.mobile"]}
                  maxlength="10"
                  onChange={(value) => {
                    handleOptionChange("refer.mobile", value);
                  }}
                  value={formData.refer.mobile}
                  onKeyPress
                />
              </div>
            </FormCard>

            <FormCard
              title="ข้อมูลผู้แนะนำ"
              text="left"
              bgTitle="#FDE68A"
              bgContent="#FFFBEB"
            >
              <div className="grid grid-cols-3 max-md:grid-cols-1 gap-x-[24px] gap-y-[20px]">
                <InputCheck
                  title="รหัสสมาชิก"
                  placeholderBottom="*ตัวอย่าง 9singha00002"
                  valid={!errors["refer_code"]}
                  onChange={(value) => {
                    handleChangeSingle("refer_code", value);
                  }}
                  value={formData.refer_code}
                  required={false}
                  maxlength={15}
                />
              </div>
            </FormCard>

            
            <div className="mx-auto">

              <div className="flex gap-x-2" ref={acceptRef}>
                <label className="flex gap-x-2">
                  <input
                    type="checkbox"
                    checked={formData.accept}
                    onChange={handleCheckboxChange}
                    className={`accent-[#984333] w-[16px] h-[16px] my-[2px]`}
                  />
                  <p className={`font-athitiSemiBold text-base leading-5 cursor-pointer ${
                errors['accept'] ? 'text-red-500' : 'text-[#181B31]'}`}>
                  ฉันได้อ่านและยอมรับใน <a href='/term-and-conditions' className="underline" target='_blank' >ข้อกำหนดและเงื่อนไข</a> และ <a href='/privacy-policy' className="underline" target='_blank' >นโยบายความเป็นส่วนตัว</a>
                  </p>
                </label>
              </div>

            
            </div>



            <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
              <ButtonWhite text="ย้อนกลับ" onClick={() => router.push("/")} />
              <ButtonBrown
                isLoading={isLoading}
                onClick={handleSubmit}
                text={ isLoading ? 'Loading' : 'ส่งข้อมูล'}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


