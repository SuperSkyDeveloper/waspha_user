import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import NearByStoreItemView from './NearByStoreItemView';
import {getCategoryDetailsRequest} from '../../actions/CategoriesActions';

class NearByStoreItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      showCustomTime: false,
    };
  }
  static propTypes = {
    badge: PropTypes.bool,
    badgeText: PropTypes.string,
    item: PropTypes.object,
    category: PropTypes.object,
    subCategory: PropTypes.object,
    getCategoryDetailsRequest: PropTypes.func,
  };
  static defaultProps = {
    badge: false,
    badgeText: '',
    item: {},
    category: {},
    subCategory: {},
    getCategoryDetailsRequest: () => {},
  };

  setValue = key => {
    this.setState(key);
  };

  onItemPress = () => {
    const {
      category,
      subCategory,
      item,
      getCategoryDetailsRequest,
      appLanguage,
    } = this.props;
    const payload = {
      category_id: category.id,
      language: appLanguage,
    };

    if (_.isEmpty(category)) {
      this.setState({loading: true});

      getCategoryDetailsRequest(payload, response => {
        if (response.status) {
          this.setState({loading: false});

          Actions.vendorProfile({shopId: item.id, category: response.data});
        } else {
          this.setState({loading: false});
        }
      });
    } else {
      Actions.vendorProfile({shopId: item.id, category, subCategory});
    }
  };

  render() {
    const {loading} = this.state;
    return (
      <NearByStoreItemView
        loading={loading}
        setValue={this.setValue}
        showCustomTime={this.state.showCustomTime}
        onItemPress={this.onItemPress}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({general}) => ({
  appLanguage: general.appLanguage,
});

const actions = {getCategoryDetailsRequest};

export default connect(
  mapStateToProps,
  actions,
)(NearByStoreItemController);
