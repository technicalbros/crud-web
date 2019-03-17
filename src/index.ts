import * as _ from "lodash";

export {default as fetchRequest} from "./fetchRequest";
export {default as chooseFile} from "./chooseFile";
export {default as redirect} from "./redirect";
export {default as reload} from "./reload";

declare global {
    interface FormData {
        merge(data: any): this
    }

    interface URLSearchParams {
        merge(data: any): this
    }

    interface File {
        url: string
    }
}

const isFile = value => (value instanceof File || value instanceof Blob)

const mergeData = (formData: FormData | URLSearchParams, data: any, key?: string) => {
    if (_.isObject(data) && !isFile(data)) {
        _.each(data, (value, _key) => {
            const name = key ? `${key}[${_key}]` : _key;
            mergeData(formData, value, name);
        })
    } else if (key && data !== undefined) {
        // @ts-ignore
        formData.append(key, (data !== false && !data) ? "" : data);
    }
}

FormData.prototype.merge = function (data: Object) {
    mergeData(this, data);
    return this;
}

URLSearchParams.prototype.merge = function (data: Object) {
    mergeData(this, data);
    return this;
}
