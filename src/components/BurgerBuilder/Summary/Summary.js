import React from 'react'

function Summary(props) {
    const ingredientSummary = props.ingredients.map(item =>
        <li key={item.type}>
            <span style={{ textTransform: 'capitalize' }}>
                {item.type}
            </span>
            : {item.amount}
        </li>
    )
    return (
        <div>
            <ul>
                {ingredientSummary}
            </ul>
        </div>
    )
}

export default Summary