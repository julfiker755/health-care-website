import { z } from 'zod'

export const authSchema = z.object({
    email: z.string().email("Name is required"),
    password: z.string().min(6, "Password is required"),
  });
 

 