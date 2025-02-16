const appConfigs = () => {
    return {
        title: process.env.REACT_APP_TITLE,
        backendUrl: process.env.REACT_APP_BACKEND_URL,
    }
}
export const appConfigurations = appConfigs();

const appKeyConfigs = () => {
    return {
        keyToken: process.env.REACT_APP_KEY_TOKEN || "keyUserInfoADJFrontend",
        keyUserInfo: process.env.REACT_APP_KEY_USER_INFO || "keyTokenADJFrontend",
    }
}

export const appKeyConfigurations = appKeyConfigs();

export const queryOptions1 = {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
};

export const queryOptions = {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
};

export const queryOptionsRefetchOnMount = {
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
}

export const queryOptionsDisabled = {
    enabled: false
}

export const getQueryOptions = (enabled: boolean, refetchOnMount: boolean = false) => {
    return {
        refetchOnMount: refetchOnMount,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        enabled: enabled
    };
}