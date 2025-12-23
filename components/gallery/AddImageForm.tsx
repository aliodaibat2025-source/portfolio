"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImageUploader from "@/components/imageUpload";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";

interface Props {
  action: (url: string) => Promise<{ status: number; message: string }>;
  initialImage?: string | null;
}

export default function AddImageForm({ action, initialImage = null }: Props) {
  const router = useRouter();
  const [imageUrl, setImageUrl] = useState<string | null>(initialImage);
  const [isUploading, setIsUploading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleUploadComplete = (url: string) => {
    setIsUploading(false);
    setImageUrl(url);
  };

  const handleUploadError = () => {
    setIsUploading(false);
    toast.error("Image upload failed. Please try again.");
  };

  const handleSubmit = () => {
    if (!imageUrl) {
      toast.error("Please upload an image first.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await action(imageUrl);
        if (res.status === 200) {
          toast.success("Image added successfully!");
          setTimeout(() => router.replace("/admin/dashboard/gallery"), 1000);
        } else {
          toast.error(res.message || "Failed to add image.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong.");
      }
    });
  };

  return (
    <main className="ml-3 xl:ml-7 mb-7">
      <div className="flex flex-col justify-start items-start border-b border-gray-500 w-[70vw] mb-7">
        <h1 className="text-lg md:text-2xl font-bold">Add New Image</h1>
      </div>

      <Card className="w-[70vw]">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
          <CardDescription>
            Upload the image you want to add. You can preview it before submitting.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 items-start">
          <ImageUploader
            endpoint="images"
            initialImageUrl={imageUrl}
            onUploadComplete={handleUploadComplete}
            onUploadError={handleUploadError}
            onDelete={() => setImageUrl(null)}
          />

          {imageUrl && (
            <div className="mt-3">
              <Image
                src={imageUrl}
                alt="Preview"
                width={400}
                height={220}
                className="object-cover rounded-lg border border-gray-300"
              />
            </div>
          )}

          <div className="w-full flex justify-center mt-5">
            <div className="flex gap-3">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => router.replace("/admin/dashboard/settings")}
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800"
                disabled={isPending || isUploading}
              >
                {isPending ? "Adding..." : isUploading ? "Uploading..." : "Add Image"}
              </button>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
