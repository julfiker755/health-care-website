"use client";
import { FromInput } from "@/components/reusable";
import Form from "@/components/shared/from";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, useForm } from "react-hook-form";
import { resetSchema } from "@/types/schema";
import { Button } from "@/components/ui";
import { useRouter} from "next/navigation";
import { decodedToken } from "@/services/auth.services";
import { useEffect, useState } from "react";
import { authKey } from "@/contants";
import { delay, localStroageRemove, setLocalStroage } from "@/lib/utils";
import { useResetPasswordMutation } from "@/redux/api/authApi";
import { ShowToast } from "@/helpers";

export default function ResetPassword() {
  const router = useRouter();
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const from = useForm({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      new_password: "",
      confirm_password: "",
    },
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const tokenParam = searchParams.get("token");
    
    if (tokenParam) {
      setLocalStroage(authKey, tokenParam);
      setTokenInfo(decodedToken(tokenParam));
    }
  }, []);

  const handleSubmit = async (values: FieldValues) => {
    if (!tokenInfo) return;

    const currentTime = Math.floor(Date.now() / 1000);
    if (currentTime > tokenInfo?.exp) {
      ShowToast({
        type: "error",
        title: "Expired",
        description: "Your Link has expired",
      });
      localStroageRemove(authKey);
      await delay(4000);
      router.push("/auth/forgot-password");
      return;
    }

    const data = {
      id: tokenInfo?.id,
      password: values.new_password,
    };
    const res = await resetPassword(data).unwrap();

    if (res?.email) {
      localStroageRemove(authKey);
      await delay(4000);
      from.reset();
      router.push("/auth");
      ShowToast({
        type: "success",
        title: "Change Successful",
        description: "You have successfully changed your password",
      });
    }
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="m-4 lg:m-0 lg:mx-auto flex w-full flex-col backdrop-blur-[10px] justify-center space-y-2 sm:w-[440px] lg:p-5 border p-5 rounded-md">
        <div className="text-center mb-4">
          <h1 className="text-xl lg:text-2xl font-semibold">Change Password</h1>
          <p className="text-sm">Protect your account with a new password</p>
        </div>

        <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
          <FromInput
            eye={true}
            label="New Password"
            name="new_password"
            placeholder="Enter your password"
          />
          <FromInput
            eye={true}
            label="Confirm Password"
            name="confirm_password"
            placeholder="Enter your password"
          />
          <Button disabled={isLoading} className="w-full">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}
