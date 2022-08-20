import React from 'react';
import { Card, CardBody, CardFooter, Button, CardHeader } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Cheese', type: 'cheese' }
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="me-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Less</button>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>More</button>
        </div>
    )
}

function Controls(props) {
    return (
        <div className='container ml-md-5' style={{ textAlign: "center" }}>
            <Card style={{ margin: '30px 0', textAlign: "center" }}>
                <CardHeader
                    style={{ backgroundColor: '#d70f64', color: "white" }}
                >Add ingredient</CardHeader>
                <CardBody>
                    {controls.map(({ label, type }) =>
                        <BuildControl
                            key={Math.random()}
                            label={label}
                            type={type}
                            added={() => props.ingredientAdded(type)}
                            removed={() => props.ingredientRemoved(type)}
                        />)}
                </CardBody>
                <CardFooter>Price: <strong>{props.price}</strong> BDT</CardFooter>
                <Button
                    onClick={props.toggleModal}
                    disabled={!props.purchassble}
                >
                    Order now
                </Button>
            </Card>
        </div>
    )
}

export default Controls