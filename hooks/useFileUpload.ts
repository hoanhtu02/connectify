import { FileUpload } from "@/context/FileUploadProvider";
import { Attachment } from "@prisma/client";
import axios from "axios";
import { useCallback, useState } from "react";

function useFileUpload() {
    const [progressUpload, setProgressUpload] = useState(0)
    const [totalSize, setTotalSize] = useState(0)
    const [fileLoaded, setFileLoaded] = useState(0)
    const [status, setStatus] = useState<"uploading" | "completed" | "error">("uploading")

    /**
     * Upload file to server
     * @param fileUpload FileUpload
     * @returns Attachment
     */
    const upload: (file: File, messageId: string) => Promise<Attachment | undefined> = useCallback(async (fileUpload, messageId) => {
        try {
            // const urlUpload = `${process.env.NEXT_PUBLIC_HOST_WP}/wp-json/wp/v2/media`
            // const formData = new FormData();
            // formData.append("file", fileUpload);
            // formData.append("title", fileUpload.name);
            // // get token from server to auth with wp
            // const {
            //     data: { token },
            //     status
            // } = await axios.get("/api/resources");
            // if (!token) return;
            // // upload file to wp
            // const { data: {
            //     source_url,
            //     id,
            //     title: { raw },
            //     mime_type,
            // } } = await axios.post(
            //     urlUpload,
            //     formData,
            //     {
            //         headers: {
            //             "Content-Type": "multipart/form-data",
            //             Authorization: `Bearer ${token}`,
            //         },
            //         onUploadProgress: function (progressEvent) {
            //             const percentCompleted = Math.round(
            //                 (progressEvent.loaded * 100) / progressEvent.total!
            //             );
            //             setProgressUpload(percentCompleted)
            //             setTotalSize(progressEvent?.total ?? 0)
            //             setFileLoaded(progressEvent.total ?? 0)
            //         },
            //     }
            // );
            // if (status !== 200) {
            //     setStatus("error")
            //     throw new Error("Upload failed")
            // }
            // // create and get attachment in server
            // const { data: attachment } = await axios.post("/api/resources", JSON.stringify({
            //     cloudId: id,
            //     fileUrl: source_url,
            //     name: raw,
            //     mime: mime_type,
            //     messageId
            // }), {
            //     headers: {
            //         "Content-Type": "application/json"
            //     }
            // });
            // setStatus("completed")
            // return attachment
            setProgressUpload(100)
            setStatus("completed")
            return {
                id: "",
                cloudId: "",
                fileUrl: URL.createObjectURL(fileUpload),
                name: fileUpload.name,
                mime: fileUpload.type,
                messageId: "",
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        } catch (error) {
            console.log("🚀 ~ upload ~ error:", error)
            setStatus("error")
        }
    }, [])
    return { upload, progressUpload, totalSize, fileLoaded, status } as const
}

export default useFileUpload
