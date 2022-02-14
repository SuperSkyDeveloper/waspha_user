import React from 'react';
import PropTypes from 'prop-types';
import ReOrderView from './ReOrderView';
import {connect} from 'react-redux';
import {getReOrderListRequest} from '../../actions/OrdersActions';

class ReOrderController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {
    reOrderList: PropTypes.array,
    rfpVendors: PropTypes.array.isRequired,
    storeId: PropTypes.number.isRequired,
  };
  static defaultProps = {
    reOrderList: [
      {
        id: 0,
        proposal_id: 12,
        order_date: '2020-12-09T09:48:35.000Z',
        totalAmount: 2703.75,
        description: 'Biryani,korma,Pulao,Kunna',
      },

      {
        id: 1,
        proposal_id: 13,

        order_date: '2020-12-09T09:48:35.000Z',
        totalAmount: 2703.75,
        description: 'Biryani,korma,Pulao,Kunna',
      },

      {
        id: 2,
        proposal_id: 14,

        order_date: '2020-12-09T09:48:35.000Z',
        totalAmount: 2703.75,
        description: 'Biryani,korma,Pulao,Kunna',
      },
      {
        id: 3,
        proposal_id: 18,
        order_date: '2020-12-09T09:48:35.000Z',
        totalAmount: 2703.75,
        description: 'Biryani,korma,Pulao,Kunna',
      },
    ],
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getReOrderListRequest} = this.props;
    this.setState({loading: true});
    const payload = {
      store_id: this.props.storeId,
    };
    getReOrderListRequest(payload, response => {
      this.setState({loading: false});

      if (response) {
      }
    });
  };

  render() {
    const {loading} = this.state;
    return <ReOrderView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({orders}) => ({
  reOrderList: orders.reOrderList,
});

const actions = {getReOrderListRequest};

export default connect(
  mapStateToProps,
  actions,
)(ReOrderController);
