"use client";
import { FileInput, FromInput } from "@/components/reusable";
import { Button, Label, Textarea } from "@/components/ui";
import React, { useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Form from "@/components/shared/from";
import "react-quill-new/dist/quill.snow.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { newsSehema } from "@/types";
import { useAiGenerateMutation } from "@/redux/api/aiApi";
import { ShowToast } from "@/helpers";
import { modifyPayload } from "@/lib/utils";
import useAuth from "@/components/context/auth-info";
import { useStoreBlogMutation } from "@/redux/api/blogApi";

export default function BlogStore() {
  const { authInfo } = useAuth();
  const [shorCon, setIsCon] = useState("");
  const [description, setDescription] = useState("");
  const actionRef = useRef<"ai" | "manual" | null>(null);
  const [aiGenerate, { isLoading }] = useAiGenerateMutation();
  const [storeBlog] = useStoreBlogMutation();
  const from = useForm({
    resolver: zodResolver(newsSehema),
    defaultValues: {
      title: "",
      file: null,
    },
  });

  const handleSubmit = async (values: FieldValues) => {
    if (actionRef.current === "ai") {
      const res = await aiGenerate({
        prompt: `${values.title}. 30 word discripation`,
      });
      setIsCon(res.data);
      const res1 = await aiGenerate({
        prompt: `${values.title}. 500 word discripation`,
      });
      setDescription(res1.data);
      //   values
    } else if (actionRef.current === "manual") {
      const Item = {
        emailId: authInfo?.email,
        short_content: shorCon,
        content: description,
        ...values,
      };
      const data = modifyPayload(Item);
      const result = await storeBlog(data).unwrap();
      if (result.id) {
        ShowToast({
          type: "success",
          title: "Store Successful",
          description: "You have successfully Store",
        });
        from.reset();
        setIsCon("");
        setDescription("");
      }
    }

    // Optional: reset the action type
    actionRef.current = null;
  };

  return (
    <div>
      <Form className="space-y-3" from={from} onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <FromInput
            label="Title"
            name="title"
            placeholder="Enter your title"
            className="w-full"
          ></FromInput>
          <div>
            <Label>Image</Label>
            <FileInput
              className="py-1  border"
              name="file"
              placeholder="Enter your icon"
            ></FileInput>
          </div>
        </div>
        <div>
          <Label>Short Description</Label>
          <Textarea
            value={shorCon}
            onChange={(e) => setIsCon(e.target.value)}
            placeholder={"Enter your Short Description "}
          ></Textarea>
        </div>
        <div>
          <Label>Description</Label>
          <Textarea
            value={description}
            cols={5}
            rows={12}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={"Enter your Short Description "}
          ></Textarea>
        </div>

        <div className="flex justify-end gap-4">
          <Button
            variant={"success"}
            disabled={isLoading}
            className="w-fit"
            type="submit"
            onClick={() => (actionRef.current = "ai")}
          >
            Ai Generate
          </Button>
          <Button
            className="w-fit"
            disabled={isLoading}
            type="submit"
            onClick={() => (actionRef.current = "manual")}
          >
            Submit
          </Button>
        </div>
      </Form>
    </div>
  );
}
