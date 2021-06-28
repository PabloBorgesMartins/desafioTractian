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

    const { units } = useUnit();
    const { companies } = useCompany();
    const { getUserById, editUser, addUser } = useUser();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    const loadData = useCallback(async () => {
        if (item.id) {
            let aux = await getUserById(item.id);
            setEmailInput(aux.email);
            setNameInput(aux.name);
            setCompanyInput(aux.companyId);
            setUnitInput(aux.unitId);
        }
        setLoading(false);
    }, [item, getUserById]);

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible, loadData]);

    const clear = useCallback(() => {
        setNameInput("");
        setEmailInput("");
    }, []);

    const closeModal = useCallback(() => {
        clear();
        item.setModalVisible(false);
    }, [item, clear]);

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
    }, [emailInput, nameInput, item, companyInput, unitInput, addUser, editUser, closeModal]);


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
                                        value={nameInput ? nameInput : ""}
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Email</h1>
                                    <input
                                        value={emailInput ? emailInput : ""}
                                        onChange={(event) => setEmailInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Empresa</h1>
                                    <select
                                        value={companyInput ? companyInput : 1}
                                        onChange={(event) => setCompanyInput(parseInt(event.target.value))}
                                        id="company"
                                    >
                                        {
                                            companies.map((item, i) => {
                                                return <option key={i} value={item.id}>{item.name}</option>
                                            })
                                        }
                                    </select>
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Unidade</h1>
                                    <select
                                        value={unitInput ? unitInput : 1}
                                        onChange={(event) => setUnitInput(parseInt(event.target.value))}
                                        id="unit"
                                    >
                                        {
                                            units.map((item, i) => {
                                                return <option key={i} value={item.id}>{item.name}</option>
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