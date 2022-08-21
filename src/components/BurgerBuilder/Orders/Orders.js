import React, { Component } from 'react';
import {connect} from 'react-redux';
import { fetchOrders } from '../../../Redux/actionCreators';

const mapDispatchToProps = dispatch => {
  return {
    fetchOrders: () => dispatch(fetchOrders())
  }
}

class Orders extends Component {

  componentDidMount() {
    this.props.fetchOrders()
  }

  render() {
    return (
      <div>Orders</div>
    )
  }
}

export default connect(null, mapDispatchToProps)(Orders)