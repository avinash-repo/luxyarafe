import React, { useContext, useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import "./AccountInfo.scss";
import PhoneInput from "react-phone-input-2";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../../context/AuthContext";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import { Loader2 } from "../Common/Loader/Loader";
import { useNavigate } from "react-router-dom";
const AccountInfo = () => {
  const { setIsAuth, userInfo, setUserInfo } = useContext(AuthContext);
  const [name, setName] = useState(userInfo?.name);
  const [email, setEmail] = useState(userInfo?.email);
  const [gender, setGender] = useState("mr");
  const [phone, setPhone] = useState(userInfo?.phone);
  const [isSubmit, setIsSubmit] = useState(false);

  const [confirmPass, setConfirmPass] = useState("");
  const [newPass, SetNewPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();
  function validatePassword(password) {
    // Password can be null or empty string
    if (password === null || password === "") {
      return true;
    }

    // Regular expression to enforce password criteria
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]).{8,}$/;

    return passwordRegex.test(password);
  }

  const handleSubmit = () => {
    if (name == undefined || name == null || name == "") {
      setNameError("Name cannot be empty");
      return;
    }
    if(phone){
      if (phone.length < 8) {
        setPhoneError("Mobile Number must be valid");
        return;
      }
    }
   
    if (newPass !== "" && newPass !== null && newPass.length < 8) {
      setPasswordError("Password must be atleast 8 characters long");
      return;
    }
    if (!validatePassword(newPass)) {
      setPasswordError(
        "Password must contain atleast one uppercase, one lowercase, one digit and one symbol"
      );
      return;
    }
    if (newPass != confirmPass) {
      setConfirmPasswordError("Password and confirm does not match");
      return;
    }
    setIsSubmit(true);
    setNameError("");
    setPasswordError("");
    setConfirmPasswordError("");

    axios.defaults.withCredentials = true;

    let data ;
    if(userInfo?.is_social_login){
      data = {
        name : name
      }
    }else{
      data = {
        name: name,
        password: newPass,
        phone: phone,
      };
    }

    
    let config ;
    if(userInfo?.is_social_login){
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/user/update_user_name`,
        withCredentials: true,
        data: data,
      };
    }else{
      config = {
        method: "post",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/user/update_user_details`,
        withCredentials: true,
        data: data,
      };
    }

    axios
      .request(config)
      .then((response) => {
        toast.success("Profile Updated Sussessfully", {
          autoClose: 2000,
        });
        resetData();
        setIsSubmit(false);
       
        if(newPass){
          navigate("/login");
          setIsAuth(false);
          setUserInfo(null);
        }
        
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message || error?.message, {
          autoClose: 2000,
        });
        setIsSubmit(false);
      });
  };
  const resetData = () => {
    setName(name || userInfo?.name);
    setEmail(userInfo?.email);
    setPhone(phone || userInfo?.phone);
    SetNewPass("");
    setConfirmPass("");
  };
  useEffect(() => {
    resetData();
  }, [userInfo]);
  return (
    <>
      <Col md={9}>
        <div className="my-wishlist-main">
          <h1>Edit Account Information</h1>
          <div className="account-info-main">
            <div className="account-info-name">
              <h2>Full Name</h2>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Enter Full name"
                className="w-100"
              />
              {nameError && <div style={{ color: "red" }}>{nameError}</div>}
            </div>
            {/* <div className="account-info-name">
              <h2>Gender</h2>
              <div className="gender-main">
                <div className="gender-radio">
                  <input checked={gender == "mr"} type="radio" placeholder="" />{" "}
                  Mr.
                </div>
                <div className="gender-radio">
                  <input checked={gender == "ms"} type="radio" placeholder="" />{" "}
                  Ms.
                </div>
                <div className="gender-radio">
                  <input checked={gender == "mr"} type="radio" placeholder="" />{" "}
                  Mrs.
                </div>
              </div>
            </div> */}
            <div className="account-info-name relative">
              <h2>Enter Email</h2>
              <input
                disabled={true}
                value={email}
                type="text"
                placeholder=""
                className="w-100"
              />
              <div className="verified-abs">Verified</div>
            </div>
            {
              userInfo?.is_social_login == 1 ? <></> : 
                <>
                <div className="account-info-name">
                <h2>Phone Number</h2>
                <PhoneInput
                  value={phone}
                  onChange={(value, country) => {
                    if (country && country?.dialCode) {
                      const originalNumber = value.slice(country.dialCode.length);
                      setPhone(`+${country.dialCode}-${originalNumber}`);
                    } else {
                      setPhone(value);
                    }
                  }}
                  containerStyle={{
                    border: "1px solid #cecece",
                    borderRadius: "5px",
                  }}
                  className="w-100"
                  country={userInfo?.country || "in"}
                />
                {phoneError && <div style={{ color: "red" }}>{phoneError}</div>}
              </div>
              <div className="account-info-name relative">
                <h2>Enter New Password</h2>
                <input
                  onChange={(e) => SetNewPass(e.target.value)}
                  value={newPass}
                  type={showPassword ? "text" : "password"}
                  placeholder=""
                  className="w-100"
                />

                <FontAwesomeIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="eyeeye"
                  icon={showPassword ? faEyeSlash : faEye}
                />
                {passwordError && (
                  <div style={{ color: "red" }}>{passwordError}</div>
                )}
              </div>
              <div className="account-info-name relative">
                <h2>Confirm New Password</h2>
                <input
                  onChange={(e) => setConfirmPass(e.target.value)}
                  value={confirmPass}
                  type={showPassword2 ? "text" : "password"}
                  placeholder=""
                  className="w-100"
                />
                <FontAwesomeIcon
                  onClick={() => setShowPassword2(!showPassword2)}
                  className="eyeeye"
                  icon={showPassword2 ? faEyeSlash : faEye}
                />
                {confirmPasswordError && (
                  <div style={{ color: "red" }}>{confirmPasswordError}</div>
                )}
              </div>
                </>
            }
            
            <button onClick={handleSubmit} className="button w-100">
              {isSubmit ? <Loader2 size={30} /> : "Submit"}
            </button>
          </div>
        </div>
      </Col>
    </>
  );
};

export default AccountInfo;
