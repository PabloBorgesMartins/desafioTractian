import React, { useState, useEffect } from 'react';

import {
    Modal,
    ModalOutside,
    Title,
    Body,
    ContainerInput,
    ContainerSelect,
    Footer,
    ButtonAccess,
} from './styles'

import { useCompany } from '../../../hooks/companies'
import { UserProps } from '../../../interfaces/User'
import { useUser } from '../../../hooks/users'
import { useUnit } from '../../../hooks/units'
import LoaderSpinner from '../../../components/LoaderSpinner'

interface ModalProps {
    item: {
        modalVisible: boolean;
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        id?: number;
    }
}

const PopupUser: React.FC<ModalProps> = ({ item, ...props }) => {
    const [nameInput, setNameInput] = useState("")
    const [emailInput, setEmailInput] = useState("")
    const [unitInput, setUnitInput] = useState(0)
    const [companyInput, setCompanyInput] = useState(0)
    const [loading, setLoading] = useState(true)
    const [userData, setUserData] = useState<UserProps>({} as UserProps)

    const { getUnits, units, getUnitById } = useUnit()
    const { getCompanies, companies, getCompanyById } = useCompany()
    const { getUserById, editUser, addUser } = useUser()

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible])

    useEffect(() => {
        // console.log("company input", companyInput)
        // console.log("unit input", unitInput)
    }, [unitInput, companyInput])

    const loadData = async () => {
        await getUnits();
        await getCompanies();
        if (item.id) {
            let aux = await getUserById(item.id)
            setUserData(aux);
        }
        setLoading(false)
    }

    const handleSave = () => {
        if (item.id) {
            editUser({
                id: item.id,
                active: true,
                email: emailInput,
                name: nameInput,
                companyId: companyInput,
                unitId: unitInput
            })
        } else {
            addUser({
                id: 0,
                active: true,
                email: emailInput,
                name: nameInput,
                companyId: companyInput,
                unitId: unitInput
            })
        }
        item.setModalVisible(false);
    }

    return (
        <ModalOutside isVisi={item.modalVisible} onClick={() => item.setModalVisible(false)}>
            <Modal isVisi={item.modalVisible} onClick={e => handleCancelParentEvent(e)}>
                <Title>
                    Usuário
                </Title>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <>
                            <Body>
                                <ContainerInput>
                                    <h1>Nome</h1>
                                    <input
                                        defaultValue={userData ? userData.name : ""}
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>email</h1>
                                    <input
                                        defaultValue={userData ? userData.email : ""}
                                        onChange={(event) => setEmailInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerSelect>
                                    <h1>Empresa</h1>
                                    <select
                                        onChange={(event) => setCompanyInput(parseInt(event.target.value))}
                                        id="company"
                                        defaultValue={userData.companyId ? getCompanyById(userData.companyId) : companies[0].name}
                                    >
                                        {
                                            companies.map((item, i) => {
                                                if (true) {
                                                    return <option key={i} value={item.id}>{item.name}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </ContainerSelect>
                                <ContainerSelect>
                                    <h1>Unidade</h1>
                                    <select
                                        onChange={(event) => setUnitInput(parseInt(event.target.value))}
                                        defaultValue={userData.unitId ? getUnitById(userData.unitId) : units[0].name}
                                        id="unit"
                                    >
                                        {
                                            units.map((item, i) => {
                                                if (true) {
                                                    return <option key={i} value={item.id}>{item.name}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </ContainerSelect>
                            </Body>
                            <Footer>
                                <ButtonAccess
                                    onClick={() => handleSave()}
                                >
                                    <h1>
                                        Finalizar
                                    </h1>
                                </ButtonAccess>
                            </Footer>
                        </>
                    )
                }
            </Modal>
        </ModalOutside>
    );
}

export default PopupUser;