import { Container, Row } from 'react-bootstrap';
import React from 'react';
import './Portfolio.scss'
import BootstrapTable from 'react-bootstrap-table-next';
import Select from "react-select";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

const columns = [{
    dataField: 'value',
    text: 'value'
},
{
    dataField: 'label',
    text: 'label'
},
{
    dataField: 'price',
    text: 'Price'
}];

function Portfolio() {
    const { selectedOption, allcoins, coinsLoaded, selectedcoins } = useSelector(state => ({
        selectedOption: state.selectedOption,
        allcoins: state.allcoins,
        coinsLoaded: state.coinsLoaded,
        selectedcoins: state.selectedcoins
    }), shallowEqual);

    const dispatch = useDispatch();

    if (!coinsLoaded) {
        axios
            .get('/api/coins/all')
            .then(x => {
                dispatch({ type: 'fetch_allcoins', payload: { allcoins: x.data, coinsLoaded: true } });
            });
    };

    console.log(allcoins);

    return (
        <>
            <div className="portfolio-table">
                <h3>Your assets</h3>
                <BootstrapTable keyField='id' data={selectedcoins} columns={columns} />
            </div>
            <div className="portfolio-search">
                <Container>
                    <Row>
                        <Select className="portfolio-search-input"
                            defaultValue={selectedOption}
                            options={allcoins}
                            placeholder="Search and add coin..."
                            onChange={(value) => {
                                if (selectedcoins.filter(x => x.value === value.value).length === 0)
                                    dispatch({ type: 'add_coin', payload: { newCoin: value } })
                            }}
                        />
                    </Row>
                </Container>
            </div>
        </>
    );
}

export default Portfolio;