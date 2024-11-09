import useFileUpload from "@/hooks/useFileUpload";
import { getFileIcon } from "@/utils/mappingMimeType";
import { Attachment } from "@prisma/client";
import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { useEffect, Dispatch, SetStateAction } from "react";
import LoadingData from "../loading/Loading";
import { Progress } from "../ui/progress";
import { FileUpload } from "@/context/FileUploadProvider";

type FilePreviewProps = {
  attachment: Attachment | null;
  file: FileUpload | null;
  messageId: string;
  setMessageUpload?: Dispatch<SetStateAction<FileUpload[]>>;
};

function FilePreview({
  attachment,
  file,
  messageId,
  setMessageUpload,
}: Readonly<FilePreviewProps>) {
  const { upload, status, progressUpload } = useFileUpload();
  const handleUpload = async () => {
    if (file && messageId) {
      try {
        const newAttachment = await upload(file.file, messageId);
        if (newAttachment) {
          setMessageUpload?.((prev) =>
            prev.map((a) =>
              a.id === file.id
                ? {
                    ...a,
                    status: "completed",
                    attachmentId: newAttachment.id,
                    Attachment: newAttachment,
                  }
                : a
            )
          );
        }
      } catch (error) {
        console.error("Upload failed", error);
        setMessageUpload?.((prev) =>
          prev.map((a) => (a.id === file.id ? { ...a, status: "error" } : a))
        );
      }
    }
  };
  useEffect(() => {
    handleUpload();
  }, [file, messageId, upload]);

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
        {getFileIcon(attachment?.mime ?? "")}
      </div>
      {/* <div className="flex gap-5 items-center">
        <div className="flex flex-col leading-none gap-1">
          <span className="truncate max-w-[200px]">{attachment?.name}</span>
          <small className="font-extralight">{attachment?.mime}</small>
        </div>
        <div className="flex gap-2">
          <Link href={"#"}>
            <Eye size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
          <Link href={attachment?.fileUrl} download>
            <Download size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
        </div>
      </div> */}
    </div>
  );
}

export default FilePreview;
