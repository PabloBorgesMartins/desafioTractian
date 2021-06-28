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
import LoaderSpinner from '../../../components/LoaderSpinner'

interface ModalProps {
    item: {
        modalVisible: boolean;
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        id?: number;
    }
}

const PopupCompany: React.FC<ModalProps> = ({ item }) => {
    const [nameInput, setNameInput] = useState("");
    const [loading, setLoading] = useState(true);

    const { getCompanyById, addCompany, editCompany } = useCompany();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    const loadData = useCallback(async () => {
        if (item.id) {
            let aux = await getCompanyById(item.id)
            setNameInput(aux.name);
        }
        setLoading(false)
    }, [item, getCompanyById])

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
            }
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório!'),
            });
            await schema.validate(data, {
                abortEarly: false,
            });
            if (item.id) {
                editCompany({
                    id: item.id,
                    active: true,
                    ...data
                })
            } else {
                addCompany({
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
    }, [nameInput, item, addCompany, closeModal, editCompany]);

    return (
        <ModalOutside isVisi={item.modalVisible}>
            <Modal isVisi={item.modalVisible} onClick={e => handleCancelParentEvent(e)}>
                <Title>
                    {item.id ? "Editar " : "Criar "}
                    Empresa
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
                                        // value={nameInput ? nameInput : ""}
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
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

export default PopupCompany;