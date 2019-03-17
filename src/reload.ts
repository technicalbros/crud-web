import {RequestOptions} from "@crud/core";

export default function reload(config: RequestOptions): RequestOptions {

    const {callbacks} = config;

    callbacks.reload = () => window.location.reload()

    return config;
}

