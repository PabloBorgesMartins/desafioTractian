import React, { useMemo } from 'react';
import {
    Container,
    Title
} from './styles'

const Home: React.FC = () => {

    // /**
    //   * @return the number of assets with healthscore greater than 75
    //   */
    // const greatScore = useMemo(() => {
    //     return assets.filter(el => el.healthscore >= 75).length;
    // }, [assets]);

    // /**
    //  * @return the number of assets with healthscore greater than 50 and lower than 75
    //  */
    // const goodScore = useMemo(() => {
    //     return assets.filter(el => el.healthscore >= 50 && el.healthscore < 75)
    //         .length;
    // }, [assets]);

    // /**
    //  * @return the number of assets with healthscore lower than 50
    //  */
    // const badScore = useMemo(() => {
    //     return assets.filter(el => el.healthscore < 50).length;
    // }, [assets]);

    return (
        <Container>
            <Title>Home</Title>
        </Container>
    );
}

export default Home;