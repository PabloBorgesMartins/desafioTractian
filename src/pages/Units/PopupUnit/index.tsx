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
import { useCompany } from '../../../hooks/companies'
import { UnitProps } from '../../../interfaces/Unit'
import { useUnit } from '../../../hooks/units'
import LoaderSpinner from '../../../components/LoaderSpinner'
import { useCallback } from 'react';

interface ModalProps {
    item: {
        modalVisible: boolean;
        setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
        id?: number;
    }
}

const PopupUnit: React.FC<ModalProps> = ({ item, ...props }) => {
    const [nameInput, setNameInput] = useState("");
    const [companyInput, setCompanyInput] = useState(1);
    const [loading, setLoading] = useState(true);
    const [unitData, setUnitData] = useState<UnitProps>({} as UnitProps);

    const { getUnits, units, getUnitById, editUnit, addUnit } = useUnit();
    const { getCompanies, companies, getCompanyById } = useCompany();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible])

    const loadData = async () => {
        await getUnits();
        await getCompanies();
        if (item.id) {
            let aux = await getUnitById(item.id)
            setUnitData(aux);
            setNameInput(aux.name);
            setCompanyInput(aux.companyId);
        }
        setLoading(false)
    }

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
        item.setModalVisible(false);
    }, [nameInput, item]);

    const closeModal = useCallback(() => {
        item.setModalVisible(false);
    }, [item]);

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
                                        defaultValue={unitData ? unitData.name : ""}
                                        onChange={(event) => setNameInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Empresa</h1>
                                    <select
                                        onChange={(event) => setCompanyInput(parseInt(event.target.value))}
                                        id="company"
                                        defaultValue={unitData.companyId ? getCompanyById(unitData.companyId) : companies[0].name}
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