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
import { useUnit } from '../../../hooks/units';
import { useAssets } from '../../../hooks/assets';
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
    const [sensorInput, setSensorInput] = useState("");
    const [modelInput, setModelInput] = useState("motor");
    const [imageInput, setImageInput] = useState("");
    const [statusInput, setStatusInput] = useState("inOperation");
    const [healthInput, setHealthInput] = useState(100.0);
    const [rpmInput, setRpmInput] = useState(0);
    const [temperatureInput, setTemperatureInput] = useState(0);
    const [powerInput, setPowerInput] = useState(0);
    const [unitInput, setUnitInput] = useState(1);
    const [companyInput, setCompanyInput] = useState(1);
    const [totalCollectionsInput, setTotalCollectionsInput] = useState(0);
    const [hoursCollectionsInput, setHoursCollectionsInput] = useState(0);

    const [loading, setLoading] = useState(true);

    const { units } = useUnit();
    const { companies } = useCompany();
    const { getAssetById, addAsset, editAsset } = useAssets();

    const handleCancelParentEvent = (event: any) => {
        event.stopPropagation();
    }

    const loadData = useCallback(async () => {
        if (item.id) {
            let aux = await getAssetById(item.id);
            setNameInput(aux.name);
            setImageInput(aux.image);
            setSensorInput(aux.sensors[0]);
            setModelInput(aux.model);
            setStatusInput(aux.status);
            setHealthInput(aux.healthscore);
            setCompanyInput(aux.companyId);
            setUnitInput(aux.unitId);
            if (aux.specifications.rpm) setRpmInput(aux.specifications.rpm);
            setTemperatureInput(aux.specifications.maxTemp);
            if (aux.specifications.power) setPowerInput(aux.specifications.power);
            setTotalCollectionsInput(aux.metrics.totalCollectsUptime);
            setHoursCollectionsInput(Math.floor(aux.metrics.totalUptime));
        }
        setLoading(false);
    }, [item, getAssetById]);

    useEffect(() => {
        if (item.modalVisible) {
            loadData();
        }
    }, [item.modalVisible, loadData]);

    const clear = useCallback(() => {
        setNameInput("");
        setSensorInput("");
        setModelInput("");
        setStatusInput("");
        setHealthInput(100.0);
        setTemperatureInput(0);
        setRpmInput(0);
        setPowerInput(0);
        setTotalCollectionsInput(0);
        setHoursCollectionsInput(0);
    }, []);

    const closeModal = useCallback(() => {
        clear();
        item.setModalVisible(false);
    }, [item, clear]);

    const handleSave = useCallback(async () => {
        try {
            let aux = {
                name: nameInput,
                sensors: sensorInput,
                model: modelInput,
                status: statusInput,
                healthscore: healthInput,
                image: imageInput,
                maxTemp: temperatureInput,
                power: powerInput,
                rpm: rpmInput,
                totalCollectsUptime: totalCollectionsInput,
                totalUptime: hoursCollectionsInput,
                companyId: companyInput,
                unitId: unitInput
            }
            const schema = Yup.object().shape({
                name: Yup.string().required('Nome obrigatório!'),
                sensors: Yup.string().required('Sensor obrigatório!'),
                model: Yup.string().required('Selecione um modelo!'),
                status: Yup.string().required('Seleciona um estado!'),
                healthscore: Yup.string().required('Saúde obrigatória!'),
                image: Yup.string().required('Imagem obrigatória!'),
                maxTemp: Yup.string().required('Temperatura máxima obrigatória!'),
                power: Yup.string(),
                rpm: Yup.string(),
                totalCollectsUptime: Yup.string().required('Total de coletas obrigatória!'),
                totalUptime: Yup.string().required('Horas coletadas obrigatória!'),
                companyId: Yup.string().required('Selecione uma Empresa!'),
                unitId: Yup.string().required('Selecione uma unidade!')
            });
            await schema.validate(aux, {
                abortEarly: false,
            });
            let data = {
                sensors: [sensorInput],
                status: statusInput,
                healthscore: healthInput,
                model: modelInput,
                name: nameInput,
                image: imageInput,
                metrics: {
                    totalCollectsUptime: totalCollectionsInput,
                    totalUptime: hoursCollectionsInput,
                    lastUptimeAt: ""
                },
                specifications: {
                    maxTemp: temperatureInput,
                    power: powerInput,
                    rpm: rpmInput,
                },
                companyId: companyInput,
                unitId: unitInput
            }
            if (item.id) {
                editAsset({
                    id: item.id,
                    active: true,
                    ...data
                });
            } else {
                addAsset({
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
    }, [
        nameInput,
        sensorInput,
        modelInput,
        statusInput,
        healthInput,
        imageInput,
        temperatureInput,
        powerInput,
        rpmInput,
        totalCollectionsInput,
        hoursCollectionsInput,
        companyInput,
        unitInput,
        item,
        addAsset,
        editAsset,
        closeModal,
    ]);


    return (
        <ModalOutside isVisi={item.modalVisible}>
            <Modal isVisi={item.modalVisible} onClick={e => handleCancelParentEvent(e)}>
                <Title>
                    {item.id ? "Editar " : "Criar "}
                    Ativo
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
                                    <h1>*Modelo</h1>
                                    <select
                                        onChange={(event) => setModelInput(event.target.value)}
                                        id="model"
                                        defaultValue={modelInput ? modelInput : "motor"}
                                    >
                                        <option key="motor" value="motor">
                                            Motor
                                        </option>
                                        <option key="fan" value="fan">
                                            Ventilador
                                        </option>
                                    </select>
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Estado</h1>
                                    <select
                                        onChange={(event) => setStatusInput(event.target.value)}
                                        id="status"
                                        defaultValue={statusInput ? statusInput : "inOperation"}
                                    >
                                        <option key="inOperation" value="inOperation">
                                            Em Operação
                                        </option>
                                        <option key="inAlert" value="inAlert">
                                            Em Alerta
                                        </option>
                                        <option key="inDowntime" value="inDowntime">
                                            Em Parada
                                        </option>
                                    </select>
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Saúde</h1>
                                    <input
                                        value={healthInput ? healthInput : ""}
                                        onChange={(event) => setHealthInput(parseFloat(event.target.value))}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Sensor</h1>
                                    <input
                                        value={sensorInput ? sensorInput : ""}
                                        onChange={(event) => setSensorInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Imagem</h1>
                                    <input
                                        value={imageInput ? imageInput : ""}
                                        onChange={(event) => setImageInput(event.target.value)}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Temperatura máxima (°C)</h1>
                                    <input
                                        type="number"
                                        value={temperatureInput ? temperatureInput : ""}
                                        onChange={(event) => setTemperatureInput(parseFloat(event.target.value))}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>RPM</h1>
                                    <input
                                        type="number"
                                        value={rpmInput ? rpmInput : ""}
                                        onChange={(event) => setRpmInput(parseFloat(event.target.value))}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>Potência</h1>
                                    <input
                                        type="number"
                                        value={powerInput ? powerInput : ""}
                                        onChange={(event) => setPowerInput(parseFloat(event.target.value))}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Total de coletas</h1>
                                    <input
                                        type="number"
                                        value={totalCollectionsInput ? totalCollectionsInput : ""}
                                        onChange={(event) => setTotalCollectionsInput(parseFloat(event.target.value))}
                                    />
                                </ContainerInput>
                                <ContainerInput>
                                    <h1>*Total de horas coletadas</h1>
                                    <input
                                        type="number"
                                        value={hoursCollectionsInput ? hoursCollectionsInput : ""}
                                        onChange={(event) => setHoursCollectionsInput(parseFloat(event.target.value))}
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