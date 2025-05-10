// =======================  apiClient.ts  =====================

import axios, {
  type AxiosInstance,
  AxiosError,
  type AxiosResponse,
} from "axios";

import { type ApiResponse, type Placemark } from "./types";
export const baseURL = "http://localhost:8000/api/";

/**
 * 1. Створюємо окремий екземпляр Axios.
 *    Так зручніше, бо можна задати базовий URL і заголовки один раз.
 */
const axiosClient: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * 2. Допоміжна функція для GET‑запиту.
 *    - Повертає саме T (тобто чистий payload), а не весь ApiResponse.
 *    - Catch перехоплює помилки й перекидає їх далі,
 *      щоб можна було обробити у виклику зверху.
 */
async function fetchData<T>(url: string): Promise<T> {
  console.log(url)
  try {
    // <T> говорить TypeScript’у, який саме тип даних ми очікуємо.
    const response: AxiosResponse<ApiResponse<T>> =
      await axiosClient.get<ApiResponse<T>>(url);

    // У нашій схемі бекенду payload лежить у полі data.
    return response.data.data;
  } catch (rawError) {
    // Робимо невеликий каст, щоб мати доступ до полів AxiosError
    const error = rawError as AxiosError;

    console.error(
      `❌ Запит "${url}" завершився помилкою:`,
      error.message
    );
    throw error; // прокидуємо далі, нехай вирішує виклик‑споживач
  }
}

/**
 * 3. Константи з маршрутами.
 *    Загалом це дрібниця, але так менше шансів на помилку у рядках.
 */
const PLACEMARKS_PATH = "/placemarks";

/**
 * 4‑A. Отримати ВЕСЬ список плейсмарк.
 */
export async function fetchPlacemarks(): Promise<Placemark[]> {
  // Тут повертається тип Placemark[] — бо саме його ми й вказали в <>
  return await fetchData<Placemark[]>(PLACEMARKS_PATH);
}

/**
 * 4‑B. Отримати деталі ОДНОГО плейсмарк за id.
 *      Якщо щось пішло не так, повертаємо null замість кидати помилку —
 *      так компоненту простіше вирішити, що показати (spinner / alert).
 */
export async function fetchPlacemarkDetails(
  id: string
): Promise<Placemark | null> {
  const url = `${PLACEMARKS_PATH}/${id}`; // "placemarks/42/"

  try {
    return await fetchData<Placemark>(url);
  } catch (error) {
    console.error(
      `❌ Не вдалося отримати плейсмарк із id="${id}".`,
      error
    );
    return null;
  }
}
