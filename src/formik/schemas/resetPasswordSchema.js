import * as Yup from "yup";
export const resetPassSchema = Yup.object({
  password: Yup.string()
    .min(8, "Password must be atleast 8 characters")
    .matches(/[a-z]/, "Password must contain atleast one lowercase")
    .matches(/[A-Z]/, "Password must contain atleast one uppercase")
    .matches(/\d/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain atleast one special character"
    )
    .required("Password is required"),
  confirm: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password must match")
    .required("Confirm Password is required"),
});
