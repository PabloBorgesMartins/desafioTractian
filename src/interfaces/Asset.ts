
export interface AssetProps {
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
  companyId: number;
}

export const AssetStatusPortuguese: { [key: string]: string } = {
  inAlert: 'Em Alerta',
  inOperation: 'Em Operação',
  inDowntime: 'Em Parada',
};

export const AssetModelPortuguese: { [key: string]: string } = {
  fan: 'Ventilador',
  motor: 'Motor',
};

export const AssetStatusColor: { [key: string]: string } = {
  inAlert: '#FF9911',
  inOperation: '#33BB22',
  inDowntime: '#EE1B1B',
};