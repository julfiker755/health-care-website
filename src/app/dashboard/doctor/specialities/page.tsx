"use client";
import {
  DroupdownActions,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Button, TableCell, TableRow } from "@/components/ui";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { PlaceholderImg } from "@/lib/utils";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/shared/from";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShowToast } from "@/helpers";
import useConfirmation from "@/components/context/delete-modal";
import { MultiSelect } from "@/components/reusable/mutiple-select/page";
import {
  useCreateDoctorSpecialtyMutation,
  useDeleteDoctorSpecialtyMutation,
  useGetDoctorSpecialtyQuery,
} from "@/redux/api/doctorApi";

type SelectOptionProps = {
  label: string;
  value: string;
};

export default function Specialities() {
  const { confirm } = useConfirmation();
  const [selectOption, setSelectOption] = useState<SelectOptionProps[]>([]);
  const { data: specialities, isLoading: specialitiesLoading } =
    useGetDoctorSpecialtyQuery({});
  const { data } = useGetAllSpecialitiesQuery({});
  const [deleteDoctorSpecialty] = useDeleteDoctorSpecialtyMutation();
  const [createDoctorSpecialty, { isLoading: specialtyLoading, isSuccess }] =
    useCreateDoctorSpecialtyMutation();
  const headers = ["Scrial", "Icon", "Specialty", "Action"];
  const addFrom = useForm({
    defaultValues: {
      specialitiesId: null,
    },
  });

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      const res = await deleteDoctorSpecialty(id).unwrap();
      if (res?.id) {
        ShowToast({
          type: "success",
          title: "Delete Successful",
          description: "You have Specialty delete successfully",
        });
      }
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    const res = await createDoctorSpecialty(values).unwrap();
    if (res?.id) {
      addFrom.reset();
    }
  };

  useEffect(() => {
    if (data?.specialities && specialities) {
      const menuOption = data.specialities.filter(
        (item: any) => !specialities.some((spec: any) => spec.id === item.id)
      );
      const formattedOptions = menuOption.map((item: any) => ({
        label: item.title,
        value: item.id,
      }));
      setSelectOption(formattedOptions);
    }
  }, [data?.specialities, specialities, isSuccess]);

  return (
    <div>
      <Table
        headers={headers}
        title="All Specialities"
        description="Manage your specialities and view their details"
        rightSec={
          <div className="mt-2 lg:mt-0">
            <Form
              from={addFrom}
              onSubmit={handleSubmit}
              className="flex lg:space-x-2 flex-col lg:flex-row"
            >
              <MultiSelect
                name="specialitiesId"
                placeholder="Select Specialities"
                className="h-[30px]"
                options={selectOption}
              />

              <div className="flex gap-x-2 mt-2 lg:mt-0">
                <Button
                  disabled={specialtyLoading}
                  className="w-fit h-[30px] py-0"
                >
                  Create
                </Button>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    addFrom.reset({ specialitiesId: null });
                  }}
                  variant={"danger"}
                  className="w-fit h-[30px] py-0"
                >
                  Reset
                </Button>
              </div>
            </Form>
          </div>
        }
      >
        {specialitiesLoading ? (
          <TableSkeleton colSpan={headers?.length} />
        ) : !!specialities?.length ? (
          specialities?.map((item: any, index: any) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <div className="size-[30px]">
                  <Image
                    className="w-full h-full rounded-sm"
                    src={
                      item.icon !== null
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.icon}`
                        : PlaceholderImg()
                    }
                    width={30}
                    height={100}
                    alt={index?.toString() + "-icon"}
                    style={{
                      width: "30px",
                    }}
                  />
                </div>
              </TableCell>
              <TableCell>{item.title}</TableCell>
              <TableCell>
                <DroupdownActions
                  actions={[
                    {
                      type: "button",
                      label: "Delete",
                      onClick: () => handleDelete(item.id),
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableNoItem colSpan={headers?.length} />
        )}
      </Table>
    </div>
  );
}
