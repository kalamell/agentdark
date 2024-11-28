import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import FileInput from "@/app/components/fileInput";
import NavLink from "@/app/components/navLink";
import ButtonWhite from "@/app/components/button/btn-white";
import ButtonBrown from "@/app/components/button/btn-brown";
import applicationStore from "@/store/applicationStore";
import { useRouter } from "next/router";
import { default as FormData } from "form-data";


import Complete from "@/app/components/complete";
import Warning from "@/app/components/warning";

export default function MyInsurances({ appid }) {
  const [idCard, setIdCardCopy] = useState(null);
  const [carCopy, setCarCopy] = useState(null);
  const [additionalDoc, setAdditionalDoc] = useState(null);
  const [selectFile, setSelectFile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState('');

  const [isOpenComplete, setIsOpenComplete] = useState(false);
  const [textComplete, setTextComplete] = useState('');

  const [data, setData] = useState(null);
  const router = useRouter();

  const idcardInputRef = useRef(null);
  const profileImageInputRef = useRef(null);
  const fileOtherInputRef = useRef(null);


  const [formData, setFormData] = useState({
    id_nbr: null,
    car: null,
    other: null,
  });

  const [errors, setErrors] = useState({});


  const {
    fetchApplication,
    uploadApplicationDocument
  } = applicationStore();


  useEffect(() => {
    const fetchData = async () => {
      try {
        const carData = await fetchApplication(appid);

        if (!carData) {
          //console.log('error : ');
          router.push("/login");
          return;
        }

        setData(carData);
        setIsLoading(false);

      } catch (error) {
        //alert(' .. ', error);
        setIsLoading(false);
        //router.push('/login');
      }
    };

    if (appid) {
      fetchData();
    }
  }, [appid]);

  

  const handleFileChange = (name, file) => {
    //const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setFormData((prev) => ({
        ...prev,
        [name]: { file, fileUrl },
      }));
    }
  };

  const handleMultipleFileChange = (name, files) => {
   // const files = Array.from(event.target.files);
    const newFiles = files.map((file) => ({
      file,
      fileUrl: URL.createObjectURL(file),
    }));
    setFormData((prev) => ({
      ...prev,
      other: [...prev.other, ...newFiles],
    }));
  };

  const handleRemoveFile = (name) => {
    if (formData[name]) {
      URL.revokeObjectURL(formData[name].fileUrl);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: null,
    }));

    console.log('name :: ', name);

    // Reset the corresponding input field
    if (name === "id_nbr" && idcardInputRef.current) {
      idcardInputRef.current.value = "";
    }
    if (name === "profile_image" && profileImageInputRef.current) {
      profileImageInputRef.current.value = "";
    }
  };

  const handleRemoveMultipleFile = (index) => {
    setFormData((prev) => {
      const updatedFiles = [...prev.other];
      const [removedFile] = updatedFiles.splice(index, 1);
      
      // Revoke the object URL to free up memory
      URL.revokeObjectURL(removedFile.fileUrl);
      
      return {
        ...prev,
        other: updatedFiles,
      };
    });

    // Reset the file input to allow re-uploading if needed
    if (fileOtherInputRef.current) {
      fileOtherInputRef.current.value = "";
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const errorFields = [];


    if (!formData.id_nbr) {
      newErrors["id_nbr"] = "agen expire is required";
    }

    if (!formData.car) {
      newErrors["car"] = "agen expire is required";
    }

    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
        setTextWarning('กรุณาใส่ข้อมูลให้เรียบร้อย');
        setIsOpenWarning(true);
    } else {

        const data = new FormData();
        if (formData.id_nbr) {
          data.append("document[id_nbr]", formData.id_nbr.file);
        }
        if (formData.car) {
            data.append("document[car]", formData.car.file);
        }

        if (formData.other) {
            data.append("document[other]", formData.other.file);
        }

        const sendDocument = await uploadApplicationDocument(appid, data);

        console.log(sendDocument);

        

        
        setTextComplete('บันทึกข้อมูลเรียบร้อย');
        setIsOpenComplete(true);

        setTimeout(() => {
           router.push('/myInsurances')
        }, 500);
    }
}


  const navLink = [
    { nav: "หน้าแรก", link: "/" },
    { nav: "ประกันภัยของฉัน", link: "/myInsurances" },
    { nav: "ส่งเอกสารเพิ่มเติม", link: "#" },
  ];

  const formatDate = (date) => {
    const startDate = new Date(date);
    if (!isNaN(startDate)) {
      const fmt = `${String(startDate.getDate()).padStart(2, '0')}/${String(startDate.getMonth() + 1).padStart(2, '0')}/${startDate.getFullYear()}`;
      return fmt;
    }
    return '';
  };

  return (
    <>
      <NavLink navLink={navLink} />

      <Complete
        id="validateAgentFormx"
        isOpenWarning={isOpenComplete}
        textWarning={textComplete}
      />

    <Warning
        id="validateAgentForm"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      { !isLoading && (
      <div className="bg-singha max-xl:bg-[length:auto_60%] min-h-[calc(100vh_-_152px)]">
        <div className="container mx-auto max-md:w-full py-9 max-md:px-4">
          <p className="font-athitiBold text-center text-4xl leading-[48px] max-md:text-3xl max-md:leading-[38px]">
            ประกันภัยของฉัน
          </p>
          <div className="pt-[24px] pb-6">
            <div className="backdrop-opacity-10 backdrop-invert bg-white/80 rounded-3xl p-6 max-md:px-5 shadow-md flex flex-col">
              
              <p className="bg-[#CFCFCF] rounded-t-xl flex flex-col font-athitiSemiBold text-[22px]  text-[#984333] leading-[30px] px-5 py-4">
                ทะเบียนรถ : {data.covered.car.no[0]} {data.covered.car.no[1]}
              </p>

              <div className="bg-[#FFFFFF] p-6 max-md:px-5 rounded-b-xl flex flex-col gap-y-5">
                <div className="flex justify-between">
                  <p className="font-athitiSemiBold text-lg  text-[#808291] leading-[22px]">
                    วันที่ : { formatDate(data.start)}
                  </p>

                  <p className="font-athitiSemiBold text-sm  text-[#000000] leading-[20px] bg-[#FEF3C7] rounded-[10px] py-0.5 px-2.5">
                    ส่งเอกสาร
                  </p>
                </div>

                <hr className="h-px bg-[#D1D5DB] border-0" />


                <div className="grid grid-cols-3 gap-x-3 max-lg:grid-cols-1 max-lg:gap-y-5">
                    <FileInput
                        Ref={idcardInputRef}
                    label="สำเนาบัตรประชาชน"
                    valid={!errors['id_nbr']}
                    fileChange={(file) => handleFileChange('id_nbr', file)}
                    placeholderBottom="โปรดอัพโหลดสำเนาบัตรประชาชน"
                    id="id_nbr"
                    required
                    accept="image/png, image/jpeg, image/jpg"
                    reset={formData.id_nbr}
                    />

                    <FileInput
                    label="สำเนารถ"
                    valid={!errors["car"]}
                    fileChange={(file) => handleFileChange("car", file)}
                    placeholderBottom="โปรดอัพโหลดสำเนารถ"
                    id="car"
                    required
                    accept="image/png, image/jpeg, image/jpg"
                    reset={formData.car}
                    />

                    <FileInput
                    label="เอกสารอื่นๆ"
                    valid={!errors["other"]}
                    fileChange={(file) => handleFileChange("other", file)}
                    placeholderBottom="เอกสารอื่นๆ ถ้ามี"
                    id="นะ้ำพ"
                    accept="image/png, image/jpeg, image/jpg"
                    reset={formData.other}
                    />


                </div>

                

                
                
                
                <div className="flex max-md:grid max-md:grid-cols-2 max-md:gap-y-5 max-md:justify-items-center">
                {formData.id_nbr && (
                    <div className="p-[15px] max-md:p-3 w-fit">
                        <div className="relative">
                            <Image
                                src={formData.id_nbr.fileUrl}
                                width={120}
                                height={120}
                                alt="img"
                                priority={true}
                                className="max-md:w-full"
                            />
                            <svg
                                className="absolute top-[-10px] right-[-10px]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleRemoveFile('id_nbr')}
                            >
                                <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                                <g clipPath="url(#clip0_112_1714)">
                                <path
                                    d="M8 16L16 8M8 8L16 16"
                                    stroke="#991B1B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </g>
                                <defs>
                                <clipPath id="clip0_112_1714">
                                    <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="6"
                                    fill="white"
                                    />
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                )}

                {formData.car && (
                    <div className="p-[15px] max-md:p-3 w-fit">
                        <div className="relative">
                            <Image
                                src={formData.car.fileUrl}
                                width={120}
                                height={120}
                                alt="img"
                                priority={true}
                                className="max-md:w-full"
                            />
                            <svg
                                className="absolute top-[-10px] right-[-10px]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleRemoveFile('car')}
                            >
                                <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                                <g clipPath="url(#clip0_112_1714)">
                                <path
                                    d="M8 16L16 8M8 8L16 16"
                                    stroke="#991B1B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </g>
                                <defs>
                                <clipPath id="clip0_112_1714">
                                    <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="6"
                                    fill="white"
                                    />
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                )}

{formData.other && (
                    <div className="p-[15px] max-md:p-3 w-fit">
                        <div className="relative">
                            <Image
                                src={formData.other.fileUrl}
                                width={120}
                                height={120}
                                alt="img"
                                priority={true}
                                className="max-md:w-full"
                            />
                            <svg
                                className="absolute top-[-10px] right-[-10px]"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={() => handleRemoveFile('other')}
                            >
                                <rect width="24" height="24" rx="12" fill="#FEE2E2" />
                                <g clipPath="url(#clip0_112_1714)">
                                <path
                                    d="M8 16L16 8M8 8L16 16"
                                    stroke="#991B1B"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                </g>
                                <defs>
                                <clipPath id="clip0_112_1714">
                                    <rect
                                    x="4"
                                    y="4"
                                    width="16"
                                    height="16"
                                    rx="6"
                                    fill="white"
                                    />
                                </clipPath>
                                </defs>
                            </svg>
                        </div>
                    </div>
                )}

                
                            
                  
                </div>

                <hr className="h-px bg-[#D1D5DB] border-0" />

                <div className="grid grid-cols-[minmax(210px,_1fr)_minmax(210px,_1fr)] max-md:grid-cols-[1fr_1fr] gap-[20px] md:mx-auto">
                  <ButtonWhite text="ยกเลิก"  onClick={() => router.push('/myInsurances')}/>
                  <ButtonBrown onClick={handleSubmit} text="บันทึก" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
  