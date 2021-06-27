import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';

import api from '../services/api'
import { CompanyProps } from '../interfaces/Company'

interface CompanyContextData {
  getCompanies(): void;
  getCompanyById: (id: number) => CompanyProps;
  getCompanyNameById: (id: number) => string;
  editCompany: (user: CompanyProps) => void;
  addCompany: (user: CompanyProps) => void;
  deleteCompany: (id: number) => void;
  companies: CompanyProps[];
}

const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

const CompanyProvider: React.FC = ({ children }) => {
  const [savedCompanies, setSavedCompanies] = useState<CompanyProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

  useEffect(() => {
    getCompanies();
  }, []);

  const getCompanies = useCallback(async () => {
    let { data } = await api.get<CompanyProps[]>('companies');
    setCompanies([...data, ...savedCompanies])
  }, [savedCompanies]);

  const getCompanyById = useCallback((id: number) => {
    let index = getIndex(id)
    if (index >= 0) {
      return companies[index];
    }
    return {} as CompanyProps;
  }, [companies]);

  const getCompanyNameById = useCallback((id: number) => {
    let index = getIndex(id)
    if (index >= 0) {
      return companies[index].name;
    }
    return "Sem Empresa";
  }, [companies]);

  const addCompany = useCallback(async (company: CompanyProps) => {
    company.id = companies.length + 1;
    await setSavedCompanies([...savedCompanies, company]);
    await setCompanies([...companies, company]);
  }, [companies, savedCompanies]);

  const editCompany = useCallback(async (company: CompanyProps) => {
    let unitsAux = [...companies];
    try {
      unitsAux[getIndex(company.id)] = company;
    } catch (err) {
      console.log("Error edit company", err)
    }
    setCompanies(unitsAux);
  }, [companies]);

  const deleteCompany = useCallback(async (id: number) => {
    let unitsAux = [...companies];
    let index = getIndex(id)
    try {
      unitsAux[index].active = false;
    } catch (err) {
      console.log("Error delete company", err)
    }
    setCompanies(unitsAux)
  }, [companies]);

  const getIndex = (id: number) => {
    let index = -1;
    companies.forEach((el, i) => {
      if (el.id == id) {
        index = i;
      }
    })
    return index;
  }

  return (
    <CompanyContext.Provider
      value={{
        companies,
        getCompanyNameById,
        getCompanies,
        addCompany,
        deleteCompany,
        editCompany,
        getCompanyById
      }}
    >
      {children}
    </CompanyContext.Provider>
  );
};

function useCompany(): CompanyContextData {
  const context = useContext(CompanyContext);

  if (!context) {
    throw new Error('useCompany must be used within an CompanyProvider');
  }

  return context;
}

export { CompanyProvider, useCompany };
