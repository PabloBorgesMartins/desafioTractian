import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';

import api from '../services/api'
import { UnitProps } from '../interfaces/Unit'

interface UnitContextData {
  getUnits(): void;
  getUnitById: (id: number) => string;
  units: UnitProps[];
}

const UnitContext = createContext<UnitContextData>({} as UnitContextData);

const UnitProvider: React.FC = ({ children }) => {
  const [savedUnits, setSavedUnits] = useState<UnitProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);

  useEffect(() => {
    async function loadStoragedData(): Promise<void> {
      const companies = localStorage.getItem('@tractian:units')

      if (companies) {
        setSavedUnits(JSON.parse(companies));
      }
      getUnits();
    }
    loadStoragedData();
  }, []);

  const getUnits = useCallback(async () => {
    let { data } = await api.get<UnitProps[]>('units');
    setUnits([...data, ...savedUnits])
  }, [savedUnits]);

  const getUnitById = useCallback((id: number) => {
    let index = getIndex(id)
    if (index >= 0) {
      return units[index].name;
    }
    return "Sem Unidade";
  }, [units]);

  const getIndex = (id: number) => {
    let index = -1;
    units.forEach((el, i) => {
      if (el.id == id) {
        index = i;
      }
    })
    return index;
  }

  return (
    <UnitContext.Provider
      value={{
        getUnits,
        getUnitById,
        units
      }}
    >
      {children}
    </UnitContext.Provider>
  );
};

function useUnit(): UnitContextData {
  const context = useContext(UnitContext);

  if (!context) {
    throw new Error('useUnit must be used within an UnitProvider');
  }

  return context;
}

export { UnitProvider, useUnit };
