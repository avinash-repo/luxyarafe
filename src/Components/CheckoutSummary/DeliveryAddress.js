import React, { useContext, useEffect, useRef, useState } from "react";
// import "./Address.scss";
import { faEdit, faTrashAlt } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col } from "react-bootstrap";
import PhoneInput from "react-phone-input-2";
import Swal from "sweetalert2";
import closeIcon from "../../Images/close.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { move, useFormik } from "formik";
import { saveAddressSchema } from "../../formik/schemas/saveAddressSchema.js";
import axios from "axios";
import { environmentVar } from "../../config/environmentVar.js";
import { toast } from "react-toastify";
import Loader from "../Common/Loader/Loader.js";
import "../../Components/Address/Address.scss";
import AuthContext from "../../context/AuthContext.js";
const DeliveryAddress = ({
  zipcode,
  setZipcode,
  setSelectMobile,
  selectedAddress,
  setSelectedAddress,
  setAvailabilityError,
}) => {
  const formRef = useRef();
  const [deliveryAddresses, setDeliveryAddresses] = useState(null);
  const { userInfo } = useContext(AuthContext);
  const [isEdit, setIsEdit] = useState(false);

  const [shippingAvailabilityError, setShippingAvailabilityError] =
    useState("");
  const [isShippingAvailable, setIsShippingAvailable] = useState(false);
  // const [selectedAddress, setSelectedAddress] = useState();
  const checkShippingAvailability = (zipcode) => {
    if (zipcode && zipcode.length == 6) {
      let config = {
        method: "get",
        maxBodyLength: Infinity,
        url: `${environmentVar?.apiUrl}/api/shipping/check_availability/${zipcode}`,
        headers: {},
      };

      axios
        .request(config)
        .then((response) => {
          if (response?.data?.success) {
            setIsShippingAvailable(true);
            setShippingAvailabilityError(response?.data?.message);
          } else {
            setIsShippingAvailable(false);
            setShippingAvailabilityError(response?.data?.message);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setIsShippingAvailable(false);
      setShippingAvailabilityError("");
    }
  };
  const getDeliveryAddresses = () => {
    let config = {
      url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_all_address`,
      method: "get",
      withCredentials: true,
    };
    axios
      .request(config)
      .then((response) => {
        setDeliveryAddresses(response?.data?.data);
        const deFaultAddress = response?.data?.data?.filter(
          (item) => item?.is_default === 1
        );

        setSelectMobile(deFaultAddress?.[0]?.mobile);
        setSelectedAddress(deFaultAddress?.[0]?.id);
        setZipcode(deFaultAddress?.[0]?.zipcode);
      })

      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getDeliveryAddresses();
  }, []);

  // const [addressesData, setAddressesData] = useState(null);
  // const [addressData, setAddressData] = useState(null);

  // const getAllAddresses = () => {
  //   let config = {
  //     method: "get",
  //     maxBodyLength: Infinity,
  //     url: `${environmentVar?.apiUrl}/api/user/user_address/get_user_all_address`,
  //     withCredentials: true,
  //   };

  //   axios
  //     .request(config)
  //     .then((response) => {
  //       setAddressesData(response?.data?.data);
  //     })
  //     .catch((error) => {
  //     });
  // };
  // useEffect(() => {
  //   getAllAddresses();
  // }, []);
  const [mobile, setMobile] = useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [editId, setEditId] = useState(null);
  const [mobileError, setMobileError] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const handleEdit = (id) => {
    const selectedAddress = deliveryAddresses.filter((val) => val.id == id);
    setEditId(id);
    checkShippingAvailability(selectedAddress[0]?.zipcode);
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
    setShowAddAddress(true);
    setIsEdit(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleChangeAddress = () => {
    setShowAddAddress(false);
    setModalShow(true);
  };
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
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
            // getAllAddresses();
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
    country:
      userInfo?.country == "AE"
        ? "uae"
        : userInfo?.country == "IN"
        ? "india"
        : "india",
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
        return;
      }
      if (!isShippingAvailable) {
        toast.error("Shipping not available to entered location");
        return;
      }
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
            getDeliveryAddresses();
            setShowAddAddress(false);
            // getAllAddresses();
            setAvailabilityError("");
            moveToTop();
          })
          .catch((error) => {
            setIsSubmit(false);
            setShowAddAddress(false);
            setAvailabilityError("");
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
            getDeliveryAddresses();
            setMobileError("");
            moveToTop();
            setAvailabilityError("");
            // getAllAddresses();
          })
          .catch((error) => {
            setMobileError("");
            setIsSubmit(false);
            setAvailabilityError("");
            toast.error(error?.response?.data?.message || error?.message, {
              autoClose: 2000,
            });
          });
      }
    },
  });
  const handleAddAddress = () => {
    formik.resetForm();
    setMobile("");
    setIsEdit(false);
    setShowAddAddress(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const handleEditAddress = () => {
    setIsEdit(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };
  const onHide = () => {};
  const ManageDefaultAddress = (value) => {
    let config = {
      method: "put",
      url: `${environmentVar?.apiUrl}/api/user/user_address/changeaddesstodefault?id=${value?.id}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        setSelectedAddress(value?.id);
        setZipcode(value?.zipcode);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Col md={7}>
        <div className="delivery-address-heading-main">
          <h2 className="delivery-address-heading">Delivery address</h2>
          <div
            style={{ cursor: "pointer" }}
            onClick={handleAddAddress}
            className="delivery-address-add"
          >
            Add New Address <span>+</span>
          </div>
        </div>
        {deliveryAddresses &&
          deliveryAddresses.map((val) => {
            // if (val.id == selectedAddress) {
            return (
              <div className="delivery-address-main">
                <div className="delivery-address-check-details">
                  <input
                    checked={selectedAddress == val.id}
                    onClick={() => {
                      ManageDefaultAddress(val);
                    }}
                    type="radio"
                  />
                  <div className="delivery-address-address-details">
                    <h2>{val?.full_name}</h2>
                    <p>
                      {`${val?.house_no}, ${val?.address}, ${val?.city}-${val?.zipcode}, ${val?.state}, ${val?.country}`}
                    </p>
                    {val?.landmark && <p>{`Landmark: ${val?.landmark}`}</p>}
                    <h3>{`Mobile: ${val?.mobile}`}</h3>
                  </div>
                </div>
                <div
                  className="delivery-address-change"
                  style={{ display: "flex", gap: "15px" }}
                >
                  <div
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEdit(val?.id)}
                  >
                    Edit
                  </div>
                  {/* |{" "} */}
                  {/* <div
                      onClick={handleChangeAddress}
                      style={{ cursor: "pointer" }}
                    >
                      Change
                    </div> */}
                </div>
              </div>
            );
            // }
          })}
        <div>
          {" "}
          {/* <Modal
            className="changeaddmodal"
            onHide={() => setModalShow(false)}
            show={modalShow}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Select Address
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="changeaddmodalbody">
              {deliveryAddresses &&
                deliveryAddresses.map((val) => (
                  <div className="delivery-address-main-inner">
                    <div className="delivery-address-check-details">
                      <input
                        checked={selectedAddress == val.id}
                        onClick={() => {
                          setSelectedAddress(val?.id);
                          setZipcode(val?.zipcode);
                        }}
                        type="radio"
                      />
                      <div className="delivery-address-address-details">
                        <h2>{val?.full_name}</h2>
                        <p>
                          {`${val?.house_no}, ${val?.address}, ${val?.city}-${val?.zipcode}, ${val?.state}, ${val?.country}`}
                        </p>
                        {val?.landmark && <p>{`Landmark: ${val?.landmark}`}</p>}
                        <h3>{`Mobile: ${val?.mobile}`}</h3>
                      </div>
                    </div>
                  </div>
                ))}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => setModalShow(false)}>Close</Button>
            </Modal.Footer>
          </Modal> */}
        </div>
        <div style={{ position: "relative" }} ref={formRef}>
          {showAddAddress && (
            <>
              <div id="addform" className="my-wishlist-main">
                <img
                  style={{
                    cursor: "pointer",
                    position: "absolute",
                    right: "30px",
                    width: "20px",
                  }}
                  onClick={() => {
                    setShowAddAddress(false);
                    formik.resetForm();
                    setMobile("");
                    setIsEdit(false);
                  }}
                  alt="close-icon"
                  src={closeIcon}
                />
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
                      <div style={{ color: "red" }}>
                        {formik.errors.full_name}
                      </div>
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
                      <div style={{ color: "red" }}>
                        {formik.errors.country}
                      </div>
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
                      <div style={{ color: "red" }}>
                        {formik.errors.address}
                      </div>
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
                        <div style={{ color: "red" }}>
                          {formik.errors.house_no}
                        </div>
                      ) : null}
                    </div>
                    <div className="account-info-name2 relative">
                      <h2>Zip Code*</h2>
                      <input
                        onChange={formik.handleChange}
                        onInput={(e) =>
                          checkShippingAvailability(e.target.value)
                        }
                        onBlur={formik.handleBlur}
                        value={formik.values.zipcode}
                        name="zipcode"
                        type="text"
                        placeholder="Zip Code"
                        className="w-100-add"
                      />
                      {formik.touched.zipcode && formik.errors.zipcode ? (
                        <div style={{ color: "red" }}>
                          {formik.errors.zipcode}
                        </div>
                      ) : null}
                      {isShippingAvailable == true ? (
                        <>
                          {" "}
                          <div style={{ color: "green" }}>
                            {shippingAvailabilityError}
                          </div>
                        </>
                      ) : (
                        <>
                          {" "}
                          <div style={{ color: "red" }}>
                            {shippingAvailabilityError}
                          </div>
                        </>
                      )}
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
                        <div style={{ color: "red" }}>
                          {formik.errors.state}
                        </div>
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
                      <div style={{ color: "red" }}>
                        {formik.errors.landmark}
                      </div>
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
                          const originalNumber = value.slice(
                            country.dialCode.length
                          );
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
                    {mobileError && (
                      <div style={{ color: "red" }}>{mobileError}</div>
                    )}
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
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </Col>
    </>
  );
};

export default DeliveryAddress;
