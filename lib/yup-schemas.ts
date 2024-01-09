import * as Yup from "yup";
import { nameRegex, emailRegex, passwordRegex, sectionNameRegex, hexColorRegex } from "./regex";

export const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid field")
    .matches(emailRegex)
    .max(60, "Maximum length of 60 symbols is exceeded")
    .required("Field is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    )
    .min(8, "Minimum length of 8 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
});

export const registerSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(nameRegex, "Invalid field")
    .min(2, "Minimum length of 2 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  last_name: Yup.string()
    .matches(nameRegex, "Invalid field")
    .min(2, "Minimum length of 2 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  email: Yup.string()
    .email("Invalid field")
    .max(60, "Maximum length of 60 symbols is exceeded")
    .required("Field is required"),
  password: Yup.string()
    .matches(
      passwordRegex,
      "Required minimum 8 symbol, from which one must be a number and special symbol"
    )
    .min(8, "Minimum length of 8 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), undefined], "Both passwords must match")
    .required("Field is required"),
});

export const projectSchema = Yup.object().shape({
  name: Yup.string()
    .matches(sectionNameRegex, "Invalid field")
    .min(2, "Minimum length of 2 symbols is required")
    .max(40, "Maximum length of 40 symbols is exceeded")
    .required("Field is required"),
  color: Yup.string()
    .matches(hexColorRegex, "Invalid field")
    .max(9, "Maximum length of 9 symbols is exceeded")
    .required("Field is required"),
});

export const labelSchema = Yup.object().shape({
  name: Yup.string()
    .matches(sectionNameRegex, "Invalid field")
    .min(2, "Minimum length of 2 symbols is required")
    .max(20, "Maximum length of 20 symbols is exceeded")
    .required("Field is required"),
});
