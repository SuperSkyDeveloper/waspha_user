import React from 'react';
import PropTypes from 'prop-types';
import TermsAndConditionsView from './TermsAndConditionsView';
import {connect} from 'react-redux';
import {getTermsAndConditionsRequest} from '../../actions/GeneralActions';

class TermsAndConditionsController extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }
  static propTypes = {};
  static defaultProps = {};

  componentDidMount() {
    const {getTermsAndConditionsRequest} = this.props;

    this.setState({loading: true});
    getTermsAndConditionsRequest(response => {
      if (response.status) {
      }
      this.setState({loading: false});
    });
  }

  render() {
    const {loading} = this.state;
    return <TermsAndConditionsView loading={loading} {...this.props} />;
  }
}

const mapStateToProps = ({general}) => ({
  termsAndConditions: general.termsAndConditions,
});

const actions = {getTermsAndConditionsRequest};

export default connect(
  mapStateToProps,
  actions,
)(TermsAndConditionsController);
