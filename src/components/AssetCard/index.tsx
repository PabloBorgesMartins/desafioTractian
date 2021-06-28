import React, { useState } from 'react';
import {
    Container,
    Image,
    AssetData,
    AssetName,
    AssetStatus,
    AssetStatusText,
    Row,
    AssetSpecification,
    RightContent,
    Button
} from './styles'
import { Link } from "react-router-dom";
import { FaTrash, FaEye } from 'react-icons/fa';
import { MdEdit } from 'react-icons/md';

import PopupAssets from '../../pages/Assets/PopupAssets';
import { AssetProps, AssetStatusColor, AssetStatusPortuguese } from '../../interfaces/Asset';
import { useAssets } from '../../hooks/assets'
import { useCompany } from '../../hooks/companies'
import { useUnit } from '../../hooks/units'

interface AssetCardProps {
    asset: AssetProps
}

const AssetCard: React.FC<AssetCardProps> = ({ asset }) => {
    const { deleteAsset } = useAssets();
    const { getCompanyNameById } = useCompany();
    const { getUnitNameById } = useUnit();
    const [modalVisible, setModalVisible] = useState(false);

    const openModal = () => {
        setModalVisible(true);
    }

    return (
        <Container>
            <Image
                style={{ borderColor: AssetStatusColor[asset.status] }}
                src={asset.image}
            />
            <AssetData>
                <AssetName>{asset.name}</AssetName>
                <AssetSpecification>
                    {asset.companyId ? getCompanyNameById(asset.companyId) : "Sem Empresa"}
                    {" - "}
                    {asset.unitId ? getUnitNameById(asset.unitId) : "Sem Unidade"}
                </AssetSpecification>
                <Row>
                    <AssetStatus style={{ backgroundColor: AssetStatusColor[asset.status] }} />
                    <AssetStatusText style={{ color: AssetStatusColor[asset.status] }}>{AssetStatusPortuguese[asset.status]}</AssetStatusText>
                </Row>
            </AssetData>
            <RightContent>
                <Button>
                    <FaTrash size={18} onClick={() => deleteAsset(asset.id)} />
                </Button>
                <Button>
                    <MdEdit size={18} onClick={() => openModal()} />
                </Button>
                <Link to={"/assets/" + asset.id}>
                    <Button>
                        <FaEye size={18} />
                    </Button>
                </Link>
            </RightContent>
            <PopupAssets item={{ modalVisible, setModalVisible, id: asset.id }} />
        </Container>
    );
}


export default AssetCard;