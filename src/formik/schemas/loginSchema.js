import * as Yup from "yup";
export const loginSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required").min(8),
  captchaValue: Yup.string().required("Please complete the reCAPTCHA"),
});
