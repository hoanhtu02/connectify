"use client";
import { Attachment } from "@prisma/client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useMemo,
  useState,
} from "react";
type ContextValueType = {
  uploads: FileUpload[];
  setUploads: Dispatch<SetStateAction<FileUpload[]>>;
};

export type FileUpload = {
  id: string;
  messageId?: string;
  file: File;
  attachmentId?: string;
  Attachment?: Attachment;
  progress: number;
  status: "uploading" | "completed" | "error";
  preview: string | null;
};
const contextValue: ContextValueType = {
  uploads: [],
  setUploads: () => {},
};

export const FileUploadContext = createContext(contextValue);

function FileUploadProvider({ children }: any) {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  const value = useMemo(() => ({ uploads, setUploads }), [uploads, setUploads]);

  return (
    <FileUploadContext.Provider value={value}>
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadProvider;
