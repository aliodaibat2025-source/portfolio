"use client";

import AddImageForm from "@/components/gallery/AddImageForm";
import { AddImageAction } from "../(actions)/addImage";

const handleAddImage = async (url: string) => {
  const payload = { image: url };

  const res = await AddImageAction(payload);

  return {
    status: res.status,
    message: res.message,
  };
};

export default function Page() {
  return (
    <div>
      <AddImageForm action={handleAddImage} />
    </div>
  );
}
