import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import InputCheck from "../../app/components/inputCheck";
import TemplateLogin from "../../app/components/templateComponent/login";
import useStore from "@/store/store";
import axios from "axios";
import ButtonBrown from "@/app/components/button/btn-brown";
import ButtonLine from "@/app/components/button/btn-line";
import ButtonOutline from "@/app/components/button/btn-outline";
import Head from "next/head";
import Link from "next/link";
import Checkbox from "@/app/components/textComponent/checkbox";
import Warning from "@/app/components/warning";

export default function Register() {
  const router = useRouter();

  const { user, setUser, setOtpRequested, setToken, token } = useStore();
  const [isOpenWarning, setIsOpenWarning] = useState(false);
  const [textWarning, setTextWarning] = useState('');
  const [mobile, setMobile] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");
  const [accept, setAccept] = useState('');

  const [otp, setOtp] = useState("");
  const [refCode, setRefCode] = useState("");
  const [_token, _setToken] = useState("");

  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [validateName, setValidateName] = useState(null);
  const [validateEmail, setValidateEmail] = useState(true);
  const [validatePassword, setValidatePassword] = useState(null);
  const [validateCfPassword, setValidateCfPassword] = useState(null);
  const [validateOtp, setValidateOtp] = useState(null);
  const [validateAccept, setValidateAccept] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check if window and sessionStorage are available
    if (typeof window !== "undefined") {
      // Retrieve data from sessionStorage
      //const _step = sessionStorage.getItem('step') || '1';
      //console.log(_step);
      //setStep(parseInt(_step));
    }
  }, []);

  useEffect(() => {
    if (isOpenWarning) {
      setIsOpenWarning(false);
    }
  }, [isOpenWarning]);

  const [step, setStep] = useState(4);

  const handleTelephoneNumber = (value) => {
    setMobile(value);
    if (!/^\d{10}$/.test(value)) {
      setValidateTelephoneNumber(false);
    } else {
      setValidateTelephoneNumber(true);
    }
  };

  const handleKeyPress = (event) => {
    const charCode = event.charCode;
    // Only allow numbers (0-9) to be typed
    const allowedChars = /[0-9]/;

    if (!allowedChars.test(String.fromCharCode(charCode))) {
      event.preventDefault();
    }
  };

  const handleName = (value) => {
    setName(value);
    if (value !== "") {
      setValidateName(true);
    } else {
      setValidateName(false);
    }
  };

  const handleEmail = (value) => {
    setEmail(value);
    if (value !== "") {
      if (!/\S+@\S+\.\S+/.test(value)) {
        setValidateEmail(false);
      } else {
        setValidateEmail(true);
      }
    } else {
      setValidateEmail(true);
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

  const handlePassword = (value) => {
    setPassword(value);
    if (value !== "") {
      checkPassword(value)
        ? setValidatePassword(true)
        : setValidatePassword(false);
    } else {
      setValidatePassword(false);
    }
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



  const handleOtp = (value) => {
    setOtp(value);
    if (value === "") {
      setValidateOtp(false);
    } else {
      setValidateOtp(true);
    }
  };

  const onClickSubmit = async () => {
    
    mobile == "" ? setValidateTelephoneNumber(false) : "";
    name == "" ? setValidateName(false) : "";

    password == "" ? setValidatePassword(false) : "";
    cfpassword == "" ? setValidateCfPassword(false) : "";

    



    let __token = "";

    console.log(validateName, validateEmail, validateAccept);

    if (
      validateName &&
      validateEmail &&
      validateTelephoneNumber &&
      validatePassword &&
      validateCfPassword && 
      validateAccept
    ) {
      //setStep(2);
      try {
        setIsLoading(true);
        let registerdata = {
          name,
          mobile,
          password,
          password_confirmation: cfpassword,
        };

        if (email != "") {
          registerdata = {
            ...registerdata,
            email,
          };
        }
        await axios
          .post("/api/register", registerdata)
          .then((registerResponse) => {
            console.log(registerResponse);
            if (
              registerResponse.status === 200 &&
              registerResponse.data.status === "success"
            ) {
              return axios.post("/api/login", { username: mobile, password });
            } else {
              setTextWarning('กรุณาตรวจสอบ ข้อมูลการลงทะเบียน');
              setIsOpenWarning(true);
            }
          })
          .then((loginResponse) => {
            if (loginResponse.status === 200) {
              setToken(loginResponse.data.access_token);
              __token = loginResponse.data.access_token;

              return axios.post("/api/request-otp", {
                token: loginResponse.data.access_token,
              });
            } else {
              setTextWarning('กรุณาตรวจสอบข้อมูลการลงทะเบียน');
              setIsOpenWarning(true);
            }
            //console.log('Login successful:', loginResponse.data.user);
          })
          .then((profileResponse) => {
            console.log(profileResponse);
            if (
              profileResponse.status === 200 &&
              profileResponse.data.status === "success"
            ) {
              setRefCode(profileResponse.data.ref);
              //return axios.post('/api/me', { token: __token });
              setStep(2);
            } else {
              //throw new Error("Request OTP failed");
              setTextWarning('กรุณาตรวจสอบ OTP');
              setIsOpenWarning(true);
            }
          });
      } catch (e) {
        //console.log(e);
        //alert("กรุณาตรวจสอบ มีการลงทะเบียนแล้ว");
        setTextWarning('กรุณาตรวจสอบ มีการลงทะเบียนแล้ว');
        setIsOpenWarning(true);
      }
    }

    setIsLoading(false);
  };

  const onClickSubmitOtp = async () => {
    setIsLoading(true);
    otp === "" ? setValidateOtp(false) : "";

    if (validateOtp) {
      try {
        await axios
          .post("/api/otp-verify", { code: otp, ref: refCode, token })
          .then((responseVerify) => {
            console.log(" verify ", responseVerify);
            if (
              responseVerify.status === 200 &&
              responseVerify.data.data.status === "success"
            ) {
              //return axios.post('/api/me', { token });
              console.log(" TOKEN :: ", token);
              setStep(4);
            } else {
              //throw new Error("vertify otp failed");
              setTextWarning('กรุณาตรวจสอบ หมายเลข OTP');
              setIsOpenWarning(true);
            }
          });
      } catch (e) {
        console.log("ERROR : ", e);
        if (e.response?.data.message === "Unauthenticated.") {
          router.push("/");
        } else {
          //alert(e.response?.data.message);
          setTextWarning('กรุณาตรวจสอบ หมายเลข OTP');
          setIsOpenWarning(true);
        }
      }
    }

    setIsLoading(false);
  };

  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
    cfpassword: "",
    accept: ""
  });

  const getProfile = async () => {
    console.log("TOEKN :", token);
    const r = await axios.post("/api/me", { token });
    setUser(r.data.data);

    console.log(r);
    
  };

  useEffect(() => {
    if (token) {
        const fetchProfile = async () => {
            await getProfile();
        };

        fetchProfile();
    }
    
  }, [token]);

  return (
    <>
      <Head>
        <title>สร้างบัญชีผู้ใช้</title>
      </Head>

      <Warning
        id="validateUser"
        isOpenWarning={isOpenWarning}
        textWarning={textWarning}
        closeModel={() => setIsOpenWarning(false)}
      />

      <TemplateLogin title="สร้างบัญชีผู้ใช้งาน">
        <div className="flex flex-col gap-y-4">
          <p className="font-athitiMedium text-base  text-[#808291] text-center">
            {step !== 4 && <>กรอกข้อมูลของคุณเพื่อสมัครสมาชิกใหม่</>}
          </p>
          {step === 1 && (
            <>
              <InputCheck
                type="text"
                title="ชื่อ - นามสกุล"
                placeholderBottom="กรอกชื่อ - นามสกุล"
                onChange={handleName}
                valid={validateName}
                name="name"
                value={name}
              />

              <InputCheck
                type="text"
                title="เบอร์โทรศัพท์"
                placeholderBottom="โปรดกรอกเบอร์โทรศัพท์"
                valid={validateTelephoneNumber}
                onChange={handleTelephoneNumber}
                onKeyPress
                name="mobile"
                maxlength={10}
                value={mobile}
              />

              <InputCheck
                type="text"
                title="อีเมล"
                required={false}
                placeholderBottom=""
                name="email"
                valid={validateEmail}
                onChange={handleEmail}
                value={email}
              />

              <InputCheck
                type="password"
                title="กำหนดรหัสผ่าน"
                valid={validatePassword}
                onChange={handlePassword}
                name="password"
                value={password}
              />

              <InputCheck
                type="password"
                title="ยืนยันรหัสผ่าน"
                placeholder="ยืนยันรหัสผ่านใหม่"
                placeholderBottom={
                  <>
                    โปรดกรอกรหัสผ่านยาว 6-10 ตัวอักษร
                    <br />
                    มีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ และพิมพ์เล็ก
                    <br className="md:hidden" />
                    (A-Z, a-z)
                    <br className="max-md:hidden" />
                    มีตัวเลข (0-9) และอักขระพิเศษ <br className="md:hidden" />
                    (@ $ ! % * # ? &)
                  </>
                }
                valid={validateCfPassword}
                onChange={handleCfPassword}
                name="cfpassword"
                value={cfpassword}
              />
              
              <Checkbox 
              onChange={() => {
                
                if (accept == '') {
                  console.log('accept not defain');
                  setAccept(true);
                  setValidateAccept(true);
                } else {
                  
                  setAccept(false);
                  setValidateAccept(false);
                }

                
              }}
              value={accept}
              valid={validateAccept} 
              text="ฉันได้อ่านและยอมรับใน <a href='/term-and-conditions' target='_blank' style='text-decoration: underline;'>ข้อกำหนดและเงื่อนไข</a> และ <a href='/privacy-policy' target='_blank' style='text-decoration: underline;'>นโยบายความเป็นส่วนตัว</a> " />
              


              <ButtonBrown
                isLoading={isLoading}
                text="สมัครสมาชิก"
                onClick={onClickSubmit}
              />
            </>
          )}
          {step === 2 && (
            <>
              <InputCheck
                type="text"
                title={
                  <>
                    ยืนยันรหัส โปรดกรอกรหัส OTP (REF: {refCode.toUpperCase()})
                    <br />
                    ที่ได้รับทาง SMS ที่
                    {mobile.replace(/(\d{3})(\d{3})(\d{4})/, "$1-XXX-$3")}
                  </>
                }
                placeholder="รหัส OTP"
                placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
                name="otp"
                value={otp}
                valid={validateOtp}
                onChange={handleOtp}
                required={false}
              />

              <ButtonBrown
                isLoading={isLoading}
                text="ยืนยัน OTP"
                onClick={onClickSubmitOtp}
              />
            </>
          )}
          {step === 3 && (
            <>
              <InputCheck
                type="password"
                title="กำหนดรหัสผ่านใหม่"
                placeholder="รหัสผ่านใหม่"
                placeholderBottom={
                  <>
                    โปรดกรอกรหัสผ่านยาว 6-10 ตัวอักษร
                    <br />
                    มีตัวอักษรภาษาอังกฤษพิมพ์ใหญ่ และพิมพ์เล็ก
                    <br className="md:hidden" />
                    (A-Z, a-z)
                    <br className="max-md:hidden" />
                    มีตัวเลข (0-9) และอักขระพิเศษ <br className="md:hidden" />
                    (@ # - ! ,)
                  </>
                }
                valid=""
                onChange={handleTelephoneNumber}
              />

              <InputCheck
                type="password"
                title="ยืนยันรหัสผ่านใหม่"
                placeholder="ยืนยันรหัสผ่านใหม่"
                placeholderBottom=""
                valid={validateTelephoneNumber}
                onChange={handleTelephoneNumber}
              />

              <ButtonBrown
                isLoading={isLoading}
                text="สร้างบัญชีผู้ใช้"
                onClick={onClickSubmit}
              />
            </>
          )}
          {step === 4 && (
            <>
              <p className="font-athitiSemiBold text-[22px] text-[#374151] leading-[30px] text-center">
                ยินดีต้อนรับสู่
                <br className="max-md:hidden" />
                บริการ
                <br className="md:hidden" />
                ด้านการประกันภัยออนไลน์
              </p>

              <p className="font-athitiMedium text-xl text-[#374151] leading-[30px] text-center">
                รับส่วนลดทันที 20%
                <br className="md:hidden" /> สำหรับการซื้อประกันกับเรา
              </p>
              <ButtonLine link={`line://oaMessage/@245prkiq/Confirm%3A${user?.line.code}`} />
              <ButtonBrown
                link="/searchFormCar"
                text="เลือกซื้อประกัน"
              />

              <div className="grid grid-cols-2 gap-x-3 pt-5">
                <ButtonOutline text="กลับไปหน้าค้นหา" link="/searchFormCar" />
                <ButtonOutline text="ประกันของฉัน" link="/myInsurances" />
              </div>
            </>
          )}
        </div>
      </TemplateLogin>
    </>
  );
}
