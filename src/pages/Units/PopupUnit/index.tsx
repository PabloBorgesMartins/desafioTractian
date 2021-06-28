import React, { useState, useEffect, useCallback } from 'react';
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
import { useCompany } from '../../../hooks/companies'
import { useUnit } from '../../../hooks/units'
import LoaderSpinner from '../../../components/LoaderSpinner'

interface ModalProps {
    item: {
        modalVisible: boolean;
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        id?: number;
    }
}

const PopupUnit: React.FC<ModalProps> = ({ item }) => {
    const [nameInput, setNameInput] = useState("");
    const [companyInput, setCompanyInput] = useState(1);
    const [loading, setLoading] = useState(true);

    const { getUnitById, editUnit, addUnit } = useUnit();
    const { companies } = useCompany();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    const loadData = useCallback(async () => {
        if (item.id) {
            let aux = await getUnitById(item.id)
            setNameInput(aux.name);
            setCompanyInput(aux.companyId);
        }
        setLoading(false)
    }, [item, getUnitById]);

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible, loadData])

    const clear = useCallback(() => {
        setNameInput("");
    }, []);

    const closeModal = useCallback(() => {
        clear();
        item.setModalVisible(false);
    }, [item, clear]);

    const handleSave = useCallback(async () => {
        try {
            let data = {
                name: nameInput,
                companyId: companyInput,
            }
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório!'),
                companyId: Yup.string().required('Selecione uma Empresa!'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            if (item.id) {
                editUnit({
                    id: item.id,
                    ...data
                })
            } else {
                addUnit({
                    id: 0,
                    active: true,
                    ...data
                })
            }
        } catch (err) {
            if (err instanceof Yup.ValidationError) {
                const errors = getValidationErrors(err);
                alert(errors[0]);
                return;
            }
        }
        closeModal();
    }, [nameInput, item, addUnit, closeModal, companyInput, editUnit]);

    return (
        <ModalOutside isVisi={item.modalVisible}>
            <Modal isVisi={item.modalVisible} onClick={e => handleCancelParentEvent(e)}>
                <Title>
                    {item.id ? "Editar " : "Criar "}
                    Unidade
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
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Empresa</h1>
                                    <select
                                        value={companyInput}
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

export default PopupUnit;