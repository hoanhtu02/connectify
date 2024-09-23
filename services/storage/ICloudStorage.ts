export interface ICloudStorage {
    url: string
    uploadFile: (files: File[]) => Promise<{
        name: string; id: string
    }[]>;
    getFile: (id: string) => Promise<File>;
    deleteFile: (id: string) => Promise<void>;
}