import {
  ImageIcon,
  FileJson,
  FileCode,
  FileArchive,
  FileText,
  FileVideo,
  FileAudio,
  FileDigit,
  FileType,
  File,
} from "lucide-react";
import { FaRegFilePdf } from "react-icons/fa6";

function categorizeMimeType(mimeType: string): FileCodeType {
  // Danh sách các MIME types cho file upload
  const codeTypes: string[] = [
    "text/html",
    "text/css",
    "application/javascript",
    "application/x-httpd-php",
    "application/xml",
    "text/javascript",
    "application/x-sh",
    "application/x-httpd-eruby",
  ];

  const jsonTypes: string[] = ["application/json"];
  const pdfTypes: string[] = ["application/pdf"];

  const docsTypes: string[] = [
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", // .xlsx
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation", // .pptx
    "text/markdown",
    "application/rtf",
    "text/csv", // CSV
    "application/vnd.oasis.opendocument.text", // ODT (LibreOffice, OpenOffice)
    "application/vnd.oasis.opendocument.spreadsheet", // ODS
  ];

  const zipTypes: string[] = [
    "application/zip",
    "application/gzip",
    "application/x-tar",
    "application/x-7z-compressed", // 7z compressed
    "application/x-rar-compressed", // RAR compressed
  ];
  const audioTypes: string[] = [
    "audio/mpeg",
    "audio/ogg",
    "audio/wav",
    "audio/aac",
    "audio/flac",
    "audio/webm",
    "audio/x-wav",
    "audio/mp4",
  ];

  const videoTypes: string[] = [
    "video/mp4",
    "video/mpeg",
    "video/ogg",
    "video/webm",
    "video/x-msvideo",
    "video/quicktime",
    "video/x-matroska", // MKV
  ];

  const fontTypes: string[] = [
    "font/otf",
    "font/ttf",
    "font/woff",
    "font/woff2",
    "application/font-sfnt",
    "application/font-woff",
  ];

  const binaryTypes: string[] = [
    "application/octet-stream",
    "application/vnd.microsoft.portable-executable", // .exe files
  ];

  // Phân loại MIME type cho file upload
  if (codeTypes.includes(mimeType)) {
    return FileCodeType.CODE;
  } else if (jsonTypes.includes(mimeType)) {
    return FileCodeType.JSON;
  } else if (pdfTypes.includes(mimeType)) {
    return FileCodeType.PDF;
  } else if (docsTypes.includes(mimeType)) {
    return FileCodeType.DOCS;
  } else if (zipTypes.includes(mimeType)) {
    return FileCodeType.ZIP;
  } else if (audioTypes.includes(mimeType)) {
    return FileCodeType.AUDIO;
  } else if (videoTypes.includes(mimeType)) {
    return FileCodeType.VIDEO;
  } else if (fontTypes.includes(mimeType)) {
    return FileCodeType.FONT;
  } else if (binaryTypes.includes(mimeType)) {
    return FileCodeType.BINARY;
  } else {
    return FileCodeType.OTHER;
  }
}
export enum FileCodeType {
  CODE,
  JSON,
  PDF,
  DOCS,
  ZIP,
  AUDIO,
  VIDEO,
  FONT,
  BINARY,
  OTHER,
}

export const getFileIcon = (fileType: string) => {
  const type = categorizeMimeType(fileType);
  if (fileType.startsWith("image/")) return <ImageIcon className="h-6 w-6" />;
  switch (type) {
    case FileCodeType.PDF:
      return <FaRegFilePdf className="h-6 w-6" />;
    case FileCodeType.JSON:
      return <FileJson className="h-6 w-6" />;
    case FileCodeType.CODE:
      return <FileCode className="h-6 w-6" />;
    case FileCodeType.ZIP:
      return <FileArchive className="h-6 w-6" />;
    case FileCodeType.DOCS:
      return <FileText className="h-6 w-6" />;
    case FileCodeType.VIDEO:
      return <FileVideo className="h-6 w-6" />;
    case FileCodeType.AUDIO:
      return <FileAudio className="h-6 w-6" />;
    case FileCodeType.BINARY:
      return <FileDigit className="h-6 w-6" />;
    case FileCodeType.FONT:
      return <FileType className="h-6 w-6" />;
    case FileCodeType.OTHER:
    default:
      return <File className="h-6 w-6" />;
  }
};
export default categorizeMimeType;
