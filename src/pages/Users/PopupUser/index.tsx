import React, { useState, useEffect } from 'react';
import {
    Modal,
    ModalOutside,
    Title,
    Body,
    ContainerInput,
    Footer,
    ButtonAccess,
    ButtonCancel
} from './styles'
import * as Yup from 'yup';

import getValidationErrors from '../../../utils/getValidationErrors';
import { useCompany } from '../../../hooks/companies';
import { UserProps } from '../../../interfaces/User';
import { useUser } from '../../../hooks/users';
import { useUnit } from '../../../hooks/units';
import LoaderSpinner from '../../../components/LoaderSpinner';
import { useCallback } from 'react';

interface ModalProps {
    item: {
        modalVisible: boolean;
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        id?: number;
    }
}

const PopupUser: React.FC<ModalProps> = ({ item }) => {
    const [nameInput, setNameInput] = useState("");
    const [emailInput, setEmailInput] = useState("");
    const [unitInput, setUnitInput] = useState(1);
    const [companyInput, setCompanyInput] = useState(1);
    const [loading, setLoading] = useState(true);
    const [userData, setUserData] = useState<UserProps>({} as UserProps);

    const { getUnits, units, getUnitNameById } = useUnit();
    const { getCompanies, companies, getCompanyNameById } = useCompany();
    const { getUserById, editUser, addUser } = useUser();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible]);

    const loadData = async () => {
        // await getUnits();
        // await getCompanies();
        if (item.id) {
            let aux = await getUserById(item.id)
            setUserData(aux);
            setEmailInput(aux.email);
            setNameInput(aux.name);
            setCompanyInput(aux.companyId);
            setUnitInput(aux.unitId);
        }
        setLoading(false);
    }

    const clear = useCallback(() => {
        setNameInput("");
        setEmailInput("");
    }, []);

    const handleSave = useCallback(async () => {
        try {
            let data = {
                email: emailInput,
                name: nameInput,
                companyId: companyInput,
                unitId: unitInput
            }
            const schema = Yup.object().shape({
                email: Yup.string()
                    .required('E-mail obrigatório!')
                    .email('Digite um e-mail válido!'),
                name: Yup.string().required('Nome obrigatório!'),
                companyId: Yup.string().required('Selecione uma Empresa!'),
                unitId: Yup.string().required('Selecione uma unidade!')
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            if (item.id) {
                editUser({
                    id: item.id,
                    active: true,
                    ...data
                });
            } else {
                addUser({
                    id: 0,
                    active: true,
                    ...data
                });
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                alert(errors[0]);
                return;
            }
        }
        closeModal();
    }, [emailInput, nameInput, item, companyInput, unitInput]);

    const closeModal = useCallback(() => {
        clear();
        item.setModalVisible(false);
    }, [item]);

    return (
        <ModalOutside isVisi={item.modalVisible}>
            <Modal isVisi={item.modalVisible} onClick={e => handleCancelParentEvent(e)}>
                <Title>
                    {item.id ? "Editar " : "Criar "}
                    Usuário
                </Title>
                {
                    loading ? (
                        <LoaderSpinner />
                    ) : (
                        <>
                            <Body>
                                <ContainerInput>
                                    <h1>*Nome</h1>
                                    <input
                                        value={nameInput}
                                        defaultValue={userData ? userData.name : ""}
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Email</h1>
                                    <input
                                        value={emailInput}
                                        defaultValue={userData ? userData.email : ""}
                                        onChange={(event) => setEmailInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Empresa</h1>
                                    <select
                                        onChange={(event) => setCompanyInput(parseInt(event.target.value))}
                                        id="company"
                                        defaultValue={userData.companyId ? getCompanyNameById(userData.companyId) : companies[0].name}
                                    >
                                        {
                                            companies.map((item, i) => {
                                                if (true) {
                                                    return <option key={i} value={item.id}>{item.name}</option>
                                                }
                                            })
                                        }
                                    </select>
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Unidade</h1>
                                    <select
                                        value={unitInput}
                                        onChange={(event) => setUnitInput(parseInt(event.target.value))}
                                        defaultValue={userData.unitId ? getUnitNameById(userData.unitId) : units[0].name}
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
                                </ContainerInput>
                            </Body>
                            <Footer>
                                <ButtonCancel
                                    onClick={() => closeModal()}
                                >
                                    Cancelar
                                </ButtonCancel>
                                <ButtonAccess
                                    onClick={() => handleSave()}
                                >
                                    Finalizar
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