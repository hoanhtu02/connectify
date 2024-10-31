import { AxiosInstance } from "axios";

export interface ICloudStorage {
    axios: AxiosInstance
    getFile: (id: string) => Promise<File>;
}