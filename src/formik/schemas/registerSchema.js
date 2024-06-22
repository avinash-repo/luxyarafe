import * as Yup from "yup";
export const registerSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .matches(/^[a-zA-Z ]*$/, "Name must contain only alphabets")
    .required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  captchaValue: Yup.string().required("Please complete the reCAPTCHA"),

});
