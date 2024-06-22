import React, { useEffect, useRef, useState } from "react";
import "./Address.scss";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import { move, useFormik } from "formik";
import { saveAddressSchema } from "../../formik/schemas/saveAddressSchema.js";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader.js";
const Address = () => {
  const [addressesData, setAddressesData] = useState(null);
  const [addressData, setAddressData] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState();
  const formRef = useRef();
  const getAllAddresses = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_all_address`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setAddressesData(response?.data?.data);
        const deFaultAddress = response?.data?.data?.filter(
          (item) => item?.is_default === 1
        );
        setSelectedAddress(deFaultAddress?.[0]?.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    getAllAddresses();
  }, []);
  const [mobile, setMobile] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleEdit = (id) => {
    const selectedAddress = addressesData.filter((val) => val.id == id);
    setEditId(id);
    formik.setFieldValue("full_name", selectedAddress[0]?.full_name);
    formik.setFieldValue("country", selectedAddress[0]?.country);
    formik.setFieldValue("state", selectedAddress[0]?.state);
    formik.setFieldValue("city", selectedAddress[0]?.city);
    formik.setFieldValue("address", selectedAddress[0]?.address);
    formik.setFieldValue("house_no", selectedAddress[0]?.house_no);
    formik.setFieldValue("zipcode", selectedAddress[0]?.zipcode);
    formik.setFieldValue("is_default", selectedAddress[0]?.is_default);
    formik.setFieldValue("landmark", selectedAddress[0]?.landmark);
    setMobile(selectedAddress[0]?.mobile);
    setIsEdit(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        let config = {
          method: "delete",
          maxBodyLength: Infinity,
          url: `${environmentVar?.apiUrl}/api/user/user_address/delete_address?id=${id}`,
          withCredentials: true,
        };

        axios
          .request(config)
          .then((response) => {
            getAllAddresses();
            toast.success("Address deleted successfully.", {
              autoClose: 2000,
            });
          })
          .catch((error) => {
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    });
  };
  const initialValues = {
    full_name: "",
    country: "india",
    state: "",
    city: "",
    zipcode: "",
    house_no: "",
    address: "",
    landmark: "",
    is_default: false,
  };
  const moveToTop = () => {
    if (window !== undefined) {
      window.scroll(0, 0);
    }
  };
  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: saveAddressSchema,
    onSubmit: async (values) => {
      if (mobile.length < 10) {
        setMobileError("Invalid mobile number.");
      } else {
        setIsSubmit(true);
        axios.defaults.withCredentials = true;
        let data = {
          ...values,
          mobile,
        };

        if (isEdit) {
          data.id = editId;
          let config = {
            method: "put",
            maxBodyLength: Infinity,
            url: `${environmentVar?.apiUrl}/api/user/user_address/edit_address`,
            withCredentials: true,
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              toast.success("Address updated successfully", {
                autoClose: 2000,
              });
              setIsEdit(false);
              setEditId(null);
              formik.resetForm();
              setMobile("");
              setMobileError("");
              setIsSubmit(false);
              getAllAddresses();
              moveToTop();
            })
            .catch((error) => {
              setIsSubmit(false);
              toast.error(error?.response?.data?.message || error?.message, {
                autoClose: 2000,
              });
            });
        } else {
          let config = {
            method: "post",
            maxBodyLength: Infinity,
            url: `${environmentVar?.apiUrl}/api/user/user_address/add_address`,
            withCredentials: true,
            data: data,
          };

          axios
            .request(config)
            .then((response) => {
              toast.success("Address added successfully.", {
                autoClose: 2000,
              });
              formik.resetForm();
              setMobile("");
              setIsSubmit(false);
              setMobileError("");
              moveToTop();
              getAllAddresses();
            })
            .catch((error) => {
              setMobileError("");
              setIsSubmit(false);
              toast.error(error?.response?.data?.message || error?.message, {
                autoClose: 2000,
              });
            });
        }
      }
    },
  });

  const ManageDefaultAddress = (value) => {
    let config = {
      method: "put",
      url: `${environmentVar?.apiUrl}/api/user/user_address/changeaddesstodefault?id=${value?.id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        getAllAddresses();
        // setSelectedAddress(value?.id);
        // setZipcode(value?.zipcode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Col md={9}>
        <div className="my-address-main">
          <div className="address-header">
            <h1>My Address</h1>
            <h2
              onClick={() => {
                formik.resetForm();
                setMobile("");
                setIsEdit(false);
                formRef.current.scrollIntoView({ behavior: "smooth" });
              }}
            >
              + Add new address
            </h2>
          </div>
          {addressesData &&
            addressesData.length > 0 &&
            addressesData.map((val) => {
              return (
                <div className="address-content">
                  <div className="address-content-left">
                    <div>
                      <input
                        checked={selectedAddress == val.id}
                        className="selector"
                        type="radio"
                        onClick={() => ManageDefaultAddress(val)}
                      />
                    </div>
                    <div className="address">
                      <div>{`To : ${val?.full_name},`}</div>
                      <div>{`${val?.house_no} ${val?.address}, ${val?.city} ${val?.zipcode} (${val?.state}), ${val?.country}`}</div>
                      <div>{`Mobile : ${val?.mobile}`}</div>
                    </div>
                  </div>
                  <div className="address-content-right">
                    <FontAwesomeIcon
                      icon={faEdit}
                      size="2x"
                      onClick={(e) => handleEdit(val.id)}
                      className="edit-icon"
                    />
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      id={val.id}
                      onClick={(e) => handleDelete(val.id)}
                      size="2x"
                      className="delete-icon"
                    />
                  </div>
                </div>
              );
            })}
        </div>

        <div ref={formRef} className="my-wishlist-main">
          <h1>{isEdit ? "Edit Address" : "Add Address"}</h1>
          <div className="account-info-main">
            <div className="account-info-name">
              <h2>Full Name*</h2>
              <input
                name="full_name"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.full_name}
                type="text"
                placeholder="Enter Full name"
                className="w-100-add"
              />
              {formik.touched.full_name && formik.errors.full_name ? (
                <div style={{ color: "red" }}>{formik.errors.full_name}</div>
              ) : null}
            </div>

            <div className="account-info-name relative">
              <h2>Country*</h2>
              {/* <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                type="text"
                name="country"
                placeholder="Country"
                className="w-100-add"
              /> */}
              <select
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.country}
                name="country"
                className="w-100-add"
              >
                <option value="">Select Country</option>
                <option value="india">India</option>
                <option value="uae">UAE</option>
              </select>
              {formik.touched.country && formik.errors.country ? (
                <div style={{ color: "red" }}>{formik.errors.country}</div>
              ) : null}
            </div>
            <div className="account-info-name relative">
              <h2>Address*</h2>
              <input
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.address}
                type="text"
                name="address"
                placeholder="Address"
                className="w-100-add"
              />
              {formik.touched.address && formik.errors.address ? (
                <div style={{ color: "red" }}>{formik.errors.address}</div>
              ) : null}
            </div>

            <div className="account-info-name-main relative">
              <div className="account-info-name2 relative">
                <h2>House No. (optional)</h2>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.house_no}
                  name="house_no"
                  type="text"
                  placeholder="Enter House Number"
                  className="w-100-add"
                />
                {formik.touched.house_no && formik.errors.house_no ? (
                  <div style={{ color: "red" }}>{formik.errors.house_no}</div>
                ) : null}
              </div>
              <div className="account-info-name2 relative">
                <h2>Zip Code*</h2>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.zipcode}
                  name="zipcode"
                  type="text"
                  placeholder="Zip Code"
                  className="w-100-add"
                />
                {formik.touched.zipcode && formik.errors.zipcode ? (
                  <div style={{ color: "red" }}>{formik.errors.zipcode}</div>
                ) : null}
              </div>
            </div>

            <div className="account-info-name-main relative">
              <div className="account-info-name2 relative">
                <h2>City*</h2>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  name="city"
                  type="text"
                  placeholder="City"
                  className="w-100-add"
                />
                {formik.touched.city && formik.errors.city ? (
                  <div style={{ color: "red" }}>{formik.errors.city}</div>
                ) : null}
              </div>
              <div className="account-info-name2 relative">
                <h2>State*</h2>
                <input
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.state}
                  name="state"
                  type="text"
                  placeholder="State"
                  className="w-100-add"
                />
                {formik.touched.state && formik.errors.state ? (
                  <div style={{ color: "red" }}>{formik.errors.state}</div>
                ) : null}
              </div>
            </div>
            <div className="account-info-name">
              <h2>Landmark (optional)</h2>
              <input
                name="landmark"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.landmark}
                type="text"
                placeholder="Enter Landmark"
                className="w-100-add"
              />
              {formik.touched.landmark && formik.errors.landmark ? (
                <div style={{ color: "red" }}>{formik.errors.landmark}</div>
              ) : null}
            </div>
            <div className="account-info-name">
              <h2>Phone Number*</h2>
              <PhoneInput
                onChange={(value, country) => {
                  if (value.length < 10) {
                    setMobileError("Invalid Mobile Number");
                    return;
                  } else {
                    setMobileError("");
                  }
                  if (country && country?.dialCode) {
                    const originalNumber = value.slice(country.dialCode.length);
                    setMobile(`+${country.dialCode}-${originalNumber}`);
                  } else {
                    setMobile(value);
                  }
                }}
                name="mobile"
                containerStyle={{
                  border: "1px solid #cecece",
                  borderRadius: "5px",
                }}
                value={mobile}
                country={"in"}
              />
              {mobileError && <div style={{ color: "red" }}>{mobileError}</div>}
            </div>

            <div className="account-info-check">
              <input
                name="is_default"
                value={formik.values.is_default}
                checked={formik.values.is_default}
                onChange={(e) =>
                  formik.setFieldValue("is_default", e.target.checked)
                }
                onBlur={formik.handleBlur}
                type="checkbox"
              />
              <h2>Set as Default Adddress (optional)</h2>
            </div>

            <div className="add-address-buttons">
              <button
                type="submit"
                onClick={formik.handleSubmit}
                className="button w-100"
              >
                {isSubmit ? <Loader size={30} /> : "Save"}
              </button>
              <button className="light-white-button w-100">Cancel</button>
            </div>
          </div>
        </div>
      </Col>
    </>
  );
};

export default Address;
