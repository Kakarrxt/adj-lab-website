import i18n from "@/app/translations/i18nextConf";
//const t = i18n.t;

async function getData(url: string) {

  const response = await fetch(url, {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    //throw new Error(t("error.network", { ns: "general", status_code: response.status }))
  }
  return response;
}

async function getDataSafe(url: string, token: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": i18n.language || "nl",
      authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error(`Network response was not ok: ${response.status}`)
  }
  return response;
}

async function postData(url: string, data: Object, token?: string) {
  const body = data ? JSON.stringify(data) : null;
  const headerContent = {
    "Content-Type": "application/json",
    authorization: "",
  };

  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headerContent,
    body: body,
  });

  return response;
}

async function postFormData(
  url: string,
  formData: BodyInit | null | undefined,
  token?: string
) {
  const headerContent = { authorization: "" };
  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "POST",
    headers: headerContent,
    body: formData,
  });

  return response;
}

async function putFormData(
  url: string,
  formData: BodyInit | null | undefined,
  token?: string
) {
  const headerContent = { authorization: "" };
  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: headerContent,
    body: formData,
  });

  return response;
}

async function deleteData(url: string, token?: string, data?: Object) {
  const body = data ? JSON.stringify(data) : null;
  const headerContent = {
    "Content-Type": "application/json",
    authorization: "",
  };

  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "DELETE",
    headers: headerContent,
    body: body,
  });

  return response;
}

async function putData(url: string, data: Object, token?: string) {
  const body = data ? JSON.stringify(data) : null;
  const headerContent = {
    "Content-Type": "application/json",
    authorization: "",
  };

  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "PUT",
    headers: headerContent,
    body: body,
  });

  return response;
}

async function patchData(url: string, data: Object, token?: string) {
  const body = data ? JSON.stringify(data) : null;
  const headerContent = {
    "Content-Type": "application/json",
    authorization: "",
  };

  if (token) {
    headerContent.authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    method: "PATCH",
    headers: headerContent,
    body: body,
  });

  return response;
}

export {
  postData,
  postFormData,
  putFormData,
  getData,
  getDataSafe,
  putData,
  patchData,
  deleteData,
};
