import {CrudRequest, RequestOptions} from "@crud/core";

export default function dialogs(this: CrudRequest, $config: RequestOptions): RequestOptions {

    $config.callbacks.alert = async ({title, textContent}) => {
        alert(`${title} : ${textContent}`)
    }

    $config.callbacks.confirm = async ({title, textContent}) => {
        if (confirm(`${title} : ${textContent}`)) {
            return null;
        } else {
            throw null;
        }
    }

    return $config;
}
