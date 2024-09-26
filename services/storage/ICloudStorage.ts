import { AxiosInstance } from "axios";

export interface ICloudStorage {
    axios: AxiosInstance
    uploadFile: (files: FormData) => Promise<any>;
    getFile: (id: string) => Promise<File>;
    deleteFile: (id: string) => Promise<void>;
}