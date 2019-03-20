declare global {
    interface FormData {
        merge(data: any): this;
    }
    interface URLSearchParams {
        merge(data: any): this;
    }
    interface File {
        url: string;
    }
}
export { default as fetchRequest } from "./fetchRequest";
export { default as chooseFile } from "./chooseFile";
export { default as redirect } from "./redirect";
export { default as reload } from "./reload";
export { default as dialogs } from "./dialogs";
