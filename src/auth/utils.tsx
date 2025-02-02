import { useEffect, useState } from "react";
export const useFetch = (url: string,reload?:boolean) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string>();
  useEffect(() => {
    if (!url) return;
    const fetchUrl = async () => {
      const token = await getAuthToken();
      if (!token) {
        setError("Authorization token is empty or undefined.");
        setIsLoading(false);
        return;
      }
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error: any) {
        console.log("error message", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUrl();
  }, [url,reload]);
  return { data, isLoading, error };
};
export const usePostFetch = (url: string, body: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      const token = await getAuthToken();
      if (!token) {
        setError("Authorization token is empty or undefined.");
        setIsLoading(false);
        return;
      }
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, body]);
  return { data, isLoading, error };
};
export const usePatch = (url: string, requireAuth: boolean, body: any) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<any>();
  const [error, setError] = useState<any>();
  useEffect(() => {
    if (!url) return;
    const fetchData = async () => {
      const token = await getAuthToken();
      const requestOptions = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      };
      try {
        const response = await fetch(url, requestOptions);
        if (response.status === 400) {
          throw new Error("Bad Request");
        }
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const responseData = await response.json();
        setData(responseData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url, requireAuth, body]);
  return { data, isLoading, error };
};
export async function postFetch(url: string, body: any) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getAuthToken()}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  if (response.status === 400) {
    throw new Error("Bad Request");
  }
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}
export async function patchFetch(url: string, body?: any) {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await getAuthToken()}`,
    },
    body: JSON.stringify(body),
  };
  const response = await fetch(url, requestOptions);
  if (response.status === 400) {
    throw new Error("Bad Request");
  }
  if (response.status === 401) {
    throw new Error("Unauthorized");
  }
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }
  return await response.json();
}


export async function putFetch(url: string, body: any) {
    const token = await getAuthToken();
    const requestOptions = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
    };
    const response = await fetch(url, requestOptions);
    if (response.status === 400) {
        throw new Error("Bad Request");
    }
    if (response.status === 401) {
        throw new Error("Unauthorized");
    }
    if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
}
     