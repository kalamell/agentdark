import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InputCheck from "../../app/components/inputCheck";
import TemplateLogin from "@/app/components/templateComponent/login";
import ButtonBrown from "@/app/components/button/btn-brown";

export default function ForgotPassword({ handleKeyPress }) {
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [validateTelephoneNumber, setValidateTelephoneNumber] = useState(null);
  const [step, setStep] = useState(1);

  const [validatePassword, setValidatePassword] = useState(null);
  const [validateCfPassword, setValidateCfPassword] = useState(null);

  const [password, setPassword] = useState("");
  const [cfpassword, setCfPassword] = useState("");

  const handleTelephoneNumber = (value) => {
    setTelephoneNumber(value);
    setValidateTelephoneNumber(true);
  };

  const onClickSubmit = () => {
    telephoneNumber == "" ? setValidateTelephoneNumber(false) : "";
    let _step = step;
    _step++;
    if (_step == 5) {
      _step = 1;
    }
    setStep(_step);
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

  return (
    <TemplateLogin
      title="ลืมรหัสผ่าน"
      subTitle={`${
        step === 1
          ? "กรอกเบอร์โทรศัพท์ของคุณเพื่อยืนยัน OTP ทาง SMS"
          : step === 2
          ? "กรอกรหัส OTP ของคุณ"
          : step === 3 || step === 4
          ? "กำหนดรหัสผ่านใหม่"
          : null
      }`}
    >
      <div className="flex flex-col gap-y-4">
        {step === 1 && (
          <>
            <InputCheck
              type="text"
              title="เบอร์โทรศัพท์"
              placeholderBottom="โปรดกรอกเบอร์โทรศัพท์"
              valid=""
              onChange=""
              onKeyPress
              maxlength="10"
            />

            <ButtonBrown text="รับรหัส OTP" onClick={onClickSubmit} />
          </>
        )}

        {step === 2 && (
          <>
            <InputCheck
              type="text"
              title={
                <>
                  ยืนยันรหัส โปรดกรอกรหัส OTP (REF:SFMAQR)
                  <br /> ที่ได้รับทาง SMS ที่ 083-XXX-5566
                </>
              }
              placeholder="รหัส OTP"
              placeholderBottom="รหัส OTP มีอายุการใช้งาน 5 นาที"
              required={false}
              valid=""
              onChange=""
              onKeyPress
              maxlength="10"
            />
            <ButtonBrown text="ยืนยัน OTP" onClick={onClickSubmit} />
          </>
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

            <ButtonBrown text="เปลี่ยนรหัสผ่าน" onClick={onClickSubmit} />
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
      </div>
    </TemplateLogin>
  );
}
