import { getDataFormStorage } from "./common-function";
import { AppState, appStateAction } from "./types";


const storageKeys = {
    model:"model",
    predicitons:"predictions"
}

export const initialAppState: AppState = {
    snackBarInfo: null,
    openSnackBar: false,
    selectedPage: "model",
    predictions: getDataFormStorage(storageKeys.predicitons, "object"),
    screen: false,
    camera: false,

};


export function appReducer(state: AppState, action: appStateAction): AppState {
    switch (action.type) {
        case "setSnackBarInfo": {
            const newState: AppState = { ...state, snackBarInfo: action.value };
            return newState;
        }
        case "setOpenSnackBar": {
            const newState: AppState = { ...state, openSnackBar: action.value };
            return newState;
        }
        case "setScreen": {
            const newState: AppState = { ...state, screen: action.value };
            return newState;
        }
        case "setCamera": {
            const newState: AppState = { ...state, camera: action.value };
            return newState;
        }
        case "setSelectedPage": {
            const newState: AppState = { ...state, selectedPage: action.value };
            return newState
        }
        case "setPredictions": {
            const newState: AppState = { ...state, predictions: action.value };
            return newState
        }
        default:
            return state;
    }
}