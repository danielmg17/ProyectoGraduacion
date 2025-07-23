// config.js

const API_CONFIG = {
  protocol: 'http',
  host: '192.168.1.74',
  port: 3000,
  baseUrl: function () {
    return `${this.protocol}://${this.host}:${this.port}`;
  }
};

export const API_URLS = {
  pacientes: `${API_CONFIG.baseUrl()}/api/pacientes`,
  // ...agrega aquí los otros endpoints igual
  // usuarios: `${API_CONFIG.baseUrl()}/usuarios`,
  // clientes: `${API_CONFIG.baseUrl()}/clientes`,
};

export default API_CONFIG;
