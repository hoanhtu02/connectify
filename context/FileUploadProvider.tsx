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

export interface FileUpload {
  id: string;
  file: File;
  progress: number;
  preview: string | null;
}
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
