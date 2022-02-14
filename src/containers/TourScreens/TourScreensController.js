import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {setFirstTime} from '../../actions/GeneralActions';

import TourScreensView from './TourScreensView';

class TourScreensController extends React.Component {
  state = {
    currentPage: 0,
    lastPage: 0,
  };
  static propTypes = {};
  static defaultProps = {};
  scrollEnd = (currentPage, lastPage) => {
    this.setState({currentPage, lastPage});
  };
  buttonClick = () => {
    if (this.state.currentPage < 2) {
      this.swiper.scrollBy(1);
    } else {
      this.skip();
    }
  };
  skip = () => {
    this.props.setFirstTime();
    _.isEmpty(this.props.user.token)
      ? Actions.reset('login')
      : Actions.reset('drawerMenu');
  };
  render() {
    return (
      <TourScreensView
        {...this.props}
        scrollEnd={this.scrollEnd}
        buttonClick={this.buttonClick}
        swiperRef={ref => (this.swiper = ref)}
        skip={this.skip}
      />
    );
  }
}
const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {setFirstTime};

export default connect(
  mapStateToProps,
  actions,
)(TourScreensController);
