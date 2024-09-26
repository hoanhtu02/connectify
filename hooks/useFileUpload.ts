import { FileUpload } from "@/components/context/FileUploadProvider";
import { Attachment } from "@prisma/client";
import axios from "axios";
import { useCallback, useState } from "react";

function useFileUpload() {
    const [progressUpload, setProgressUpload] = useState(0)
    const [totalSize, setTotalSize] = useState(0)
    const [fileLoaded, setFileLoaded] = useState(0)
    const upload = useCallback(async (u: FileUpload) => {
        try {
            const urlUpload = "https://connectify.webtuhan.id.vn/wp-json/wp/v2/media"
            const formData = new FormData();
            formData.append("file", u.file);
            formData.append("title", u.file.name);
            const {
                data: { token },
            } = await axios.get("/api/resources");
            if (!token) return;
            const { data: {
                source_url,
                id,
                title: { raw },
                mime_type,
            } } = await axios.post(
                urlUpload,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`,
                    },
                    onUploadProgress: function (progressEvent) {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total!
                        );
                        setProgressUpload(percentCompleted)
                        setTotalSize(progressEvent?.total ?? 0)
                        setFileLoaded(progressEvent.total ?? 0)
                    },
                }
            );
            return {
                cloudId: id,
                fileUrl: source_url,
                name: raw,
                mime: mime_type,
            } as Attachment
        } catch (error) {
            console.log("🚀 ~ upload ~ error:", error)
        }
    }, [])
    return { upload, progressUpload, totalSize, fileLoaded } as const
}

export default useFileUpload
