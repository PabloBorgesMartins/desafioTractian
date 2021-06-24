import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';

import api from '../services/api'
import { CompanyProps } from '../interfaces/Company'

interface CompanyContextData {
  getCompanies(): void;
  getCompanyById: (id: number) => string;
  companies: CompanyProps[];
}

const CompanyContext = createContext<CompanyContextData>({} as CompanyContextData);

const CompanyProvider: React.FC = ({ children }) => {
  const [savedCompanies, setSavedCompanies] = useState<CompanyProps[]>([]);
  const [companies, setCompanies] = useState<CompanyProps[]>([]);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const companies = localStorage.getItem('@tractian:companies')

      if (companies) {
        setSavedCompanies(JSON.parse(companies));
      }
    }
    loadStoragedData();
  }, []);

  const getCompanies = useCallback(async () => {
    let { data } = await api.get<CompanyProps[]>('companies');
    setCompanies([...data, ...savedCompanies])
  }, [savedCompanies]);

  const getCompanyById = useCallback((id: number) => {
    let index = getIndex(id)
    return companies[index].name;
  }, [companies]);

  const addCompany = async (value: string) => {
    await setSavedCompanies([...savedCompanies, { id: companies.length, name: value }]);
    localStorage.setItem('@tractian:companies', JSON.stringify(savedCompanies));
    setCompanies([...companies, ...savedCompanies])
  }

  const deleteCompany = useCallback(async (company: CompanyProps) => {

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
        getCompanyById,
        getCompanies
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
