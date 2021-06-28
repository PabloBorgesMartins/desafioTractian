import React, { useState, useEffect, useCallback } from 'react';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import highchartsMore from 'highcharts/highcharts-more';
import solidGauge from 'highcharts/modules/solid-gauge';
import {
    Container,
    Content,
    Header,
    Title,
    RowGraphics,
    GraphicContainer,
    GraphicTitle,
} from './styles'

import api from '../../services/api'
import { IAsset } from '../../interfaces/Asset';
import LoaderSpinner from '../../components/LoaderSpinner';

highchartsMore(Highcharts);
solidGauge(Highcharts);

const Home: React.FC = () => {
    const [assets, setAssets] = useState<IAsset[]>([]);
    const [loading, setLoading] = useState(true);
    const [averageHealth, setAverageHealth] = useState(1)

    const load = useCallback(async () => {
        await setTimeout(async () => {
            let { data } = await api.get<IAsset[]>('assets');
            await setAssets(data)
            setLoading(false);
        }, 1000)
    }, []);

    useEffect(() => {
        load();
    }, [load]);

    useEffect(() => {
        if (assets) {
            let averageHealth = 0;
            assets.forEach(element => {
                averageHealth += element.healthscore;
            });
            setAverageHealth(parseFloat((averageHealth / assets.length).toFixed(2)));
        }
    }, [assets]);

    const generateRandomNumberToColect = useCallback(() => {
        return Math.floor(Math.random() * 48000);
    }, []);

    const generateRandomPercent = useCallback(() => {
        return parseFloat((Math.random() * 100).toFixed(2));
    }, []);

    const numberOptions: Highcharts.Options = {
        chart: {
            width: 300,
            height: 250,
            backgroundColor: 'transparent'
        },
        colors: ['#1e62ed'],
        title: { style: { display: 'none' } },
        xAxis: { categories: ['Abril', 'Maio', 'Junho'] },
        yAxis: {
            labels: { enabled: false },
            title: { text: null },
            gridLineWidth: 0,
        },
        series: [
            {
                name: 'Número de coletas',
                type: 'area',
                data: [generateRandomNumberToColect(), generateRandomNumberToColect(), generateRandomNumberToColect()],
            },
        ],
        credits: { enabled: false },
    };

    const healthOptions: Highcharts.Options = {
        chart: {
            type: 'column',
            width: 300,
            height: 250,
            backgroundColor: 'transparent'
        },
        title: { style: { display: 'none' } },
        xAxis: {
            categories: [
                'Abr',
                'Mai',
                'Jun',
            ],
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: { style: { display: 'none' } },
        },
        plotOptions: {
            column: {
                pointPadding: 0.1,
                borderWidth: 0
            }
        },
        series: [{
            name: 'Saúde média (%)',
            type: 'column',
            color: '#4B6DD1',
            data: [{
                name: 'Abr',
                y: generateRandomPercent(),
            }, {
                name: 'Mai',
                y: generateRandomPercent(),
            }, {
                name: 'Jun',
                y: averageHealth,
            }]
        }]
    };

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
            background: [
                {
                    outerRadius: '110%',
                    innerRadius: '80%',
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
                        color: '#4B6DD1',
                        y: averageHealth,
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

    const stateOptions: Highcharts.Options = {
        chart: {
            type: 'pie', width: 300, height: 250, backgroundColor: 'transparent'
        },
        title: { style: { display: 'none' } },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.y}'
                }
            }
        },
        series: [{
            name: 'Quantidade',
            type: 'pie',
            data: [{
                name: 'Em operação',
                y: 5,
                color: '#098E16'
            }, {
                name: 'Em alerta',
                y: 2,
                color: '#FC7721'
            }, {
                name: 'Em parada',
                y: 1,
                color: '#DE2B1B'
            }]
        }]
    };


    return (
        <Container>
            {
                loading ? (
                    <LoaderSpinner />
                ) : (
                    <>
                        <Header>
                            <Title>Análise diária dos ativos</Title>
                        </Header>
                        <Content>
                            <RowGraphics>
                                <GraphicContainer>
                                    <GraphicTitle>Estado</GraphicTitle>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={stateOptions}
                                    />
                                </GraphicContainer>
                                <GraphicContainer>
                                    <GraphicTitle>Saúde média</GraphicTitle>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={healthDiaryOptions}
                                    />
                                </GraphicContainer>
                            </RowGraphics>
                        </Content>
                        <Header style={{ marginTop: '40px' }}>
                            <Title>Análise Mensal de ativos</Title>
                        </Header>
                        <Content>
                            <RowGraphics>
                                <GraphicContainer>
                                    <GraphicTitle>Saúde média/mês</GraphicTitle>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={healthOptions}
                                    />
                                </GraphicContainer>
                                <GraphicContainer>
                                    <GraphicTitle>Total de coletas/mês</GraphicTitle>
                                    <HighchartsReact
                                        highcharts={Highcharts}
                                        options={numberOptions}
                                    />
                                </GraphicContainer>
                            </RowGraphics>

                        </Content>

                    </>
                )
            }

        </Container>
    );
}

export default Home;