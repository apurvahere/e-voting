import * as Yup from "yup";

export const voterLoginSchema = Yup.object({
  identityNumber: Yup.string().required("required*").trim(),
  password: Yup.string().required("required*"),
});

export const politicianLoginSchema = Yup.object({
  username: Yup.string().required("Required*").trim(),
  password: Yup.string().required("Required*"),
});

export const voterRegistrationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim(),
  identityNumber: Yup.string().required("Identity number is required").trim(),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  dateOfBirth: Yup.date()
    .max(new Date(Date.now() - 567648000000), "You must be at least 18 years")
    .required("Date of birth is required"),
  image: Yup.mixed().required("Image is required"),
  location: Yup.string().required("Location is required"),
});

export const politicianRegistrationSchema = Yup.object({
  name: Yup.string().required("Name is required").trim(),
  partyName: Yup.string().required("Party name is required").trim(),
  politicianImage: Yup.string().required("Politician image is required").trim(),
  username: Yup.string().required("Username is required"),
  password: Yup.string().required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is required"),
  partySignImage: Yup.string().required("Party sign image is required"),
  standoutArea: Yup.string().required("Standout area is required"),
});
