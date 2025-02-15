"use client";
import Form from "@/components/shared/from";
import { authSchema } from "@/types/schema";
import { Button, Checkbox } from "@/components/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { ResponseApiErrors, ShowToast } from "@/helpers";
import { FromInput } from "@/components/reusable";
import { setLocalStroage } from "@/lib/utils";
import { authKey, authToken } from "@/contants";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { decodedToken } from "@/services/auth.services";
import useAuth from "@/components/context/auth-info";
import setAuthToken from "@/services/actions/setAuthToken";
import Link from "next/link";

export default function AuthPage() {
  const {setAuthInfo}=useAuth()
  const [userLogin, { isLoading }] = useUserLoginMutation();
  const from = useForm({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const res = await userLogin(values).unwrap();
    if (res?.accessToken) {
      setLocalStroage(authKey, res.accessToken);
      const user = decodedToken(res.accessToken);
      setAuthInfo(user)
      setAuthToken(authToken,res.authToken, {
        route: user.role,
      });
      ShowToast({
        type: "success",
        title: "Login Successful",
        description: "You have successfully logged in",
      });
      from.reset();
    }
    ResponseApiErrors(res, from);
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-3xl font-semibold">Login</h1>
          <p className="text-sm">Enter your email and password below</p>
          <p className="text-sm">to log into your account</p>
        </div>

        <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
          <FromInput
            label="Email"
            name="email"
            placeholder="Enter your email"
          ></FromInput>
          <FromInput
            eye={true}
            label="Password"
            name="password"
            placeholder="Enter your password"
          ></FromInput>
          <ul className="flex justify-between">
            <li className="text-sm flex items-center gap-1">
              <Checkbox />
              Remember Me
            </li>
            <li className="text-sm">
              <Link className="cursor-pointer" href="/auth/forgot-password">
                {" "}
                Forgot Password?
              </Link>
            </li>
          </ul>
          <Button disabled={isLoading} className="w-full">
            Submit
          </Button>
        </Form>
        <p className="text-sm text-center">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-[#1C5B91]">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
