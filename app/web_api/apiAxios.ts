// =======================  apiClient.ts  =====================

import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
} from "axios";

import { type ApiResponse, type Placemark } from "./types";
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
  console.log(url);
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

export interface MeResponse {
  isAuthenticated: boolean;
  user?: {
    email: string;
  };
}

export async function checkAuth(): Promise<MeResponse> {
  const url = `${baseURL}${authPath}/me`;
  console.log(url);
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
