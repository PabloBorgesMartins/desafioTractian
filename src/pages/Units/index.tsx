import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    Body,
} from './styles'

import UnitCard from '../../components/UnitCard'
import InputBlue from '../../components/InputBlue'
import PopupUser from './PopupUnit';
import { useUnit } from '../../hooks/units'
import LoaderSpinner from '../../components/LoaderSpinner';
import { UnitProps } from '../../interfaces/Unit';
import NoData from '../../components/NoData'

const Units: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [unitData, setUnitData] = useState<UnitProps[]>([]);

    const { units, getUnits } = useUnit();

    useEffect(() => {
        setUnitData(units);
    }, [units]);

    const loadData = useCallback(async () => {
        await getUnits();
        setLoading(false);
    }, [getUnits]);

    useEffect(() => {
        loadData();
    }, [loadData]);

    const openModal = useCallback(async () => {
        setModalVisible(true);
    }, []);

    const searchUnit = useCallback((value: string) => {
        if (value) {
            setUnitData(() => {
                return units.filter(el => {
                    return (
                        el.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
            });
        } else {
            setUnitData(units);
            setSearch(value);
        }
    }, [units]);

    return (
        <Container>
            <Content>
                <Header>
                    <InputBlue
                        search={search}
                        setSearch={setSearch}
                        searchUnit={searchUnit}
                    />
                    <HeaderButton onClick={() => openModal()}>
                        Adicionar unidade
                    </HeaderButton>
                </Header>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <Body>
                            {
                                unitData.length ? (
                                    unitData.map((item, i) => {
                                        if (item.active || item.active === undefined) {
                                            return <UnitCard unit={item} key={i} />
                                        }
                                        return null;
                                    })
                                ) : (
                                    <NoData type="Unidade" />
                                )
                            }
                        </Body>
                    )
                }
            </Content>
            <PopupUser item={{ modalVisible, setModalVisible }} />
        </Container>
    );
}

export default Units;