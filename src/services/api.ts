import axios from 'axios';

const api = axios.create({
    baseURL: "https://my-json-server.typicode.com/tractian/fake-api/",
});

export default api;


// Dicionário

// status => Estado atual (inAlert = Em Alerta, inOperation = Em Operação, inDowntime = Em Parada)

// healthscore => Saúde em %

// specifications 
// maxTemp => Temperatura Máxima em Celsius
// power => Potência em kWh
// rpm => RPM

// metrics
// totalCollectsUptime => Total de Coletas Uptime(Ligada)
// totalUptime => Total de Horas de Coletas Uptime(Ligada)
// lastUptimeAt => Data da Ultima Coleta Uptime(Ligada)