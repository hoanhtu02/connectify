"use client";
import { useQuill } from "react-quilljs";

import "quill/dist/quill.snow.css";
import { useLayoutEffect } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/lib/hooks";
import Toolbar from "quill/modules/toolbar";

function QuillEditor() {
  const { isUseEditor } = useAppSelector((state) => state.setting);
  const { quill, quillRef } = useQuill({
    modules: {
      toolbar: "#toolbar",
    },
    placeholder: "Type a message (/)",
  });
  useLayoutEffect(() => {
    if (quill) {
      const { container } = quill.getModule("toolbar") as Toolbar;
      if (container) {
        container.style.display = isUseEditor ? "" : "none";
      }
      document.addEventListener("keydown", (event) => {
        if (event.key === "/") {
          quill.focus();
          event.preventDefault();
        }
      });
    }
  }, [quill, isUseEditor]);

  return (
    <div className="w-full transition-all">
      <div ref={quillRef} />
      <div id="toolbar">
        <button className="ql-bold"></button>
        <button className="ql-italic"></button>
        <button className="ql-underline"></button>
        <select className="ql-size" defaultValue="">
          <option value="small"></option>
          <option></option>
          <option value="large"></option>
          <option value="huge"></option>
        </select>
        <select className="ql-color" />
        <select className="ql-background" />
        <select className="ql-align" defaultValue="">
          <option></option>
          <option value="center"></option>
          <option value="right"></option>
          <option value="justify"></option>
        </select>
      </div>

      {isUseEditor ? (
        <Button size="sm" className="absolute bottom-2 right-2">
          <Send size={17} className="mr-2" />
          Send
        </Button>
      ) : (
        <Button size="sm" className="absolute top-0 h-full right-0">
          <Send size={17} className="mr-2" />
          Send
        </Button>
      )}
    </div>
  );
}

export default QuillEditor;
