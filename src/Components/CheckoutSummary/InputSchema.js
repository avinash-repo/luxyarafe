import * as Yup from "yup";
export const InputSchema = Yup.object({
  fullName: Yup.string().required("Name is required").min(3),
  instituteName: Yup.string().required("Institute name is required").min(3),
  instituteId: Yup.string().required("Institute ID is required").min(3),
  studentId: Yup.string().required("StudentId ID card is required").min(3),
});
