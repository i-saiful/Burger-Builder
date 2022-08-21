import React from 'react';

function Order(props) {
    // console.log(props);
    const ingredientSummary = props.order.ingredients.map(item =>
        <span key={item.type}
            style={{
                border: "1px solid gray",
                borderRadius: '5px',
                padding: '5px',
                marginRight: '10px'
            }}
        >
            {item.amount} x <span
                style={{
                    textTransform: 'capitalize'
                }}
            >{item.type}</span>
        </span>
    )
    return (
        <div style={{
            border: "1px solid gray",
            boxShadow: '1px 1px #888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px'
        }}>
            <p>Order Number: {props.order.id}</p>
            <p>Delivary Address: {props.order.customer.delivaryAddress}</p>
            <hr />
            {ingredientSummary}
            <hr />
            <p>Price: {props.order.price} BDT</p>
        </div>
    )
}

export default Order