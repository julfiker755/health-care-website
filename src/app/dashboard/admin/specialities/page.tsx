"use client";
import { DroupdownActions, Table, TableNoItem, TableSkeleton } from "@/components/reusable";
import { Button, Input, TableCell, TableRow } from "@/components/ui";
import { useGetAllSpecialitiesQuery } from "@/redux/api/specialitiesApi";
import { formatDate } from "@/lib/utils";
import Image from "next/image";


export default function Specialities() {
  const { data: specialities, isLoading } = useGetAllSpecialitiesQuery({});
  const headers = ["Scrial", "Icon", "Title", "createdAt", "Action"];


const  handleDelete=(id:string)=>{
    console.log(id)
  }
  return (
    <div>
      <ul className="flex justify-between items-center">
        <li>
          <Input placeholder="Search Specialities"></Input>
        </li>
        <li>
          <Button>Add Specialitie</Button>
        </li>
      </ul>
      <div>
        <Table className="mt-8" headers={headers}>
          {isLoading ? (
            <TableSkeleton colSpan={headers?.length} />
          ) : !!specialities?.length ? (
            specialities?.map((item: any, index: any) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <Image
                    className="w-full h-full"
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${item.icon}`}
                    width={30}
                    height={100}
                    alt="image in picture"
                    style={{
                      width: "30px",
                    }}
                  ></Image>
                </TableCell>
                <TableCell>{item.title}</TableCell>
                <TableCell>{formatDate(item.createdAt)}</TableCell>
                <TableCell>
                <DroupdownActions
                      actions={[
                        { type: 'link', label: 'View', to: `/admin/offer/view/${item?.id}` },
                        { type: 'button', label: 'Delete', onClick: () => handleDelete(item.id) },
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
    </div>
  );
}
