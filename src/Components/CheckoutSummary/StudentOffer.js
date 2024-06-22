import React, { useEffect, useState, useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import styled from "styled-components";
import { InputSchema } from "./InputSchema";
import "./StudentOffer.scss";
import { environmentVar } from "../../config/environmentVar";
import axios from "axios";
import { toast } from "react-toastify";
import { FilterContext } from "../../context/FilterContext";
import AuthContext from "../../context/AuthContext";

const FormInput = styled.input`
  padding: 12px 15px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  border: 1px solid #00000026;
  margin: 1rem 0rem 0.5rem;
`;

const StudentOffer = ({ selectedAddress, zipcode, data }) => {
  const {
    imData,
    studentChecked,
    setImData,
    setStudentChecked,
    setStudentPrice,
    studentPrice,
    setSelectedCoupon,
    setCouponId,
    isForStudent,
    couponId
  } = useContext(FilterContext);

  const { userInfo } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);
  // const [imData, setImData] = useState('');
  const [rerenderKey, setRerenderKey] = useState(0);
  // const [studentChecked, setStudentChecked] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const getStudentPrice = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/delivery/get_data?country_code=${userInfo?.country}`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.data) {
          setStudentPrice(response?.data?.data);
        } else {
          setStudentPrice("");
        }
      })
      .catch((error) => {
        setStudentPrice("");
      });
  };
  const getExistingDetail = () => {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `${environmentVar?.apiUrl}/api/user/education/get`,
      withCredentials: true,
    };

    axios
      .request(config)
      .then((response) => {
        if (response?.data?.data) {
          setImData(response?.data?.data);
          // setStudentChecked(true);
        } else {
          setImData("");
          setStudentChecked(false);
        }
      })
      .catch((error) => {
        setImData("");
        setStudentChecked(false);
      });
  };
  useEffect(() => {
    getExistingDetail();
    if (userInfo) {
      getStudentPrice();
    }
  }, [userInfo]);
  const initialValues = {
    fullName: "",
    studentId: "",
    instituteName: "",
    instituteId: "",
  };
  const handleCheckboxChange = (e) => {
    
    // if (e.target.checked) {
    //   setSelectedCoupon(null);
    //   setCouponId(null)
    // }
   
    if(data?.quantity > 1 ){
      toast.error("You can awail only one product from this category")
      setStudentChecked(false)
    }else if(data?.length){
      const duplicatedVariants = data?.flatMap(
        ({ quantity, is_student, ...rest }) =>
          is_student === 1
            ? Array.from({ length: quantity }, () => ({ quantity: 1, ...rest }))
            : []
      );
      const totalQuantity = duplicatedVariants.reduce((acc, item) => acc + item.quantity, 0);
      
      if(totalQuantity > 1){
        toast.error("You can awail only one product from this category")
        setStudentChecked(false)
        setCouponId(couponId)
      }else{
        
        if (!imData) {
          setShowModal(e.target.checked);
        }else{
          setStudentChecked(e.target.checked);
          setSelectedCoupon(null);
          setCouponId(null)
        }
      }
    }else{
      if (!imData) {
        setShowModal(e.target.checked);        
      }else{
        setStudentChecked(e.target.checked);
      }
      
    }
    
  };
  const onEdit = () => {
    setShowModal(true);
    if (imData) {
      formik.setValues({
        fullName: imData.full_name,
        studentId: imData.id_card_img,
        instituteName: imData.university_name,
        instituteId: imData.university_id,
      });
    }
  };

  const handleCloseModal = () => {
    if (!imData) {
      setStudentChecked(false);
    }
    setShowModal(false);
  };

  let formik = useFormik({
    initialValues: initialValues,
    validationSchema: InputSchema,
    onSubmit: async (values, { resetForm }) => {
      const formdata = new FormData();
      formdata.append("id_card_img", values?.studentId);
      formdata.append("full_name", values?.fullName);
      formdata.append("university_name", values?.instituteName);
      formdata.append("university_id", values?.instituteId);

      let config = {
        method: "post",
        url: `${environmentVar?.apiUrl}/api/user/education/add`,
        withCredentials: true,
        data: formdata,
        // data: data,
      };
      axios
        .request(config)
        .then((response) => {
          toast.success(response.data.message);
          resetForm(); // Reset the form
          
          setShowModal(false);
          
          setRerenderKey((prevKey) => prevKey + 1);
          getExistingDetail();
          setStudentChecked(true)
        })
        .catch((error) => {
          toast.error(error?.response?.data?.message || error?.message, {
            position: toast.POSITION.TOP_RIGHT,
          });
        });
    },
  });

  const { values, errors, handleSubmit, setFieldValue } = formik;

  const handleFileChange = (e) => {
    const file = e.currentTarget.files[0];

    if (file) {
      if (file.size > 500 * 1024) {
        formik.setFieldError(
          "studentId",
          "File size should be less than 500KB"
        );
        return;
      }

      const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
      if (!allowedTypes.includes(file.type)) {
        formik.setFieldError(
          "studentId",
          "File type should be .png, .jpg, or .webp"
        );
        return;
      }

      setFieldValue("studentId", file);
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleCloseModal}
        centered
        dialogClassName="modal-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Student Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formFullName">
              <FormInput
                type="text"
                placeholder="Enter Full Name"
                className="logform-input"
                name="fullName"
                value={values.fullName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.fullName && formik.errors.fullName ? (
                <div style={{ color: "red" }}>{formik.errors.fullName}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="forminstituteName">
              <FormInput
                type="text"
                placeholder="Enter Institute Name"
                className="logform-input"
                name="instituteName"
                value={values.instituteName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.instituteName && formik.errors.instituteName ? (
                <div style={{ color: "red" }}>
                  {formik.errors.instituteName}
                </div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="forminstituteId">
              <FormInput
                type="text"
                placeholder="Enter Institute ID"
                className="logform-input"
                name="instituteId"
                value={values.instituteId}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.instituteId && formik.errors.instituteId ? (
                <div style={{ color: "red" }}>{formik.errors.instituteId}</div>
              ) : null}
            </Form.Group>
            <Form.Group controlId="formStudentId">
              <label for="studentId" class="form-label">
                Upload ID card
              </label>
              <input
                key={rerenderKey}
                class="form-control"
                type="file"
                id="studentId"
                label="Upload Student ID"
                onChange={handleFileChange}
                onBlur={formik.handleBlur}
                custom
              ></input>
              {formik.touched.studentId && formik.errors.studentId ? (
                <div style={{ color: "red" }}>{formik.errors.studentId}</div>
              ) : null}
              {(selectedImage || values?.studentId) && (
                <img
                  className="id-card"
                  src={
                    selectedImage
                      ? selectedImage
                      : `${environmentVar?.cdnUrl}/uploads/educationCertificate/${values?.studentId}`
                  }
                  alt={"ID Card"}
                />
              )}
            </Form.Group>
            <div style={{ textAlign: "right", marginTop: "1rem" }}>
              <Button
                variant="primary"
                className="submit-button"
                onClick={() => handleSubmit()}
              >
                Submit
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
      {isForStudent && (
        <div className="student-offer-card">
          <Form.Check
            key={studentChecked}
            // defaultChecked={studentChecked}
            type="checkbox"
            label="I am a student"
            onChange={handleCheckboxChange}
            checked={studentChecked}
          />
          {imData && (
            <div className="editButton" onClick={onEdit}>
              <span className="badge badge-secondary">Edit</span>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default StudentOffer;
