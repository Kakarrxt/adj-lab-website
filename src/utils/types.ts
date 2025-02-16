export interface AppState {
  snackBarInfo: SnackBarInfo | null;
  openSnackBar: boolean;
  selectedPage: AppTab | null;
  screen: boolean;
  camera: boolean;
  predictions: Prediction;
}
export type appStateAction =
  | {
      type: "setSnackBarInfo";
      value: SnackBarInfo | null;
    }
  | {
      type: "setOpenSnackBar";
      value: boolean;
    }
  | {
      type: "setSelectedPage";
      value: AppTab | null;
    }
  | {
      type: "setScreen";
      value: boolean;
    }
  | {
      type: "setCamera";
      value: boolean;
    }
  | {
      type: "setPredictions";
      value: Prediction;
    };

export type AppContextType = {
  state: AppState;
  dispatch: React.Dispatch<appStateAction>;
};

export type Order = "asc" | "desc";

export type AppTab = "model";

export type StorageDataType = "string" | "array" | "object";

export interface SnackBarInfo {
  message: string;
  severity?: "error" | "warning" | "info" | "success";
  duration?: number;
}

export interface Prediction {
  label: string;
  percentage: number;
}

export interface Record{
  label: string;
  percentage: number;
  timestamp: string;
}


