import React from "react";

const AddAddress = () => {
  return (
    <>
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
    </>
  );
};

export default AddAddress;
