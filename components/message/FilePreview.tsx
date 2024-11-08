import useFileUpload from "@/hooks/useFileUpload";
import { getFileIcon } from "@/utils/mappingMimeType";
import { Attachment } from "@prisma/client";
import { Download, Eye } from "lucide-react";
import Link from "next/link";
import {
  useEffect,
  useCallback,
  useState,
  Dispatch,
  SetStateAction,
} from "react";
import LoadingData from "../loading/Loading";
import { Progress } from "../ui/progress";
import { FileUpload } from "@/context/FileUploadProvider";

type FilePreviewProps = {
  attachment: Attachment | null;
  file: File | null;
  messageId: string;
  setUploads?: Dispatch<SetStateAction<FileUpload[]>>;
};

function FilePreview({
  attachment,
  file,
  messageId,
}: Readonly<FilePreviewProps>) {
  const { upload, status, progressUpload } = useFileUpload();
  const [originalFile, setOriginalFile] = useState<Attachment | null>(
    attachment
  );

  const uploadCallback = useCallback(async () => {
    if (file && messageId) {
      const attachment = (await upload(file, messageId)) as Attachment;
      setOriginalFile(() => attachment);
    }
  }, []);
  useEffect(() => {
    if (originalFile) return;
    uploadCallback();
  }, [originalFile]);
  if (!originalFile) return null;

  return (
    <div className=" relative w-full h-full flex justify-center items-center cursor-pointer">
      <div
        className={`absolute ${
          status === "uploading" ? "flex" : "hidden"
        } flex-col w-full h-full rounded-sm top-0 left-0 bg-white/50 z-10`}
      >
        <LoadingData />
        <Progress value={progressUpload} className="h-1 bg-white " />
      </div>

      <div className="bg-primary/25 p-2 rounded-sm h-20 w-20 flex justify-center items-center ">
        {getFileIcon(originalFile.mime ?? "")}
      </div>
      {/* <div className="flex gap-5 items-center">
        <div className="flex flex-col leading-none gap-1">
          <span className="truncate max-w-[200px]">{originalFile.name}</span>
          <small className="font-extralight">{originalFile.mime}</small>
        </div>
        <div className="flex gap-2">
          <Link href={"#"}>
            <Eye size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
          <Link href={originalFile.fileUrl} download>
            <Download size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default FilePreview;
