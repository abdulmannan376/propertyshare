import { emailRegex, passwordRegex } from "../regex";
import * as yup from "yup";
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

export const signupSchema = yup.object().shape({
  name: yup
    .string()
    .required("Name is required")
    .matches(/^[a-zA-Z\s]+$/, "Name should only contain letters and spaces")
    .max(50, "Name should not exceed 50 characters"),
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots, and underscores"
    )
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username should not exceed 20 characters"),
  email: yup
    .string()
    .matches(emailRegex, "Invalid email format")
    .required("Email is required"),
  password: yup.string().required("Password is required"),
  confirmPassword: yup
    .string()
    .required("Confirm password is required")
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});

export const primaryDetailsSchema = yup.object().shape({
  name: yup.string().required("Full name is required"),
  gender: yup.string().required("Gender is required"),
  dobString: yup.string().required("Date of birth is required"),
  nicNumber: yup.string().required("NIC Number is required"),
  nationality: yup.string().required("Nationality is required"),
  religion: yup.string().required("Religion is required"),
  bloodGroup: yup.string().optional(),
});

export const contactDetailsSchema = yup.object().shape({
  contact: yup.string().required("Contact is required"),
  permanentAddress: yup.string().required("Permanent address is required"),
});

export const nextOfKinSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  relation: yup.string().required("Relation is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  contact: yup.string().required("Contact is required"),
  nicNumber: yup.string().required("NIC Number is required"),
  dobString: yup.string().required("Date of birth is required"),
});
export const imageUploadSchema = yup.object().shape({
  imageFile: yup
    .mixed()
    .required("An image file is required")
    .test(
      "fileFormat",
      "Unsupported file format. Only JPG, JPEG, PNG, and GIF are allowed.",
      (value) =>
        value &&
        Array.from(value).every((file) => SUPPORTED_FORMATS.includes(file.type))
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size is 2MB.",
      (value) =>
        value && Array.from(value).every((file) => file.size <= 2 * 1024 * 1024) // 2MB limit
    ),
});

export const idCardUploadSchema = yup.object().shape({
  imageFile: yup
    .mixed()
    .required("An image file is required")
    .test(
      "fileFormat",
      "Unsupported file format. Only JPG, JPEG, PNG, and GIF are allowed.",
      (value) => {
        if (!value) {
          console.log("No file provided.");
          return false;
        }
        if (Array.isArray(value)) {
          return value.every((file) => SUPPORTED_FORMATS.includes(file.type));
        }
        return SUPPORTED_FORMATS.includes(value.type);
      }
    )
    .test(
      "fileSize",
      "File size is too large. Maximum size is 2MB.",
      (value) => {
        if (!value) {
          return false;
        }
        if (Array.isArray(value)) {
          return value.every((file) => file.size <= 2 * 1024 * 1024); // 2MB limit
        }
        return value.size <= 2 * 1024 * 1024; // 2MB limit
      }
    ),
});

export const addPropertyformPhase1 = yup.object().shape({
  propertyTitle: yup.string().required("Property Title is required"),
  propertyOverview: yup.string().required("Property Overview is required"),
  totalPrice: yup
    .number()
    .min(1, "Total Price must be greater than 0")
    .required("Total Price is required"),
  areaSize: yup
    .number()
    .min(1, "Area Size must be greater than 0")
    .required("Area Size is required"),
  duration: yup.string().required("Duration is required"),
  propertyType: yup
    .string()
    .notOneOf([""], "Property Type is required")
    .required("Property Type is required"),
  houseNumber: yup
    .string()
    .notOneOf([""], "House Number is required")
    .required("House Number is required"),
  streetNumber: yup.string().required("Street Number is required"),
  zipCode: yup
    .string()
    .notOneOf([""], "Zip Code is required")
    .required("Zip Code is required"),
  country: yup.string().nullable().required("Country is required"),
  stateProvince: yup
    .string()
    .notOneOf([""], "State/Province is required")
    .required("State/Province is required"),
  latitude: yup.number().nullable().required("Latitude is required"),
  longitude: yup.number().nullable().required("Longitude is required"),
});
