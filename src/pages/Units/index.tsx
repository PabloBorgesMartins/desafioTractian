import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    HeaderInput,
    Body,
} from './styles'
import { FaSearch } from 'react-icons/fa';
import { MdCancel } from 'react-icons/md';

import UnitCard from '../../components/UnitCard'
import PopupUser from './PopupUnit';
import { useUnit } from '../../hooks/units'
import LoaderSpinner from '../../components/LoaderSpinner';
import { UnitProps } from '../../interfaces/Unit';
import NoData from '../../components/NoData'

const Units = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [unitData, setUnitData] = useState<UnitProps[]>([]);

    const { units, getUnits } = useUnit();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setUnitData(units);
    }, [units]);

    const loadData = useCallback(async () => {
        await getUnits();
        setLoading(false);
    }, []);

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
                    <HeaderInput>
                        <input
                            value={search}
                            onChange={(event) => setSearch(event.target.value)}
                            placeholder="Buscar"
                        />
                        {
                            search && <div>
                                <MdCancel onClick={() => searchUnit("")} size={15} />
                            </div>
                        }
                        <FaSearch onClick={() => searchUnit(search)} size={15} />
                    </HeaderInput>
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
                                    })
                                ) : (
                                    <NoData type="Usuários" />
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