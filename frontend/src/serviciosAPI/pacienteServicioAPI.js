import axios from 'axios';

/**
 * Métodos genéricos para CRUD de cualquier entidad
 * endpointUrl: la URL base del recurso, ejemplo: API_URLS.pacientes
 */
export const apiGetAll = (endpointUrl) => axios.get(endpointUrl);
export const apiGetById = (endpointUrl, id) => axios.get(`${endpointUrl}/${id}`);
export const apiCreate = (endpointUrl, datos) => axios.post(endpointUrl, datos);
export const apiUpdate = (endpointUrl, id, datos) => axios.put(`${endpointUrl}/${id}`, datos);
export const apiDelete = (endpointUrl, id, payload) =>
  axios.delete(`${endpointUrl}/${id}`, { data: payload });
