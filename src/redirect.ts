import {RequestOptions} from "@crud/core";

export default function redirect(config: RequestOptions): RequestOptions {

    const {callbacks} = config;

    callbacks.redirect = (to: string) => {
        window.location.href = to
    }

    callbacks.reload = () => window.location.reload()

    return config;
}
