import React from 'react';
import PropTypes from 'prop-types';
import FAQSView from './FAQSView';
import {connect} from 'react-redux';
import {getFaqsRequest} from '../../actions/GeneralActions';
import util from '../../util';

class FAQSController extends React.Component {
  constructor() {
    super();
    this.state = {
      activeIndex: null,
      loading: true,
    };
  }
  static propTypes = {faqs: []};
  static defaultProps = {
    faqs: [],
  };

  componentDidMount() {
    this.initial();
  }

  initial = () => {
    const {getFaqsRequest, appLanguage} = this.props;
    getFaqsRequest({language: appLanguage}, response => {
      if (response) {
      }
      this.setState({loading: false});
    });
  };

  handleIndex = index => {
    const pressForClose = index === this.state.activeIndex;
    if (pressForClose) {
      this.setState({
        activeIndex: null,
      });
    } else {
      this.setState({
        activeIndex: index,
      });
    }
  };
  render() {
    const {activeIndex, loading} = this.state;
    return (
      <FAQSView
        handleIndex={this.handleIndex}
        activeIndex={activeIndex}
        loading={loading}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  faqs: general.faqs,
  appLanguage: general.appLanguage,
});

const actions = {getFaqsRequest};

export default connect(
  mapStateToProps,
  actions,
)(FAQSController);
