import * as yup from "yup";

// ✅ Common Validators
const nameValidator = yup
  .string()
  .trim()
  .min(2, "Must be at least 2 characters")
  .max(50, "Must be at most 50 characters")
  .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed");

const emailValidator = yup
  .string()
  .trim()
  .email("Invalid email format");

const passwordValidator = yup
  .string()
  .min(6, "Password must be at least 6 characters")
  .matches(/\d/, "Password must contain at least one number");

const phoneValidator = yup
  .string()
  .matches(/^[6-9]\d{9}$/, "Must be a valid Indian 10-digit number");

// ✅ Schemas
export const signupSchema = yup.object({
  name: nameValidator.required("Name is required"),
  phone: phoneValidator.required("Phone number is required"),
  email: emailValidator.required("Email is required"),
  password: passwordValidator.required("Password is required"),
});

export const loginSchema = yup.object({
  email: emailValidator.required("Email is required"),
  password: yup.string().required("Password is required"),
});

export const contactSchema = yup.object({
  name: nameValidator.required("Name is required"),
  message: yup
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

export const passwordSchema = yup.object({
  currentPassword: yup.string().required("Current password is required"),
  newPassword: yup
    .string()
    .min(8, "Password must be at least 8 characters")
    .notOneOf(
      [yup.ref("currentPassword")],
      "New password must be different from current password"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

export const addressSchema = yup.object({
  fullName: nameValidator.required("Full name is required"),
  streetAddress: yup.string().trim().required("Street address is required"),
  city: yup.string().trim().required("City is required"),
  state: yup.string().trim().required("State is required"),
  zip: yup.string().trim().required("ZIP code is required"),
  country: yup.string().trim().required("Country is required"),
  phone: phoneValidator.required("Phone number is required"),
  isDefault: yup.boolean(),
});

export const productSchema = yup.object({
  productName: yup.string().trim().required("Product name is required"),
  description: yup.string().trim().required("Description is required"),
  category: yup.string().trim().required("Category is required"),
  mrp: yup
    .number()
    .typeError("MRP must be a number")
    .positive("MRP must be positive")
    .required("MRP is required"),
  purity: yup.string().when("material", {
    is: (material) =>
      ["gold", "silver", "platinum"].includes(material?.toLowerCase()),
    then: (schema) =>
      schema.required("Purity is required for gold, silver, or platinum items"),
    otherwise: (schema) => schema.notRequired(),
  }),
  sellingPrice: yup
    .number()
    .typeError("Selling price must be a number")
    .positive("Selling price must be positive")
    .required("Selling price is required")
    .test(
      "is-less-than-mrp",
      "Selling price must be less than MRP",
      function (value) {
        return value < this.parent.mrp;
      }
    ),
  subcategory: yup.string().trim().required("Subcategory is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .integer("Weight must be an integer")
    .min(1, "Weight must be at least 1")
    .max(5000, "Weight cannot be more than 5000")
    .required("Weight is required"),
  stock: yup
    .number()
    .typeError("Stock must be a number")
    .integer("Must be integer")
    .min(1, "Stock must be at least 1")
    .max(500, "Stock cannot be more than 500")
    .required("Stock is required"),
  occasion: yup.string().trim().required("Occasion is required"),
  warrantyInMonths: yup
    .number()
    .typeError("Warranty must be a number")
    .integer("Warranty must be an integer")
    .min(0, "Warranty cannot be negative")
    .max(12, "Warranty cannot exceed 12 months")
    .required("Warranty is required"),
  isReturnable: yup.boolean(),
  returnPolicyDays: yup
    .number()
    .nullable()
    .transform((value, originalValue) => (originalValue === "" ? null : value))
    .when("isReturnable", {
      is: true,
      then: (schema) =>
        schema
          .typeError("Return days must be a number")
          .integer("Must be integer")
          .min(1, "Return days must be at least 1")
          .max(30, "Return days cannot be more than 30")
          .required("Return days is required when returnable"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const adminLoginSchema = yup.object({
  email: emailValidator.required("Email is required"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
      "Must contain uppercase, lowercase, number and special character"
    ),
});
