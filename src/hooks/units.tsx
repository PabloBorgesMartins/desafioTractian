import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';

import api from '../services/api'
import { UnitProps } from '../interfaces/Unit'

interface UnitContextData {
  getUnits(): void;
  getUnitById: (id: number) => UnitProps;
  getUnitNameById: (id: number) => string;
  editUnit: (user: UnitProps) => void;
  addUnit: (user: UnitProps) => void;
  deleteUnit: (id: number) => void;
  units: UnitProps[];
}

const UnitContext = createContext<UnitContextData>({} as UnitContextData);

const UnitProvider: React.FC = ({ children }) => {
  const [savedUnits, setSavedUnits] = useState<UnitProps[]>([]);
  const [units, setUnits] = useState<UnitProps[]>([]);

  useEffect(() => {
    getUnits();
  }, []);

  const getUnits = useCallback(async () => {
    let { data } = await api.get<UnitProps[]>('units');
    setUnits([...data, ...savedUnits])
  }, [savedUnits]);

  const getUnitById = useCallback((id: number) => {
    let index = getIndex(id)
    if (index >= 0) {
      return units[index];
    }
    return {} as UnitProps;
  }, [units]);

  const getUnitNameById = useCallback((id: number) => {
    let index = getIndex(id)
    if (index >= 0) {
      return units[index].name;
    }
    return "Sem Unidade";
  }, [units]);

  const addUnit = useCallback(async (unit: UnitProps) => {
    unit.id = units.length + 1;
    await setSavedUnits([...savedUnits, unit]);
    await setUnits([...units, unit]);
  }, [units, savedUnits]);

  const editUnit = useCallback(async (unit: UnitProps) => {
    let unitsAux = [...units];
    unitsAux[getIndex(unit.id)] = unit;
    setUnits(unitsAux);
  }, [units]);

  const deleteUnit = useCallback(async (id: number) => {
    let unitsAux = [...units];
    let index = getIndex(id)
    try {
      unitsAux[index].active = false;
    } catch (err) {
      console.log("Error delete user", err)
    }
    setUnits(unitsAux)
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
        getUnitNameById,
        units,
        addUnit,
        deleteUnit,
        editUnit
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
