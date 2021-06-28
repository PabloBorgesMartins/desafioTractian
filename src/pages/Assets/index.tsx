import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    Body,
} from './styles'

import AssetCard from '../../components/AssetCard'
import InputBlue from '../../components/InputBlue'
import PopupAssets from './PopupAssets';
import { useAssets } from '../../hooks/assets'
import LoaderSpinner from '../../components/LoaderSpinner';
import { AssetProps } from '../../interfaces/Asset';
import NoData from '../../components/NoData'

const Assets = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [assetData, setAssetData] = useState<AssetProps[]>([]);

    const { getAssets, assets } = useAssets();

    const loadData = useCallback(async () => {
        await getAssets();
        setLoading(false);
    }, [getAssets]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    useEffect(() => {
        setAssetData(assets);
    }, [assets]);

    const openModal = useCallback(async () => {
        setModalVisible(true);
    }, []);

    const searchAsset = useCallback((value: string) => {
        if (value) {
            setAssetData(() => {
                return assets.filter(el => {
                    return (
                        el.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
            });
        } else {
            setAssetData(assets);
            setSearch(value);
        }
    }, [assets]);

    return (
        <Container>
            <Content>
                <Header>
                    <InputBlue
                        search={search}
                        setSearch={setSearch}
                        searchUnit={searchAsset}
                    />
                    <HeaderButton onClick={() => openModal()}>
                        Adicionar ativo
                    </HeaderButton>
                </Header>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <Body>
                            {
                                assetData.length ? (
                                    assetData.map((item, i) => {
                                        if (item.active || item.active === undefined) {
                                            return <AssetCard asset={item} key={i} />
                                        }
                                        return null;
                                    })
                                ) : (
                                    <NoData type="Ativo" />
                                )
                            }
                        </Body>
                    )
                }
            </Content>
            <PopupAssets item={{ modalVisible, setModalVisible }} />
        </Container>
    );
}

export default Assets;