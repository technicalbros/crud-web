import {ChooseFileOptions, RequestOptions} from "@crud/core";
import * as _ from "lodash";

export default function chooseFile(config: RequestOptions): RequestOptions {

    const {callbacks} = config;

    callbacks.chooseFile = async ({multiple, accept}: ChooseFileOptions = {}): Promise<File | File[]> => {


        const files = await new Promise<File[]>(resolve => {
            const changeHandler = e => {
                resolve(e.currentTarget.files);
            }

            let input: HTMLInputElement = document.querySelector('.sk-file-input');

            if (!input) {
                input = document.createElement('input');
                input.type = "file";
                input.accept = _.isArray(accept) ? accept.join(",") : accept;
                input.multiple = multiple;
                input.style.display = "none";
                input.className = "sk-file-input";
                document.querySelector("body").appendChild(input);
            }
            input.addEventListener('change', changeHandler)
            input.click();
        })

        const filesArray = [];

        for (let file of files) {
            file.url = URL.createObjectURL(file);
            filesArray.push(file)
        }

        if (multiple) {
            return filesArray;
        } else {
            return files[0];
        }

    }

    return config;
}
