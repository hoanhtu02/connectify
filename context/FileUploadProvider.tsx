import { createContext, Dispatch, SetStateAction, useState } from "react";
type ContextValueType = {
  uploads: FileUpload[];
  setUploads: Dispatch<SetStateAction<FileUpload[]>>;
};

export interface FileUpload {
  id: string;
  file: File;
  progress: number;
  status: "uploading" | "completed" | "error";
  preview: string | null;
}
const contextValue: ContextValueType = {
  uploads: [],
  setUploads: () => {},
};
export const FileUploadContext = createContext(contextValue);

function FileUploadProvider({ children }: any) {
  const [uploads, setUploads] = useState<FileUpload[]>([]);
  return (
    <FileUploadContext.Provider
      value={{
        uploads,
        setUploads,
      }}
    >
      {children}
    </FileUploadContext.Provider>
  );
}

export default FileUploadProvider;
