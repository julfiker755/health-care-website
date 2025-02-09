"use client";
import {
  DroupdownActions,
  FileInput,
  FromInput,
  Pagination,
  SheetDrawer,
  Table,
  TableNoItem,
  TableSkeleton,
} from "@/components/reusable";
import { Button, Input, TableCell, TableRow } from "@/components/ui";
import {
  useCreateSpecialitiesMutation,
  useDeleteSpecialitiesMutation,
  useGetAllSpecialitiesQuery,
  useUpdateSpecialitiesMutation,
} from "@/redux/api/specialitiesApi";
import { formatDate, modifyPayload } from "@/lib/utils";
import { FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Form from "@/components/shared/from";
import { specialitiesSchema } from "@/types";
import { useDebonunced } from "@/redux/hooks";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ShowToast } from "@/helpers";
import { useConfirmation } from "@/components/common";


interface SpecialityProps {
  id:string;
  title: string;
  file?: string;
}


export default function Specialities() {
  const {confirm}=useConfirmation()
  const [search, setSearch] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isPage, setIsPage] = useState<number>(1);
  const [updateData,UpdateData]=useState<SpecialityProps | null>(null)
  const query: Record<string, any> = { page: isPage };
  const debouncedTerm = useDebonunced({ searchQuery: search, delay: 600 });
  if (!!debouncedTerm) query["search"] = search;
  const { data, isLoading } = useGetAllSpecialitiesQuery({
    ...query,
  });
  const [createSpecialities, { isLoading: createLoading }] =
    useCreateSpecialitiesMutation();
  const [updateSpecialities, { isLoading:updateLoading}] =
  useUpdateSpecialitiesMutation();
  const [deleteSpecialities]=useDeleteSpecialitiesMutation()
  const headers = ["Scrial", "Icon", "Title", "createdAt", "Action"];

  const handleDelete = async (id: string) => {
    const confirmed = await confirm();
        if (confirmed) {
          const res=await deleteSpecialities(id).unwrap()
          if (res?.id) {
            ShowToast({
              type: "success",
              title: "Delete Successful",
              description: "You have Specialities delete successfully",
            });
          }
        }
  };

  // Store Specialities
  const addFrom = useForm({
    resolver: zodResolver(specialitiesSchema),
    defaultValues: {
      title: "",
      file: "",
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    const res = await createSpecialities(data).unwrap();
    if (res?.id) {
      ShowToast({
        type: "success",
        title: "Store Successful",
        description: "You have Specialities Store successfully",
      });
      setIsOpen(!isOpen);
      addFrom.reset();
    }
  };

  // Edit Specialities
  const editFrom = useForm({
    resolver: zodResolver(specialitiesSchema),
    defaultValues: {
      title:"",
      file: "",
    },
  });

  useEffect(()=>{
    editFrom.reset({
      title:updateData?.title
    })
  },[updateData,editFrom])
  // handleEdit
  const handleEdit = async (values: FieldValues) => {
    const data=modifyPayload(values)
    const res=await updateSpecialities({id:updateData?.id,data}).unwrap()
    if(res?.id){
      ShowToast({
        type: "success",
        title: "Edit Successful",
        description: "You have Specialities Edit successfully",
      });
      UpdateData(null)
      setIsEdit(false)
      editFrom.reset()
    }
  };
 

  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search Specialities"
          ></Input>
        </li>
        <li>
          <Button onClick={() => setIsOpen(true)}>Add Specialty</Button>
        </li>
      </ul>
      <div>
        <Table
          className="mt-8"
          headers={headers}
          pagination={
            data?.meta?.total > data?.meta?.limit && (
              <Pagination
                page={isPage}
                totalPage={data?.meta?.total}
                onPageChange={setIsPage}
                per_page={data?.meta?.limit}
              />
            )
          }
        >
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!data?.specialities?.length ? (
            data?.specialities?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    className="w-full h-full rounded-sm"
                    src={
                      item.icon !== null
                        ? `${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.icon}`
                        : "https://placehold.co/600x400.png"
                    }
                    width={30}
                    height={100}
                    alt={index?.toString() + "-icon"}
                    style={{
                      width: "30px",
                    }}
                  />
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                  <DroupdownActions
                    actions={[
                      {
                        type: "button",
                        label: "Update",
                        onClick: () =>{
                          UpdateData(item)
                          setIsEdit(true)
                        }
                      },
                      {
                        type: "button",
                        label: "Delete",
                        onClick: () => handleDelete(item.id)
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
      {/* Add Specialities */}
      <SheetDrawer
        title="Add Specialty"
        description="Please fill in the required information to add a new specialty"
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      >
        <Form from={addFrom} onSubmit={handleSubmit}>
          <div className="space-y-3">
            <FromInput
              label="Title"
              name="title"
              placeholder="Enter your title"
            ></FromInput>
            <FileInput
              className="py-1 px-2"
              label="Icon"
              name="file"
              placeholder="Enter your icon"
            ></FileInput>
            <div className="flex justify-end">
              <Button disabled={createLoading} className="w-fit">
                Submit
              </Button>
            </div>
          </div>
        </Form>
      </SheetDrawer>
      {/* Edit Specialities */}
      <SheetDrawer
        title="Edit Specialty"
        description="Please fill in the required information to Edit a new specialty"
        isOpen={isEdit}
        setIsOpen={setIsEdit}
      >
        <Form from={editFrom} onSubmit={handleEdit}>
          <div className="space-y-3">
            <FromInput
              label="Title"
              name="title"
              placeholder="Enter your title"
            ></FromInput>
            <FileInput
              className="py-1 px-2"
              label="Icon"
              name="file"
              placeholder="Enter your icon"
            ></FileInput>
            <div className="flex justify-end">
              <Button disabled={updateLoading} className="w-fit">Submit</Button>
            </div>
          </div>
        </Form>
      </SheetDrawer>
    </div>
  );
}
