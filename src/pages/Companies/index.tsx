import React, { useState, useEffect, useCallback } from 'react';
import {
    Container,
    Content,
    Header,
    HeaderButton,
    Body,
} from './styles'

import CompanyCard from '../../components/CompanyCard'
import InputBlue from '../../components/InputBlue'
import PopupCompany from './PopupCompany';
import { useCompany } from '../../hooks/companies'
import LoaderSpinner from '../../components/LoaderSpinner';
import { CompanyProps } from '../../interfaces/Company';
import NoData from '../../components/NoData'

const Companies: React.FC = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [companyData, setCompanyData] = useState<CompanyProps[]>([]);

    const { companies, getCompanies } = useCompany();

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        setCompanyData(companies);
    }, [companies]);

    const loadData = useCallback(async () => {
        await getCompanies();
        setLoading(false);
    }, []);

    const openModal = useCallback(async () => {
        setModalVisible(true);
    }, []);

    const searchCompany = useCallback((value: string) => {
        if (value) {
            setCompanyData(() => {
                return companies.filter(el => {
                    return (
                        el.name.toLowerCase().includes(value.toLowerCase())
                    );
                });
            });
        } else {
            setCompanyData(companies);
            setSearch(value);
        }
    }, [companies]);

    return (
        <Container>
            <Content>
                <Header>
                    <InputBlue
                        search={search}
                        setSearch={setSearch}
                        searchUnit={searchCompany}
                    />
                    <HeaderButton onClick={() => openModal()}>
                        Adicionar Empresa
                    </HeaderButton>
                </Header>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <Body>
                            {
                                companyData.length ? (
                                    companyData.map((item, i) => {
                                        if (item.active || item.active === undefined) {
                                            return <CompanyCard company={item} key={i} />
                                        }
                                    })
                                ) : (
                                    <NoData type="Empresa" />
                                )
                            }
                        </Body>
                    )
                }
            </Content>
            <PopupCompany item={{ modalVisible, setModalVisible }} />
        </Container>
    );
}

export default Companies;