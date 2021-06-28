import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import moment from 'moment';
import {
    Container,
    Content,
    ContentRow,

    ContentLeft,
    Image,
    GraphicContainer,
    StatusRow,
    StatusName,
    AssetStatus,

    ContentRight,
    Name,
    Unit,
    BodyRight,
    Title,
    ListPadding,
    Row
} from './styles'


import { AssetProps, AssetStatusColor, AssetStatusPortuguese, AssetModelPortuguese } from '../../interfaces/Asset';
import LoaderSpinner from '../../components/LoaderSpinner';
import { useAssets } from '../../hooks/assets';
import { useCompany } from '../../hooks/companies';
import { useUnit } from '../../hooks/units';

highchartsMore(Highcharts);
solidGauge(Highcharts);

const Asset: React.FC = () => {
    const [asset, setAsset] = useState<AssetProps>({} as AssetProps);
    const [loading, setLoading] = useState(true);

    const { getAssetById } = useAssets();
    const { getCompanyNameById } = useCompany();
    const { getUnitNameById } = useUnit();
    const { id } = useParams<{ id: string }>();

    const load = useCallback(async () => {
        let data = await getAssetById(parseInt(id));
        await setAsset(data);
        setLoading(false);
    }, [getAssetById, id]);

    useEffect(() => {
        load();
    }, [load]);

    const healthDiaryOptions: Highcharts.Options = {
        chart: {
            type: 'solidgauge',
            width: 200,
            backgroundColor: 'transparent',
            height: '110%',
        },
        title: {
            text: undefined,
        },
        tooltip: {
            borderWidth: 0,
            backgroundColor: 'none',
            shadow: false,
            hideDelay: 50000,
            style: {
                fontSize: '16px',
            },
            valueSuffix: '%',
            pointFormat:
                '<span style="font-size:2em; color: {point.color}; font-weight: bold">{point.y}</span>',
            positioner: labelWidth => {
                return {
                    x: (200 - labelWidth) / 2,
                    y: 150 / 2 + 15,
                };
            },
        },
        pane: {
            startAngle: 0,
            endAngle: 360,
            // startAngle: -90,
            // endAngle: 90,
            background: [
                {
                    outerRadius: '110%',
                    innerRadius: '80%',
                    shape: 'arc',
                    backgroundColor: Highcharts.color(
                        `${'#4B6DD1'}`,
                    )
                        .setOpacity(0.3)
                        .get(),
                    borderWidth: 0,
                },
            ],
        },
        yAxis: {
            min: 0,
            max: 100,
            lineWidth: 0,
            tickPositions: [],
        },
        plotOptions: {
            solidgauge: {
                dataLabels: {
                    enabled: false,
                },
                linecap: 'round',
                stickyTracking: false,
            },
        },
        series: [
            {
                name: 'Saúde',
                type: 'solidgauge',
                data: [
                    {
                        color: AssetStatusColor[asset.status],
                        y: asset.healthscore,
                        radius: '110%',
                        innerRadius: '80%',
                    },
                ],
            },
        ],
        credits: {
            enabled: false,
        },
    };

    return (
        <Container>
            {
                loading ? (
                    <LoaderSpinner />
                ) : (
                    <Content>
                        <ContentRow>
                            <ContentLeft>
                                <Image
                                    src={asset.image}
                                />
                                <GraphicContainer>
                                    <StatusRow>
                                        <AssetStatus style={{ backgroundColor: AssetStatusColor[asset.status] }} />
                                        <StatusName style={{ color: AssetStatusColor[asset.status] }}>Status: {AssetStatusPortuguese[asset.status]}</StatusName>
                                    </StatusRow>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={healthDiaryOptions}
                                    />
                                </GraphicContainer>
                            </ContentLeft>
                            <ContentRight>
                                <BodyRight>
                                    <Name>
                                        {asset.name}
                                        {' '}
                                        ({AssetModelPortuguese[asset.model]})
                                    </Name>
                                    <Unit style={{ marginBottom: 30 }}>
                                        {asset.companyId ? getCompanyNameById(asset.companyId) : "Sem Empresa"}
                                        {" - "}
                                        {asset.unitId ? getUnitNameById(asset.unitId) : "Sem Unidade"}
                                    </Unit>
                                    <Title >Sensores:</Title>
                                    <ListPadding>
                                        <Unit>- {asset.sensors}</Unit>
                                    </ListPadding>
                                    <Title >Especificações:</Title>
                                    <ListPadding>
                                        <Row>
                                            <Title>- Temperatura máxima:&nbsp;</Title>
                                            <Unit >{asset.specifications.maxTemp} ºC</Unit>
                                        </Row>
                                        {
                                            !!asset.specifications.rpm &&
                                            <Row>
                                                <Title>- RPM:&nbsp;</Title>
                                                <Unit >{asset.specifications.rpm.toFixed(2)}</Unit>
                                            </Row>
                                        }
                                        {
                                            !!asset.specifications.power &&
                                            <Row>
                                                <Title>- Potência:&nbsp;</Title>
                                                <Unit >{asset.specifications.power}</Unit>
                                            </Row>
                                        }
                                    </ListPadding>
                                    <Title>Métricas:</Title>
                                    <ListPadding>
                                        <Row>
                                            <Title>- Total de coletas:&nbsp;</Title>
                                            <Unit>{asset.metrics.totalCollectsUptime}</Unit>
                                        </Row>
                                        <Row>
                                            <Title>- Total de horas coletadas:&nbsp;</Title>
                                            <Unit>{asset.metrics.totalUptime.toFixed(2)}</Unit>
                                        </Row>
                                        <Row>
                                            <Title>- Ultima coleta:&nbsp;</Title>
                                            <Unit>{moment(asset.metrics.lastUptimeAt).format(
                                                'DD/MM/YYYY HH:mm:ss',
                                            )}</Unit>
                                        </Row>
                                    </ListPadding>

                                </BodyRight>
                            </ContentRight>
                        </ContentRow>
                    </Content>
                )
            }
        </Container >
    );
}

export default Asset;