import { Button, Col, Row } from 'react-bootstrap';
import React from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { removeCoin, sortCoinList, setFieldValue } from '../redux/actionCreators';
import TextareaAutosize from 'react-textarea-autosize';

function CustomCoins() {
    const { customCoins } = useSelector(state => ({
        customCoins: state.customCoins
    }), shallowEqual);

    const dispatch = useDispatch();
    if (customCoins.length === 0)
        return (null);

    return (
        <>
            <b>Custom coins (ICO, Private sales )</b>
            <Headers />
            {customCoins.map((x) =>
                <Row key={x.id} className="portfolio-table__row">
                    <Col xs={2} lg={2}>{x.label}</Col>
                    <Col xs={3} lg={2}>
                        <input
                            type="number"
                            placeholder="count"
                            value={x.amount || 0}
                            onChange={(e) => dispatch(setFieldValue(x.id, "amount", parseFloat(e.target.value)))}
                            onKeyPress={(event) => {
                                if (event.key === "Enter")
                                    dispatch(sortCoinList());
                            }}
                            onBlur={() => dispatch(sortCoinList())}
                            className="form-control ds-input" />
                    </Col>
                    <Col xs={4} lg={4}>
                        <TextareaAutosize
                            type="text"
                            rows={1}
                            placeholder="Notes"
                            style={{ overflow: "hidden" }}
                            value={x.notes}
                            onChange={(e) => dispatch(setFieldValue(x.id, "notes", e.target.value))}
                            className="form-control ds-input" />
                    </Col>
                    <Col xs={2} lg={2}>
                        <Button className="btn btn-danger"
                            onClick={() => {
                                dispatch(removeCoin(x.id));
                            }}>
                            Delete
                        </Button>
                    </Col>
                </Row>
            )}
        </>
    );
};

let Headers = () => <Row className="portfolio-table__headers">
    <Col xs={2} lg={2}>Coin</Col>
    <Col xs={3} lg={2}>Invested Amount</Col>
    <Col xs={4} lg={4}>Notes</Col>
    <Col xs={1} lg={1}></Col>
</Row>

export default CustomCoins;