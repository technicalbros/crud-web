import {CrudRequest, RequestOptions} from "@crud/core";

export default function fetchRequest(this: CrudRequest, $config: RequestOptions): RequestOptions {

    $config.callbacks.redirect = (to: string) => {
        window.location.href = to
    }

    $config.callbacks.reload = () => window.location.reload()

    $config.callbacks.alert = ({title, textContent}) => new Promise(() => {
        alert(`${title} : ${textContent}`)
    })

    $config.callbacks.sendRequest = function (options: RequestOptions) {
        return new Promise((resolve, reject) => {

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

            const successCallback = responseText => {
                let response;
                try {
                    response = JSON.parse(responseText);
                } catch (e) {
                    response = responseText;
                }

                showProgress && this.toggleLoading(false);

                if (method.toLowerCase() === 'get') {
                    resolve(response);
                } else {

                    if (!checkDataType || this.call("checkSuccess", [response])) {
                        resolve(response);
                    } else {
                        reject(response);
                    }

                    notify && this.notify({
                        type: response.type,
                        message: response.message
                    });
                }
            }

            const errorCallback = (error) => {
                showProgress && this.toggleLoading(false);

                notify && this.notify({
                    type: "error",
                    message: `${error.status}: ${error.statusText}`
                });

                reject(error)
            }

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

            fetch(fullUrl, ajaxOptions).then(response => {
                return new Promise((resolve, reject) => {
                    if (response.status === 200) {
                        resolve(response.text())
                    } else {
                        reject(response);
                    }
                })
            }).then(successCallback, errorCallback).then(data => {
                if (redirectTo) {
                    this.redirect(redirectTo);
                } else if (reloadPage) {
                    this.reload();
                }
                return data;
            })
        })
    }
    return $config;
}
