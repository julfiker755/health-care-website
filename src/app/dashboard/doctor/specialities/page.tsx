"use client";
import {
  DroupdownActions,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Button, TableCell, TableRow } from "@/components/ui";
import {
  useDeleteSpecialitiesMutation,
  useGetAllSpecialitiesQuery,
} from "@/redux/api/specialitiesApi";
import { PlaceholderImg } from "@/lib/utils";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/shared/from";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShowToast } from "@/helpers";
import useConfirmation from "@/components/context/delete-modal";
import { MultiSelect } from "@/components/reusable/mutiple-select/page";

interface SpecialityProps {
  id: string;
  title: string;
  file?: string;
}

type SelectOptionProps = {
  label: string;
  value: string;
};

export default function Specialities() {
  const { confirm } = useConfirmation();
  const [selectOption, setSelectOption] = useState<SelectOptionProps[]>([]);
  const { data, isLoading } = useGetAllSpecialitiesQuery({});
  const [deleteSpecialities] = useDeleteSpecialitiesMutation();
  const headers = ["Scrial", "Icon", "Specialty", "Action"];
  const addFrom = useForm({
    defaultValues: {
      specialitiesId: null,
    },
  });

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
    if (confirmed) {
      console.log(id);
      // const res = await deleteSpecialities(id).unwrap();
      // if (res?.id) {
      //   ShowToast({
      //     type: "success",
      //     title: "Delete Successful",
      //     description: "You have Specialities delete successfully",
      //   });
      // }
    }
  };

  const handleSubmit = async (values: FieldValues) => {
    console.log(values);
  };

  useEffect(() => {
    if (data?.specialities) {
      const formattedSpecialities = data?.specialities.map((item: any) => ({
        label: item.title,
        value: item.id,
      }));
      setSelectOption(formattedSpecialities);
    }
  }, [data?.specialities]);

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
                className=""
                options={selectOption}
              />

              <div className="flex gap-x-2 mt-2 lg:mt-0">
                <Button className="w-fit h-[30px] py-0">Submit</Button>
                <Button
                  onClick={() => addFrom.reset({ specialitiesId: null })}
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
        {isLoading ? (
          <TableSkeleton colSpan={headers?.length} />
        ) : !!data?.specialities?.length ? (
          data?.specialities?.map((item: any, index: any) => (
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
