import React from 'react';
import PropTypes from 'prop-types';
import AddressListItemView from './AddressListItemView';
import {connect} from 'react-redux';

class AddressListItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    openRemoveAddressModal: PropTypes.func,
  };
  static defaultProps = {openRemoveAddressModal: () => {}};

  render() {
    return <AddressListItemView {...this.props} />;
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(AddressListItemController);
