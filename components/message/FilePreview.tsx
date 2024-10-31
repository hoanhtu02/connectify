import { getFileIcon } from "@/utils/mappingMimeType";
import { Attachment } from "@prisma/client";
import { Download, Eye } from "lucide-react";
import Link from "next/link";
function FilePreview({ attachment }: { readonly attachment: Attachment }) {
  if (!attachment) return null;
  return (
    <div className="flex gap-2 mt-2 items-center">
      <div className="bg-primary/25 p-2 rounded-sm">
        {getFileIcon(attachment.mime ?? "")}
      </div>
      <div className="flex gap-5 items-center">
        <div className="flex flex-col leading-none gap-1">
          <span className="truncate max-w-[200px]">{attachment.name}</span>
          <small className="font-extralight">{attachment.mime}</small>
        </div>
        <div className="flex gap-2">
          <Link href={"#"}>
            <Eye size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
          <Link href={attachment.fileUrl} download>
            <Download size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilePreview;
