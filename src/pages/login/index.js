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
import Warning from "../../app/components/warning";

export default function Login() {
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [password, setPassword] = useState("");
  const [validatePassword, setValidatePassword] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [refCode, setRefCode] = useState("");
  const [token, _setToken] = useState("");
  const [otp, setOtp] = useState("");
  const [validateOtp, setValidateOtp] = useState(null);
  const [tempUser, setTempUser] = useState(null);


  const router = useRouter();

  const { setToken, setUser, setCom} = useStore();

  const handleTelephoneNumber = (value) => {
    setTelephoneNumber(value);
    //setValidateTelephoneNumber(true);
  };

  const handlePassword = (value) => {
    setPassword(value);
    //setValidatePassword(true);
  };

  const onClickSubmit = async () => {
    telephoneNumber == "" ? setValidateTelephoneNumber(false) : "";
    password == "" ? setValidatePassword(false) : "";
    setIsLoading(true);
    
    let _token = "";
    if (telephoneNumber !== "" && password !== "") {
      try {
        const loginResponse = await axios.post("/api/login", {
          username: telephoneNumber,
          password,
        });

        if (loginResponse.status === 200) {
          setToken(loginResponse.data.access_token);
          _setToken(loginResponse.data.access_token);
          const _token = loginResponse.data.access_token;

          // Fetch user profile
          const responseProfile = await axios.post("/api/me", {
            token: _token,
          });

          if (responseProfile.data.data.verify_at == null) {
            setTempUser(responseProfile.data.data);
            sessionStorage.setItem("step", 2);

            const profileResponse = await axios.post("/api/request-otp", {
              token: _token,
            });

            if (
              profileResponse.status === 200 &&
              profileResponse.data.status === "success"
            ) {
              setOtp("");
              setRefCode(profileResponse.data.ref);
              setStep(2);
            } else {
              throw new Error("Request OTP failed");
            }
          } else {
            setUser(responseProfile.data.data);
            const prevPath = sessionStorage.getItem("prevPath") || "/";
            router.push(prevPath);
            sessionStorage.removeItem("prevPath");
          }
        }
      } catch (e) {
        console.error(e);
        //alert("ไม่พบข้อมูลของท่าน");
        setIsOpenWarning(true);
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
              const prevPath = sessionStorage.getItem("prevPath") || "/";
              router.push(prevPath);
              sessionStorage.removeItem("prevPath");
            } else {
              throw new Error("vertify otp failed");
            }
          });
      } catch (e) {
        console.log("ERROR : ", e);
        alert(e.response?.data.message);
      }
    }

    setIsLoading(false);
  };

  useEffect(() => {
    setCom(null);
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  return (
    <>
      <Head>
        <title>เข้าสู่ระบบ </title>
      </Head>

      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning="กรุณาตรวจสอบ เบอร์โทรศัพท์และรหัสผ่านอีกครั้ง"
        closeModel={() => setIsOpenWarning(false)}
      />

      <TemplateLogin
        title="เข้าสู่ระบบ"
        subTitle="กรอกเบอร์โทรศัพท์และรหัสผ่านของคุณเพื่อเข้าสู่ระบบ"
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

              <InputCheck
                type="password"
                title="รหัสผ่าน"
                placeholderBottom="โปรดกรอกรหัสผ่าน"
                valid={validatePassword}
                onChange={handlePassword}
                maxlength="30"
                name="password"
              />

              <div className="flex justify-between">
                <Checkbox text="จำฉันไว้" />
                <Link
                  href="/forgotPassword"
                  className="font-athitiMedium text-base text-[#984333] leading-[20px] underline"
                >
                  ลืมรหัสผ่าน
                </Link>
              </div>

              <ButtonBrown
                isLoading={isLoading}
                text="เข้าสู่ระบบ"
                onClick={onClickSubmit}
              />
            </div>
            <div className="flex flex-col">
              <p className="flex mt-[36px] mb-[20px] flex-row font-athitiMedium text-base text-[#6B7280] leading-[20px] before:flex before:flex-1 before:border-solid before:border-b-[1px] before:border-[#D1D5DB] before:content-[''] before:my-auto before:mx-[10px] after:flex after:flex-1 after:border-solid after:border-b-[1px] after:border-[#D1D5DB] after:content-[''] after:my-auto after:mx-[10px]">
                หากคุณยังไม่มีบัญชีผู้ใช้งาน
              </p>
              <div className="grid grid-cols-2 gap-x-3">
                <Link
                  href="/register"
                  className="text-center border border-[#A7A9B8] rounded-lg text-[#181b31cc] font-athitiSemiBold text-sm leading-[16px] py-[9px]"
                >
                  สร้างบัญชีผู้ใช้งาน
                </Link>
                <Link
                  href="/notRegister"
                  className="text-center border border-[#A7A9B8] rounded-lg text-[#181b31cc] font-athitiSemiBold text-sm leading-[16px] py-[9px]"
                >
                  ซื้อเลยไม่ลงทะเบียน
                </Link>
              </div>
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
                  {telephoneNumber.replace(
                    /(\d{3})(\d{3})(\d{4})/,
                    "$1-XXX-$3"
                  )}
                </>
              }
              placeholder="รหัส OTP"
              placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
              name="otp"
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
      </TemplateLogin>
    </>
  );
}
