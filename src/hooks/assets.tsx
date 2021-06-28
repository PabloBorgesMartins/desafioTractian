import React, {
  createContext, useState, useContext, useEffect, useCallback
} from 'react';


import api from '../services/api'
import { AssetProps } from '../interfaces/Asset'

interface AssestsContextData {
  getAssets(): void;
  editAsset: (Asset: AssetProps) => void;
  addAsset: (Asset: AssetProps) => void;
  deleteAsset: (id: number) => void;
  getAssetById: (id: number) => AssetProps;
  assets: AssetProps[];
}

const AssestsContext = createContext<AssestsContextData>({} as AssestsContextData);

const AssetsProvider: React.FC = ({ children }) => {
  const [savedAssets, setSavedAssets] = useState<AssetProps[]>([] as AssetProps[]);
  const [assets, setAssets] = useState<AssetProps[]>([] as AssetProps[]);

  const getIndex = useCallback((id: number) => {
    let index = -1;
    assets.forEach((el, i) => {
      if (el.id === id) {
        index = i;
      }
    })
    return index;
  }, [assets]);

  const getAssets = useCallback(async () => {
    let { data } = await api.get<AssetProps[]>('assets');
    setAssets([...data, ...savedAssets])
  }, [savedAssets]);

  const getAssetById = useCallback((id: number) => {
    let index = getIndex(id)
    return assets[index];
  }, [assets, getIndex]);

  const addAsset = useCallback(async (asset: AssetProps) => {
    asset.id = assets.length + 1;
    asset.metrics.lastUptimeAt = new Date().toISOString();
    await setSavedAssets([...savedAssets, asset]);
    await setAssets([...assets, asset]);
  }, [assets, savedAssets]);

  const editAsset = useCallback(async (asset: AssetProps) => {
    let assetsAux = [...assets];
    asset.metrics.lastUptimeAt = new Date().toISOString();
    try {
      assetsAux[getIndex(asset.id)] = asset;
    } catch (err) {
      console.log("Error edit asset", err)
    }
    setAssets(assetsAux);
  }, [assets, getIndex]);

  const deleteAsset = useCallback(async (id: number) => {
    let usersAux = [...assets];
    let index = getIndex(id)
    try {
      usersAux[index].active = false;
    } catch (err) {
      console.log("Error delete user", err)
    }
    setAssets(usersAux)
  }, [assets, getIndex]);

  useEffect(() => {
    console.log("Asset Provider Iniciado")
  }, [assets]);

  return (
    <AssestsContext.Provider
      value={{
        addAsset,
        assets,
        deleteAsset,
        editAsset,
        getAssetById,
        getAssets
      }}
    >
      {children}
    </AssestsContext.Provider>
  );
};

function useAssets(): AssestsContextData {
  const context = useContext(AssestsContext);

  if (!context) {
    throw new Error('useAssets must be used within an AssetsProvider');
  }

  return context;
}

export { AssetsProvider, useAssets };
