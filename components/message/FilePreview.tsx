import { Download, Eye } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
function FilePreview({
  icon,
  name,
  size,
}: {
  icon: ReactNode;
  name: string;
  size: number;
}) {
  return (
    <div className="flex gap-2 mt-2 items-center">
      <div className="bg-primary/25 p-2 rounded-sm">{icon}</div>
      <div className="flex gap-5 items-center">
        <div className="flex flex-col leading-none gap-1">
          <span className="truncate max-w-[200px]">{name}</span>
          <small className="font-extralight">{size}</small>
        </div>
        <div className="flex gap-2">
          <Link href={"#"}>
            <Eye size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
          <Link href={"#"}>
            <Download size={25} className="bg-primary/25 p-1 rounded-sm" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default FilePreview;
