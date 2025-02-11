import { z } from "zod";

// authSchema
export const authSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please valid email"),
  password: z.string().min(6, "Password is required"),
});

// forgotSchema
export const forgotSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please valid email"),
});

// resetSchema
export const resetSchema = z
  .object({
    new_password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.new_password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match.",
  });

  // registerSchema
export const registerSchema = z
  .object({
    name:z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Please valid email"),
    password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm is required"),
    contactNumber:z.string().nonempty("Contact is required"),
    gender:z.string().nonempty("Gender is required")
  })
  .refine((value) => value.password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match.",
  });

// specialitiesSchema
  export const specialitiesSchema =z.object({
    title: z.string().nonempty("Title is required"),
    file:z.any().optional(),
  });

// doctorSchema
  export const doctorSchema = z.object({
    password: z.string().nonempty("Password is required"),
    name: z.string().nonempty("Name is required"),
    email: z.string().nonempty("Email is required").email("Please enter a valid email"),
    contactNumber: z
      .string()
      .nonempty("Contact Number is required")
      .transform((val) => Number(val) || 0),
    address: z.string().nonempty("Address is required"),
    registrationNumber: z.string().nonempty("Registration Number is required"),
    experience: z
      .string()
      .nonempty("Experience is required")
      .transform((val) => Number(val) || 0),
    gender: z.string().nonempty("Gender is required"),
    appointmentFee: z
      .string()
      .nonempty("Appointment Fee is required")
      .transform((val) => Number(val) || 0),
    qualification: z.string().nonempty("Qualification is required"),
    currentWorkingPlace: z.string().nonempty("Current Working Place is required"),
    designation: z.string().nonempty("Designation is required"),
  });
  
