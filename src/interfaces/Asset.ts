/* eslint-disable no-shadow */

export const AssetStatus: { [key: string]: string } = {
  inAlert: 'Em Alerta',
  inOperation: 'Em Operação',
  inDowntime: 'Em Parada',
};


export const AssetStatusColor: { [key: string]: string } = {
  inAlert: '#faad14',
  inOperation: '#52c41a',
  inDowntime: '#ff4d4f',
};

export const AssetModel: { [key: string]: string } = {
  fan: 'Ventilador',
  motor: 'Motor',
};

export interface IAsset {
  [key: string]: any;
  id: number;
  sensors: string[];
  model: string;
  status: string;
  healthscore: number;
  name: string;
  image: string;
  specifications: {
    maxTemp: number;
    power?: number;
    rpm?: number;
  };
  metrics: {
    totalCollectsUptime: number;
    totalUptime: number;
    lastUptimeAt: string;
  };
  unitId: number;
  unit: string;
  companyId: number;
  company: string;
}
