import React from 'react';
import PropTypes from 'prop-types';
import PromoCodeView from './PromoCodeView';
import {connect} from 'react-redux';
import {getPromoCodesRequest} from '../../actions/PromoCodesActions';

class PromoCodeController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: true,
    };
  }
  static propTypes = {promos: PropTypes.array};
  static defaultProps = {
    promos: [],
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getPromoCodesRequest} = this.props;
    getPromoCodesRequest(response => {
      this.setState({loading: false});
      if (response) {
      }
    });
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {loading} = this.state;
    return (
      <PromoCodeView
        loading={loading}
        setValue={this.setValue}
        initial={this.initial}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({promoCodes}) => ({
  promos: promoCodes.promos,
});
const actions = {getPromoCodesRequest};

export default connect(
  mapStateToProps,
  actions,
)(PromoCodeController);
