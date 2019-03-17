import {ChooseFileOptions, RequestOptions} from "@crud/core";
import * as _ from "lodash";

export default function chooseFile(config: RequestOptions): RequestOptions {

    const {callbacks} = config;

    callbacks.chooseFile = ({multiple, accept}: ChooseFileOptions = {}): Promise<File | File[]> => {

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

        input.click();
        return new Promise(resolve => {
            const changeHandler = e => {
                const files = e.currentTarget.files;
                const filesArray = [];
                _.each(files, file => {
                    file.url = URL.createObjectURL(file);
                    filesArray.push(file)
                });
                if (multiple) {
                    resolve(filesArray);
                } else {
                    resolve(files[0]);
                }
            }

            input.addEventListener('change', changeHandler)

        })
    }

    return config;
}
