import { z } from "zod";

export const authSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please valid email"),
  password: z.string().min(6, "Password is required"),
});

export const forgotSchema = z.object({
  email: z.string().nonempty("Email is required").email("Please valid email"),
});

export const resetSchema = z
  .object({
    new_password: z.string().nonempty("Password is required"),
    confirm_password: z.string().nonempty("Confirm password is required"),
  })
  .refine((value) => value.new_password === value.confirm_password, {
    path: ["confirm_password"],
    message: "Passwords must be match.",
  });

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
