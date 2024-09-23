import axios from "axios"
import { ICloudStorage } from "./ICloudStorage"
export default {
    url: "https://connectify.webtuhan.id.vn/wp-json/wp/v2/media",
    async uploadFile(file) {
        const { data } = await axios.post(this.url, {}, {
            onDownloadProgress(progressEvent) {
            },
        })
        return []
    },
    async getFile(id) {
        const { data } = await axios.get(`${this.url}/${id}`)
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
// // Tạo một mảng để lưu trữ các task upload
// const queue = [];
// const concurrencyLimit = 100;  // Giới hạn số lượng upload đồng thời
// let runningTasks = 0;  // Số lượng upload đang được xử lý

// // Hàm xử lý từng nhóm upload
// async function processQueue() {
//   // Kiểm tra xem số lượng task đang chạy có vượt quá giới hạn hay không
//   if (runningTasks >= concurrencyLimit) return;

//   // Nếu không còn task nào trong hàng đợi, dừng lại
//   if (queue.length === 0) return;

//   // Lấy ra nhóm các file để upload
//   const tasksToRun = queue.splice(0, concurrencyLimit - runningTasks);
//   runningTasks += tasksToRun.length;

//   try {
//     // Xử lý các file đồng thời
//     await Promise.all(tasksToRun.map(task => task()));
//   } finally {
//     // Khi upload xong, giảm số lượng task đang chạy
//     runningTasks -= tasksToRun.length;

//     // Tiếp tục xử lý nhóm tiếp theo trong hàng đợi
//     processQueue();
//   }
// }

// // Hàm để thêm các file vào hàng đợi
// function enqueueTask(task) {
//   queue.push(task);
//   processQueue();  // Bắt đầu xử lý nếu có thể
// }

// // Hàm để upload từng file đến WordPress API
// async function uploadMediaToWordPress(file) {
//   const formData = new FormData();
//   formData.append('file', file);

//   const response = await fetch('/wp-json/wp/v2/media', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Upload failed');
//   }

//   return response.json();  // Trả về kết quả nếu thành công
// }

// // Hàm để thêm nhiều file vào hàng đợi
// function handleUploadFiles(files) {
//   files.forEach(file => {
//     enqueueTask(() => uploadMediaToWordPress(file));
//   });
// }
