"use client";

import { useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X, Paperclip } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { getFileIcon } from "@/utils/mappingMimeType";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { FileMetadata, setUploads } from "@/lib/features/chat/chatSlice";

export default function CompactMultiImageUploader() {
  const { uploads } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    return () =>
      uploads.forEach(
        (upload) => upload?.url && URL.revokeObjectURL(upload?.url)
      );
  }, [uploads]);

  const simulateUpload = (fileUpload: FileMetadata) => {
    dispatch(setUploads([...uploads, fileUpload]));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (uploads.length >= 4) return;
    const files = event.target.files;
    if (files) {
      const newUploads = Array.from(files).map((file) => ({
        id: Math.random().toString(36),
        name: file.name,
        size: file.size,
        type: file.type,
        status: "uploading" as const,
        url: file.type.includes("image/") ? URL.createObjectURL(file) : null,
      })) as FileMetadata[];
      dispatch(setUploads([...uploads, ...newUploads]));
      newUploads.forEach(simulateUpload);
    }
  };
  const removeUpload = (id: string) => {
    const newUploads = uploads.filter((upload) => upload.id !== id);
    dispatch(setUploads(newUploads));
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
                {upload.url ? (
                  <img
                    src={upload.url}
                    alt={`Preview of ${upload.name}`}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    {getFileIcon(upload.type)}
                  </div>
                )}
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => removeUpload(upload.id)}
                    className="text-white p-1 rounded-full hover:bg-white hover:bg-opacity-20"
                    aria-label={`Remove ${upload.name}`}
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
