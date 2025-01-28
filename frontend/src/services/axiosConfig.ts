import axios from "axios";
import { apiConfig } from "../config/apiConfig";

export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

/**
 * Crear una instancia de Axios con configuración base.
 */
export const api = axios.create({
  baseURL: apiConfig.ApiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Obtener la URL completa de una ruta específica desde `apiConfig.Routes`.
 * @param routeKey - Clave de la ruta.
 * @param method - Método HTTP (e.g., "GET", "POST").
 * @param params - Parámetros dinámicos para reemplazar en la URL.
 * @returns La URL completa.
 */
export const getApiUrl = <
  RouteKey extends keyof typeof apiConfig.Routes,
  Method extends keyof typeof apiConfig.Routes[RouteKey]
>(
  routeKey: RouteKey,
  method: Method,
  params: Record<string, string> = {}
): string => {
  // Acceso seguro al método HTTP del objeto usando el tipo restringido
  const routeTemplate = apiConfig.Routes[routeKey][method];

  if (!routeTemplate || typeof routeTemplate !== "string") {
    throw new Error(`La ruta '${routeKey}' con el método '${String(method)}' no está configurada.`);
  }

  return Object.entries(params).reduce<string>(
    (url, [key, value]) => url.replace(`{{${key}}}`, value),
    routeTemplate
  );
};
