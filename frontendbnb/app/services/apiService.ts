import { getAccessToken } from "../lib/actions";

const apiService = {
  get: async <T>(url: string): Promise<T> => {
    const token = await getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const json = await res.json();

    if (!res.ok) {
      throw json;
    }

    return json as T;
  },

  post: async <T, U>(url: string, data: U): Promise<T> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();

    if (!res.ok) {
      throw json;
    }

    return json as T;
  },

  postFormData: async <T>(url: string, data: FormData): Promise<T> => {
    const token = await getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: data,
    });

    const text = await res.text();
    const json = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw json;
    }

    return json as T;
  },
  postBookingFormData: async <T>(url: string, data: FormData): Promise<T> => {
    // const token = await getAccessToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        // Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      body: data,
    });
    const text = await res.text();
    const json = text ? JSON.parse(text) : {};

    if (!res.ok) {
      throw json;
    }

    return json as T;
  },
  // ✅ NEW: Authenticated GET
  getAuth: async <T>(url: string): Promise<T> => {
    const token = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const json = await res.json();

    if (!res.ok) throw json;
    return json as T;
  },
  getConversations: async <T>(url: string): Promise<T> => {
    const token = await getAccessToken();

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
      credentials: "include",
      headers: {
        Accept: "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    });

    const text = await res.text(); // Read raw text
    let json: any;

    try {
      json = JSON.parse(text);
    } catch (err) {
      console.error("Failed to parse JSON from API:", text);
      throw new Error(`Invalid JSON response from ${url}`);
    }

    if (!res.ok) {
      console.error("API error:", json);
      throw json;
    }

    return json as T;
  },
};

export default apiService;
