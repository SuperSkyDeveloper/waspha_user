import React from 'react';
import PropTypes from 'prop-types';
import OrderListingItemView from './OrderListingItemView';
import {connect} from 'react-redux';
import {removeOrderSuccess} from '../../actions/OrdersActions';
import {setTimer} from '../../helpers/generalHelper';

class OrderListingItemController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expiryDuration: props.showTimer ? setTimer(props.item.expiry_time) : null,
    };
  }

  static propTypes = {
    item: PropTypes.object,
    handleRemoveItem: PropTypes.func,
    isPastRFP: PropTypes.bool,
    showTimer: PropTypes.bool,
  };
  static defaultProps = {
    item: {},
    handleRemoveItem: () => {},
    isPastRFP: false,
    showTimer: false,
  };

  render() {
    return (
      <OrderListingItemView
        {...this.props}
        expiryDuration={this.state.expiryDuration}
        handleRemove={this.handleRemove}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  removeOrderSuccess,
};

export default connect(
  mapStateToProps,
  actions,
)(OrderListingItemController);
