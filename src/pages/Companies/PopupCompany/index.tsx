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
import { CompanyProps } from '../../../interfaces/Company'
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
    const [companyData, setCompanyData] = useState<CompanyProps>({} as CompanyProps);

    const { getCompanies, getCompanyById, addCompany, editCompany } = useCompany();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible])

    const loadData = async () => {
        await getCompanies();
        if (item.id) {
            let aux = await getCompanyById(item.id)
            setCompanyData(aux);
            setNameInput(aux.name);
        }
        setLoading(false)
    }

    const clear = useCallback(() => {
        setNameInput("");
    }, []);

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
    }, [nameInput, item]);

    const closeModal = useCallback(() => {
        clear();
        item.setModalVisible(false);
    }, [item]);

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
                                        defaultValue={companyData ? companyData.name : ""}
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