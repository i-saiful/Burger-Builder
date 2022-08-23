import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../Redux/actionCreators';
import Order from './Order/Order';
import Spinner from '../../Spinner/Spinner';

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: (token) => dispatch(fetchOrders(token))
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders,
    orderLoading: state.orderLoading,
    orderError: state.orderError,
    token: state.token
  }
}

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders(this.props.token)
  }

  componentDidUpdate() {
    // console.log(this.props.orders)
  }

  render() {
    let orders = null;
    if (this.props.orderError) {
      orders = <p
        style={{
          border: "1px solid gray",
          boxShadow: '1px 1px #888',
          borderRadius: '5px',
          padding: '20px',
          marginBottom: '10px'
        }}
      >Sorry failed to load order!</p>
    } else {
      if (this.props.orders.length) {
        orders = this.props.orders.map(order =>
          <Order order={order} key={order.id} />
        )
      } else {
        orders = <p
          style={{
            border: "1px solid gray",
            boxShadow: '1px 1px #888',
            borderRadius: '5px',
            padding: '20px',
            marginBottom: '10px'
          }}
        >you have no order!</p>
      }
    }
    return (
      <div>{this.props.orderLoading ? <Spinner /> : orders}</div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders)