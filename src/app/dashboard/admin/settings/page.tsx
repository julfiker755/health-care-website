"use client";
import { FileInput, FromInput, SingleSelect } from "@/components/reusable";
import TabMenu from "@/components/views/dashboard/common-panel/tab-menu";
import { modifyPayload, PlaceholderImg } from "@/lib/utils";
import {
  useGetSingleProfileQuery,
  useUpdatePasswordMutation,
} from "@/redux/api/commonApi";
import React, { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/shared/from";
import { Button, Skeleton } from "@/components/ui";
import { useUpdateDoctorMutation } from "@/redux/api/adminApi";
import { ShowToast } from "@/helpers";
import Image from "next/image";
import { changeSchema } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccessAuthInfo } from "@/services/auth.services";

export default function Settings() {
  const { data: user, isLoading } = useGetSingleProfileQuery({});
  const [updateDoctor, { isLoading: saveloading }] = useUpdateDoctorMutation();
  const [updatePassword, { isLoading: updateLoading }] =
    useUpdatePasswordMutation();
  const [isTab, setIsTab] = useState("Profile");
  const ProfileFrom = useForm({
    defaultValues: {
      name: "",
      email: "",
      contactNumber: "",
      address: "",
      role: "",
      gender: "",
      file: null,
    },
  });

  useEffect(() => {
    ProfileFrom.reset({
      name: user?.name,
      email: user?.email,
      contactNumber: user?.contactNumber,
      address: user?.address,
      role: user?.role,
      gender: user?.gender,
      file: user?.file,
    });
  }, [user, ProfileFrom]);

  const handleSubmit = async (values: FieldValues) => {
    const dataItem = {
      name: values?.name,
      contactNumber: values?.contactNumber,
      address: values?.address,
      gender: values?.gender,
      file: values?.file,
    };
    const data = modifyPayload(dataItem);
    const res = await updateDoctor(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Save Successful",
        description: "You have Profile Save successfully",
      });
      ProfileFrom.reset();
    }
  };

  // change password
  const ChangeFrom = useForm({
    resolver: zodResolver(changeSchema),
    defaultValues: {
      oldPassword: "",
      new_password: "",
      confirm_password: "",
    },
  });

  const handlePassword = async (values: FieldValues) => {
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.new_password,
    };

    const res = await updatePassword(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Update Password",
        description: "You have Update Password successfully",
      });
      ChangeFrom.reset();
    }
  };
  
  AccessAuthInfo()
  return (
    <div>
      <TabMenu
        items={["Profile", "Change Password", "Delete Account"]}
        isTab={isTab}
        setIsTab={setIsTab}
      />
      <div className="mt-4">
        {/* Profile Settings */}
        {isTab.startsWith("Profile") && (
          <div className="border rounded-md p-2">
            <h1 className="text-lg font-medium border-b-[1px] mb-4">
              Profile Settings
            </h1>
            <Form from={ProfileFrom} onSubmit={handleSubmit}>
              <div className="border rounded-md p-2">
                <h1 className="text-base mb-1">Profile Photo</h1>
                <div className="flex gap-x-4 items-center">
                  <div className="w-[150px] lg:w-[90px] h-[90px] border rounded-md">
                    <Image
                      className="w-full h-full rounded-sm"
                      src={
                        user?.profilePhoto !== null
                          ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${user?.profilePhoto}`
                          : PlaceholderImg(200, 200)
                      }
                      width={80}
                      height={100}
                      alt={user?.profilePhoto?.toString() + "123"}
                    />
                  </div>
                  <ul>
                    <li className="text-[#0087BE]">
                      <FileInput
                        className="py-1 rounded-md px-0 border-none"
                        name="file"
                        placeholder="Enter your icon"
                      ></FileInput>
                    </li>
                    <li className="text-gray-500 text-sm">
                      Your Image should Below 5 MB, Accepted format jpg,png,svg
                    </li>
                  </ul>
                </div>
              </div>
              <h1 className="py-3">Information</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
                {isLoading ? (
                  <>
                    {[...Array(6)].map((_, index) => (
                      <div key={index}>
                        <Skeleton className="h-[14px] w-[140px] mt-1" />
                        <Skeleton className="h-8 w-full mt-2" />
                      </div>
                    ))}
                    <div className="col-span-3 flex justify-end">
                      {" "}
                      <Skeleton className="w-[120px] h-8  mt-2" />
                    </div>
                  </>
                ) : (
                  <>
                    <FromInput
                      label="Name"
                      name="name"
                      placeholder="Enter your Name"
                    ></FromInput>
                    <FromInput
                      readOnly={true}
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                    ></FromInput>
                    <FromInput
                      label="Contact Number"
                      name="contactNumber"
                      placeholder="Enter your Contact Number"
                    ></FromInput>
                    <FromInput
                      label="Address"
                      name="address"
                      placeholder="Enter your address"
                    ></FromInput>
                    <FromInput
                      readOnly={true}
                      label="Role"
                      name="role"
                      placeholder="Enter your role"
                    ></FromInput>
                    <SingleSelect
                      items={[
                        { label: "Male", value: "MALE" },
                        { label: "Female", value: "FEMALE" },
                      ]}
                      defaultValue={user?.gender}
                      label="Gender"
                      name="gender"
                      placeholder="Select gender"
                    ></SingleSelect>
                    <div className="col-span-3 flex justify-end mt-4">
                      <Button disabled={saveloading}>Save Changes</Button>
                    </div>
                  </>
                )}
              </div>
            </Form>
          </div>
        )}
        {/* Change Password */}
        {isTab.startsWith("Change") && (
          <div className="border rounded-md p-2">
            <h1 className="text-lg font-medium border-b-[1px]">
              Change Password
            </h1>
            <Form
              className="mt-3 space-y-3 lg:w-1/2"
              from={ChangeFrom}
              onSubmit={handlePassword}
            >
              <FromInput
                eye={true}
                label="Old Password"
                name="oldPassword"
                placeholder="Enter your old password"
              />
              <FromInput
                eye={true}
                label="New Password"
                name="new_password"
                placeholder="Enter your new password"
              />
              <FromInput
                eye={true}
                label="Confirm Password"
                name="confirm_password"
                placeholder="Enter your confirm password"
              />
              <div className="flex justify-end">
                <Button disabled={updateLoading} className="w-fit">
                  Submit
                </Button>
              </div>
            </Form>
          </div>
        )}
        {/* Delete Account */}
        {isTab.startsWith("Delete") && (
          <div className="border rounded-md p-2">
            <h1 className="text-lg font-medium border-b-[1px]">
              Delete Account
            </h1>
            <div className="mt-3">
              <h1 className="text-base font-medium">Are you sure you want to delete your account?</h1>
              <p className="text-sm font-medium text-gray-600 w-1/2">Refers to the action of permanently removing a user&apos;s account and associated data from a system, service and platform.</p>
              <Button className="mt-4">Delete Account</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
