import {CrudRequest, RequestOptions} from "@crud/core";

export default function fetchRequest(this: CrudRequest, $config: RequestOptions): RequestOptions {

    $config.callbacks.sendRequest = async function (options: RequestOptions) {

        const config = {
            ...this.defaultConfig,
            ...options,
        }

        const {
            data,
            url,
            method = "get",
            baseUrl = "",
            prefix = "",
            suffix = "",
            extension = "",
            redirectTo = false,
            showProgress = true,
            checkDataType = true,
            notify = true,
            reload: reloadPage = false
        } = config;

        const ajaxOptions: RequestInit = {
            headers: {},
            credentials: "include",
            ...config.ajaxOptions,
        }

        ajaxOptions.method = method;
        let fullUrl = baseUrl + prefix + url + suffix + extension;

        if (method.toLowerCase() === 'post' && !(data instanceof FormData)) {
            ajaxOptions.body = new FormData().merge(data);
        }

        if (ajaxOptions.body instanceof FormData) {
            ajaxOptions.method = "post";
        } else if (data) {
            const params = new URLSearchParams().merge(data);
            fullUrl += "?" + params;
        }

        showProgress && this.toggleLoading(true);

        try {

            let res = await fetch(fullUrl, ajaxOptions);

            let responseText;
            let response;

            if (res.status === 200) {
                responseText = await res.text()
            } else {
                throw responseText;
            }

            try {
                response = JSON.parse(responseText);
            } catch (e) {
                response = responseText;
            }

            showProgress && this.toggleLoading(false);

            if (method.toLowerCase() === 'get') {
                return response;
            } else {

                notify && this.notify({
                    type: response.type,
                    message: response.message
                });

                if (!checkDataType || this.call("checkSuccess", [response])) {
                    return response;
                } else {
                    throw response;
                }

            }

            if (redirectTo) {
                this.redirect(redirectTo);
            } else if (reloadPage) {
                this.reload();
            }

            return data;

        } catch (error) {

            showProgress && this.toggleLoading(false);

            notify && this.notify({
                type: "error",
                message: `${error.status}: ${error.statusText}`
            });

            throw error
        }

    }
    return $config;
}
