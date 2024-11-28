import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import { useState, useEffect } from "react";
import InputCheck from "../../app/components/inputCheck";
import axios from "axios";
import useStore from "@/store/store";
import { useRouter } from "next/router";
import TemplateLogin from "@/app/components/templateComponent/login";
import ButtonBrown from "@/app/components/button/btn-brown";
import Checkbox from "@/app/components/textComponent/checkbox";
import { useStepContext } from "@mui/material";

import Warning from "@/app/components/warning";

export default function NotRegister() {
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [refCode, setRefCode] = useState("");
  const [token, _setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [textWarning, settextWarning] = useState('');
  const [isOpenWarning, setIsOpenWarning] = useState(false);

  const router = useRouter();

  const { setToken, setUser } = useStore();
  

  const handleTelephoneNumber = (value) => {
    setTelephoneNumber(value);
    setValidateTelephoneNumber(true);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setValidatePassword(true);
  };

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);


  const onClickSubmit = async () => {
    telephoneNumber == "" ? setValidateTelephoneNumber(false) : "";
    setIsLoading(true);
    let _token = '';
    if (telephoneNumber !== "") {

      try {
        
        const loginResponse = await axios.post("/api/guest", { mobile: telephoneNumber });
      
        if (loginResponse.status === 200) {
          setToken(loginResponse.data.access_token);
          _setToken(loginResponse.data.access_token);
          const _token = loginResponse.data.access_token;
      
          // Fetch user profile
          const responseProfile = await axios.post("/api/me", { token: _token });
      
          if (responseProfile.data.data.verify_at == null) {
            setTempUser(responseProfile.data.data);
      
            // Request OTP
            const profileResponse = await axios.post("/api/request-otp", { token: _token });
      
            if (profileResponse.status === 200 && profileResponse.data.status === "success") {
              setOtp('');
              setRefCode(profileResponse.data.ref);
              setStep(2);
            } else {
              throw new Error("Request OTP failed");
            }
          } else {
            setUser(responseProfile.data.data);
            const prevPath = sessionStorage.getItem('prevPath') || '/';
            router.push(prevPath);
            sessionStorage.removeItem('prevPath');
          }
        }
        

      } catch (e) {
        console.error(e);
        setIsOpenWarning(true);
        settextWarning('กรุณาตรวจสอบ ท่านเป็นสมาชิกอยู่แล้ว')

        //alert("ไม่พบข้อมูลของท่าน");
      }
      
    }
    setIsLoading(false);
  };

  const handleOtp = (value) => {
    setOtp(value);
    if (value === "") {
      setValidateOtp(false);
    } else {
      setValidateOtp(true);
    }
  };

  const onClickSubmitOtp = async () => {
    setIsLoading(true);
    otp === "" ? setValidateOtp(false) : "";

    if (validateOtp) {
      try {
        await axios
          .post("/api/otp-verify", { code: otp, ref: refCode, token })
          .then((responseVerify) => {
            if (
              responseVerify.status === 200 &&
              responseVerify.data.data.status === "success"
            ) {
              setUser(tempUser);
              const prevPath = sessionStorage.getItem('prevPath') || '/';
              router.push(prevPath);
              sessionStorage.removeItem('prevPath');

            } else {
              setIsOpenWarning(true);
              settextWarning('กรุณาตรวจสอบเลข OTP');
              throw new Error("vertify otp failed");
              
            }
          });
      } catch (e) {
        console.log("ERROR : ", e);
        //alert(e.response?.data.message);
        setIsOpenWarning(true);
        settextWarning('กรุณาตรวจสอบเลข OTP')
      }
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบแบบไม่ลงทะเบียน </title>
      </Head>


      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />


      <TemplateLogin
        title="ซื้อเลยไม่ลงทะเบียน"
        subTitle="กรอกเบอร์โทรศัพท์ของคุณเพื่อยืนยัน OTP ทาง SMS"
      >
        {step === 1 ? (
        <>
          <div className="flex flex-col gap-y-4">
            <InputCheck
              type="text"
              title="เบอร์โทรศัพท์"
              placeholderBottom="โปรดกรอกเบอร์โทรศัพท์"
              valid={validateTelephoneNumber}
              onChange={handleTelephoneNumber}
              onKeyPress
              maxlength="10"
              name="mobile"
            />

            

          

            <ButtonBrown
              isLoading={isLoading}
              text="เข้าสู่ระบบ"
              onClick={onClickSubmit}
            />
          </div>
          
        </>
        ) : (
          
          <div className="flex flex-col gap-y-4">
            <InputCheck
              type="text"
              title={
                <>
                  ยืนยันรหัส โปรดกรอกรหัส OTP (REF: {refCode.toUpperCase()})
                  <br />
                  ที่ได้รับทาง SMS ที่
                  {telephoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, "$1-XXX-$3")}
                </>
              }
              placeholder="รหัส OTP"
              placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
              name="otp"
              maxlength={10}
              initialValue=""
              value={otp}
              valid={validateOtp}
              onChange={handleOtp}
              
            />

            <ButtonBrown
              isLoading={isLoading}
              text="ยืนยัน OTP"
              onClick={onClickSubmitOtp}
            />

          </div>
        ) }

      </TemplateLogin>
    </>
  );
}
