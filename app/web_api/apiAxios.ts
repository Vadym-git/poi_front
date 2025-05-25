// =======================  apiClient.ts  =====================

import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
} from "axios";

export interface MeResponse {
  isAuthenticated: boolean;
  user?: {
    email: string;
  };
}

import type { ApiResponse, Placemark, Category } from "./types";
export const baseURL = "http://localhost:8000";

const apiPath = "/api";
const authPath = "/auth";

/**
 * 1. Create a separate Axios instance.
 *    This is convenient because we can set the base URL and headers once.
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 2. Helper function for GET requests.
 *    - Returns only the payload T (not the entire ApiResponse).
 *    - Catches and rethrows errors to be handled by the calling function.
 */
async function fetchData<T>(url: string): Promise<T> {
  try {
    // <T> tells TypeScript the exact type we expect in the response.
    const response: AxiosResponse<ApiResponse<T>> = await axiosClient.get<
      ApiResponse<T>
    >(url);

    // According to our backend response schema, the useful data is in the 'data' field.
    return response.data.data;
  } catch (rawError) {
    // Cast the error to AxiosError to access its fields
    const error = rawError as AxiosError;

    console.error(`❌ Request to "${url}" failed:`, error.message);
    throw error; // rethrow so the calling component can decide what to do
  }
}
// ================================================  Category  =============================================

const categoryPath = apiPath + "/placemark-categories";

export async function fetchAllCategories(): Promise<AxiosResponse<Category[]>> {
  const url = `${baseURL}${categoryPath}`;
  return await axios.get(url, { withCredentials: true });
}

export async function createCategory(name: string): Promise<AxiosResponse> {
  const url = `${baseURL}${categoryPath}`;
  return await axios.post(url, { name }, { withCredentials: true });
}

export async function updateCategory(
  id: string,
  name: string
): Promise<Category> {
  const url = `${baseURL}${categoryPath}/${id}`;
  const response = await axios.put(url, { name }, { withCredentials: true });
  return response.data;
}

export async function fetchCategoryDetails(
  id: string
): Promise<Category | null> {
  const url = `${baseURL}${categoryPath}/${id}`;
  try {
    const response = await axiosClient.get<Category>(url); // без ApiResponse
    return response.data; // прямі дані
  } catch (error) {
    console.error(`❌ Failed to fetch Category with id="${id}".`, error);
    return null;
  }
}

export async function deleteCategory(id: string): Promise<void> {
  const url = `${baseURL}${categoryPath}/${id}`;
  await axios.delete(url, {
    withCredentials: true,
  });
}

// ================================================  Placemarks  =============================================

/**
 * 3. Constants for endpoint paths.
 *    Helps avoid typos in repeated string paths.
 */
const PLACEMARKS_PATH = apiPath + "/placemarks";

/**
 * 4-A. Fetch the full list of placemarks.
 */
export async function fetchPlacemarks(): Promise<Placemark[]> {
  // Returns a Placemark[] because we declared <Placemark[]> above
  return await fetchData<Placemark[]>(PLACEMARKS_PATH);
}

export async function createPlacemark(data: Placemark): Promise<Placemark> {
  const url = `${baseURL}${PLACEMARKS_PATH}`;
  const response = await axios.post(url, data, {
    withCredentials: true,
  });
  return response.data;
}

export async function updatePlacemark(
  id: string,
  data: Placemark
): Promise<Placemark> {
  const url = `${baseURL}${PLACEMARKS_PATH}/${id}`;
  console.log(data);
  const response = await axios.put(url, data, {
    withCredentials: true,
  });
  return response.data;
}

/**
 * 4-B. Fetch details of a single placemark by ID.
 *      If the request fails, return null instead of throwing,
 *      so that the component can show a fallback (e.g. spinner / alert).
 */
export async function fetchPlacemarkDetails(
  id: string
): Promise<Placemark | null> {
  const url = `${PLACEMARKS_PATH}/${id}`; // e.g., "/placemarks/42"

  try {
    return await fetchData<Placemark>(url);
  } catch (error) {
    console.error(`❌ Failed to fetch placemark with id="${id}".`, error);
    return null;
  }
}

// ==========================================  Auth  ===========================

export async function login(
  email: string | undefined,
  password: string
): Promise<AxiosResponse> {
  const url = `${baseURL}${authPath}/login`;
  console.log(url);
  return await axios.post(
    url,
    {
      email,
      password,
    },
    { withCredentials: true }
  );
}

export async function register(
  email: string,
  password: string
): Promise<AxiosResponse> {
  const url = `${baseURL}${authPath}/signup`;
  console.log("Register URL:", url);

  return await axios.post(url, { email, password }, { withCredentials: true });
}

export async function checkAuth(): Promise<MeResponse> {
  const url = `${baseURL}${authPath}/me`;
  const response: AxiosResponse<MeResponse> = await axios.get(url, {
    withCredentials: true,
  });
  return response.data;
}

export async function logout(): Promise<void> {
  await axios.post(`${baseURL}${authPath}/logout`, null, {
    withCredentials: true,
  });
}
