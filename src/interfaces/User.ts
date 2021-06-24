export interface UserProps {
  id: number;
  email: string;
  name: string;
  companyId?: number;
  unitId?: number;
  active: boolean;
}
