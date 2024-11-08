"use client";

import { useRef, useEffect, useContext } from "react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { X, Paperclip } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { getFileIcon } from "@/utils/mappingMimeType";
import { FileUpload, FileUploadContext } from "@/context/FileUploadProvider";

export default function CompactMultiImageUploader() {
  const { uploads, setUploads } = useContext(FileUploadContext);
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    return () =>
      uploads.forEach(
        (upload) => upload?.preview && URL.revokeObjectURL(upload?.preview)
      );
  }, [uploads]);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uploads.length >= 4) return;
    const files = event.target.files;
    if (files) {
      const newUploads = Array.from(files).map((file) => ({
        id: Math.random().toString(36),
        file,
        progress: 0,
        status: "uploading" as const,
        preview: file.type.includes("image/")
          ? URL.createObjectURL(file)
          : null,
      }));

      setUploads((prevUploads) => [...prevUploads, ...newUploads]);
    }
  };
  const removeUpload = (id: string) => {
    setUploads((currentUploads) => {
      const uploadToRemove = currentUploads.find((upload) => upload.id === id);
      if (uploadToRemove?.preview) URL.revokeObjectURL(uploadToRemove.preview);
      return currentUploads.filter((upload) => upload.id !== id);
    });
  };

  return (
    <div className="flex items-center gap-2 w-full">
      <Label>
        <input
          type="file"
          accept="image/*,.zip,.rar,.7zip"
          multiple
          onChange={handleFileChange}
          className="hidden"
          ref={fileInputRef}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          size="sm"
          variant="ghost"
          className="px-2.5"
          disabled={uploads.some((u) => u.status === "uploading")}
        >
          <Paperclip className="h-4 w-4" />
        </Button>
      </Label>
      <ScrollArea className="flex items-center flex-1 w-10">
        <div className="flex gap-2 items-center justify-stretch flex-nowrap">
          {uploads.map((upload) => (
            <div
              key={upload.id}
              className="relative w-12 shrink-0 rounded-md overflow-hidden"
            >
              <div className="aspect-square relative object-contain from-[#60A9F6] to-[#2A8BF2] bg-gradient-to-r">
                {upload.preview ? (
                  <img
                    src={upload.preview}
                    alt={`Preview of ${upload.file.name}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    {getFileIcon(upload.file?.type)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                    aria-label={`Remove ${upload.file.name}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
