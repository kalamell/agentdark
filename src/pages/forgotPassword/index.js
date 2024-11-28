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

export default function ForgotPassword() {
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [refCode, setRefCode] = useState("");
  const [token, _setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState(null);
  const [tempUser, setTempUser] = useState(null);
  const [textWarning, setTextWarning] = useState('');
  const [isOpenWarning, setIsOpenWarning] = useState(false);

  const router = useRouter();

  const { setToken, setUser, setCom } = useStore();
  

  const handleTelephoneNumber = (value) => {
    setTelephoneNumber(value);
    setValidateTelephoneNumber(true);
  };

  const handlePassword = (value) => {
    setPassword(value);
    setValidatePassword(true);
  };

  useEffect(() => {
    setUser(null);
    setToken(null);
    setCom(null);

    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);


  const [validatePassword, setValidatePassword] = useState(null);
  const [validateCfPassword, setValidateCfPassword] = useState(null);

  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");


  const onClickSubmit = async () => {
    telephoneNumber == "" ? setValidateTelephoneNumber(false) : "";
    setIsLoading(true);
    let _token = '';
    if (telephoneNumber !== "") {

      try {
        
        const loginResponse = await axios.post("/api/forget", { mobile: telephoneNumber });
      
        if (loginResponse.status === 200) {
          setToken(loginResponse.data.access_token);
          _setToken(loginResponse.data.access_token);
          const _token = loginResponse.data.access_token;

          
          const responseProfile = await axios.post("/api/me", { token: _token });
      
          if (loginResponse.data.verify_at == null) {
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
            /*
            setUser(responseProfile.data.data);
            const prevPath = sessionStorage.getItem('prevPath') || '/';
            router.push(prevPath);
            sessionStorage.removeItem('prevPath');
            */
           router.push('/login');
          }
        
        }
        

      } catch (e) {
        console.error(e);
        setIsOpenWarning(true);
        setTextWarning('กรุณาตรวจสอบ ไม่พบข้อมูลการเป็นสมาชิก')

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
              //setUser(tempUser);
              /*const prevPath = sessionStorage.getItem('prevPath') || '/';
              router.push(prevPath);
              sessionStorage.removeItem('prevPath');
              */

              setStep(3);

              

            } else {
              setIsOpenWarning(true);
              setTextWarning('กรุณาตรวจสอบเลข OTP');
              throw new Error("vertify otp failed");
              
            }
          });
      } catch (e) {
        console.log("ERROR : ", e);
        //alert(e.response?.data.message);
        setIsOpenWarning(true);
        setTextWarning('กรุณาตรวจสอบเลข OTP')
      }
    }

    setIsLoading(false);
  };


  const handleCfPassword = (value) => {
    setCfPassword(value);
    if (value !== password) {
      setValidateCfPassword(false);
    } else {
      if (value !== "") {
        checkPassword(value)
          ? setValidateCfPassword(true)
          : setValidateCfPassword(false);
      } else {
        setValidateCfPassword(false);
      }
    }
  };


  const checkPassword = (value) => {
    if (!value.trim()) {
      return false;
    } else if (value.length < 8) {
      return false;
    } else if (!/(?=.*[a-z])/.test(value)) {
      return false;
    } else if (!/(?=.*[A-Z])/.test(value)) {
      return false;
    } else if (!/(?=.*\d)/.test(value)) {
      return false;
    } else if (!/(?=.*[@$!%*#?&])/.test(value)) {
      return false;
    }
    return true;
  };

  const onClickChange = async () => {
    
   
    password == "" ? setValidatePassword(false) : "";
    cfpassword == "" ? setValidateCfPassword(false) : "";

    if (
      validatePassword &&
      validateCfPassword 
    ) {
      //setStep(2);
      try {
        setIsLoading(true);
        
        let registerdata = {
          password,
          password_confirmation: cfpassword,
          token
        };


        await axios
          .post("/api/password", registerdata)
          .then((registerResponse) => {
            console.log('xxxxx', registerResponse);
            
            if (
              registerResponse.status === 200 &&
              registerResponse.data.data.status === "success"
            ) {

              setStep(4);

            } else {
             
              setTextWarning('กรุณาตรวจสอบ ข้อมูลการลงทะเบียน');
              setIsOpenWarning(true);
            }
            
          });
          
      } catch (e) {
        console.log('>>> ; ', e);
        //alert("กรุณาตรวจสอบ มีการลงทะเบียนแล้ว");
        
        setTextWarning('กรุณาตรวจสอบ มีการลงทะเบียนแล้ว');
        setIsOpenWarning(true);
        
      }
    
    }


    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>ลืมรหัสผ่าน</title>
      </Head>


      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />


      <TemplateLogin
        title="ลืมรหัสผ่าน"
        subTitle="กรอกเบอร์โทรศัพท์ของคุณเพื่อยืนยัน OTP ทาง SMS"
      >
        {step === 1 && (
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
        )} 
        { step == 2 && (
          
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
              placeholder=""
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
        )}

        {step === 3 && (
          <>
            <InputCheck
                type="password"
                title="กำหนดรหัสผ่าน"
                valid={validatePassword}
                onChange={handlePassword}
                name="password"
                value={password}
                 placeholderBottom="โปรดกรอกรหัสผ่าน"
                 showCheck={true}
                 maxlength={25}
              />

              <InputCheck
                type="password"
                title="ยืนยันรหัสผ่าน"
                placeholder=""
                placeholderBottom="โปรดกรอกรหัสผ่าน"
                valid={validateCfPassword}
                onChange={handleCfPassword}
                name="cfpassword"
                value={cfpassword}
                showCheck={true}
                password={password}
                maxlength={25}
              />

              <br />

            <ButtonBrown className="mt-4" text="เปลี่ยนรหัสผ่าน" onClick={onClickChange} />
          </>
        )}

        {step === 4 && (
          <>
            <div>
              <p className="font-athitiMedium text-xl text-[#374151] leading-[30px] text-center">
                เปลี่ยนรหัสผ่านเรียบร้อย
                <br />
                ท่านสามารถเข้าใช้งานระบบ <br className="md:hidden" />
                โดยใช้รหัสผ่านใหม่
              </p>
            </div>

            <ButtonBrown
              link="/login"
              text="เข้าสู่ระบบ"
              onClick={onClickSubmit}
            />
          </>
        )}

      </TemplateLogin>
    </>
  );
}
