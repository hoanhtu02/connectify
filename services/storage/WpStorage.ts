import axios from "axios"
import { ICloudStorage } from "./ICloudStorage"
const token = Buffer.from(`${process.env.WP_USERNAME}:${process.env.WP_APP_PASSWORD}`).toString("base64")
export default {
    axios: axios.create({
        baseURL: "https://connectify.webtuhan.id.vn/wp-json/wp/v2/",
        headers: {
            Authorization: `Basic ${token}`
        }
    }),
    async uploadFile(formData) {
        const { data } = await this.axios.post("/media", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        return data
    },
    async getFile(id) {
        const { data } = await this.axios.get(`media/${id}`)
        const file = await fetchFileFromWp(data)
        return file
    },
    async deleteFile() {

    },
} as ICloudStorage

async function fetchFileFromWp(wpObject: any): Promise<File> {
    const { data } = await axios.get<File>(wpObject.source_url);
    const blob = await data.arrayBuffer();
    const fileName = wpObject.media_details?.file || 'downloaded-file.png'; // Lấy tên tệp từ JSON hoặc đặt tên mặc định
    const mimeType = wpObject.mime_type || 'application/octet-stream'; // Lấy mime type hoặc đặt mặc định
    const file = new File([blob], fileName, { type: mimeType });
    return file;
}
