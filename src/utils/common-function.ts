import { StorageDataType } from "./types";




export const getDataFormStorage = (key: string, dataType: StorageDataType) => {
  if (typeof window !== "undefined") {
    const inString = localStorage.getItem(key);
    if (inString) {
      const inArray = JSON.parse(inString);
      return inArray;
    }
    if (dataType === "array") return [];
    if (dataType === "object") return null;
    if (dataType === "string") return "";
  }
};
export const setDataInStorage = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    const inArrayString = JSON.stringify(value);
    const setArray = localStorage.setItem(key, inArrayString);
    return setArray;
  }
};
