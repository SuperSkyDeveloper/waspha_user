import React from 'react';
import PropTypes from 'prop-types';
import CompanyPolicyView from './CompanyPolicyView';
import {connect} from 'react-redux';
import {getShopPolicyRequest} from '../../actions/ShopsActions';

class CompanyPolicyController extends React.Component {
  constructor() {
    super();
    this.state = {
      policy: '',
      loading: false,
    };
  }
  static propTypes = {shopId: PropTypes.number};
  static defaultProps = {};

  componentDidMount() {
    const {getShopPolicyRequest, shopId, appLanguage} = this.props;
    const payload = {
      store_id: shopId,
      language: appLanguage,
    };
    this.setState({loading: true});
    getShopPolicyRequest(payload, response => {
      if (response.status) {
        this.setState({policy: response.data.policy, loading: true});
      }
      this.setState({loading: false});
    });
  }

  render() {
    const {policy, loading} = this.state;
    return (
      <CompanyPolicyView policy={policy} loading={loading} {...this.props} />
    );
  }
}

const mapStateToProps = ({general}) => ({
  appLanguage: general.appLanguage,
});

const actions = {getShopPolicyRequest};

export default connect(
  mapStateToProps,
  actions,
)(CompanyPolicyController);
