"use client";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { Attachment } from "@prisma/client";
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

function PDFFilePreview({ attachment }: { attachment: Attachment }) {
  const fileUrl = `http://localhost:3000/test.pdf`;
  return (
    <div className="flex flex-wrap max-w-[400px]">
      <div className="max-h-[160px] overflow-hidden relative after:absolute after:w-full  after:h-full  after:bg-[rgba(0,0,0,.4)]  after:top-0  after:left-0">
        <Document file={fileUrl}>
          <Page pageNumber={1} className="select-none" />
        </Document>
      </div>
      <p className="p-2">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
}

export default PDFFilePreview;
