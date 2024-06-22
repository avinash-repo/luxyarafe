import * as Yup from "yup";

export const saveAddressSchema = Yup.object({
  full_name: Yup.string().min(3).required("Full Name is required"),
  country: Yup.string().min(3).required("Country is required"),
  state: Yup.string().min(2).required("State is required"),
  city: Yup.string().min(3).required("City is required"),
  zipcode: Yup.string().min(5).required("Zipcode is required"),
  house_no: Yup.string().min(3).max(10),
  address: Yup.string().min(10).required("Address is required"),
  landmark: Yup.string().min(3),
  is_default: Yup.boolean(),
});
