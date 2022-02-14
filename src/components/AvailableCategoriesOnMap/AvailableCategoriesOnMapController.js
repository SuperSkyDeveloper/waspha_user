import React from 'react';
import {Animated} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import AvailableCategoriesOnMapView from './AvailableCategoriesOnMapView';
import {ANIMATION_DURATION} from '../../constants';

class AvailableCategoriesOnMapController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCategoryCollapsed: false,
      isSubCategoryCollapsed: false,
      parentCategories: [],
      subCategories: [],
      selectedCategory: {},
      selectedSubCategory: {},
      activeOption: '',
    };

    this._animatedCategories = new Animated.Value(1);
    this._animatedSubCategories = new Animated.Value(0.1);
  }
  static propTypes = {
    availableCategories: PropTypes.array,
    selectCategory: PropTypes.func,
    userLocationOn: PropTypes.bool,
    filteredVendors: PropTypes.array,
  };
  static defaultProps = {
    availableCategories: [],
    selectCategory: () => {},
    userLocationOn: false,
    filteredVendors: [],
  };

  componentDidMount() {
    this.getParentCategories();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.availableCategories !== this.props.availableCategories) {
      this.getParentCategories();
    }
  }

  categoriesScrollToStart = () => {
    this.mainCategoriesRef.scrollToOffset({animated: true, x: 1});
  };

  subCategoriesScrollToStart = () => {
    this.subCategoriesRef.scrollToOffset({animated: true, x: 1});
  };

  getParentCategories = () => {
    const {availableCategories} = this.props;
    let parentCategories = availableCategories.filter(category => {
      return category.parent_id === null;
    });

    this.setState({parentCategories});
    this.animateCategories();
    this.animateSubCategories();
  };

  animateCategories = () => {
    Animated.timing(this._animatedCategories, {
      toValue: this.state.isCategoryCollapsed ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  animateSubCategories = () => {
    Animated.timing(this._animatedSubCategories, {
      toValue: this.state.isSubCategoryCollapsed ? 1 : 0,
      duration: ANIMATION_DURATION,
      useNativeDriver: true,
    }).start();
  };

  onCategoryPress = item => {
    const {isCategoryCollapsed} = this.state;
    const {availableCategories, selectCategory} = this.props;

    selectCategory(item, isCategoryCollapsed);
    let subCategories = availableCategories.filter(category => {
      return category.parent_id === item.id;
    });

    this.setState(
      {
        isCategoryCollapsed: !isCategoryCollapsed,
        isSubCategoryCollapsed: false,
        selectedCategory: item,
        selectedSubCategory: {},
        subCategories,
      },
      this.animateCategories,
      this.animateSubCategories,
    );
  };

  onSubCategoryPress = item => {
    const {isSubCategoryCollapsed} = this.state;
    this.setState(
      {
        isSubCategoryCollapsed: !isSubCategoryCollapsed,
        selectedSubCategory: item,
      },
      this.animateSubCategories,
    );
  };

  setValue = key => {
    this.setState(key);
  };

  render() {
    const {
      isCategoryCollapsed,
      selectedCategory,
      selectedSubCategory,
      isSubCategoryCollapsed,
      parentCategories,
      subCategories,
    } = this.state;
    return (
      <AvailableCategoriesOnMapView
        selectedSubCategory={selectedSubCategory}
        isSubCategoryCollapsed={isSubCategoryCollapsed}
        parentCategories={parentCategories}
        subCategories={subCategories}
        selectedCategory={selectedCategory}
        isCategoryCollapsed={isCategoryCollapsed}
        animatedCategories={this._animatedCategories}
        animatedSubCategories={this._animatedSubCategories}
        onCategoryPress={this.onCategoryPress}
        onSubCategoryPress={this.onSubCategoryPress}
        activeOption={this.state.activeOption}
        setValue={data => this.setValue(data)}
        mainCategoriesRef={ref => {
          this.mainCategoriesRef = ref;
        }}
        subCategoriesRef={ref => {
          this.subCategoriesRef = ref;
        }}
        categoriesScrollToStart={this.categoriesScrollToStart}
        subCategoriesScrollToStart={this.subCategoriesScrollToStart}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({categories, user}) => ({
  availableCategories: categories.availableCategories,
  userLocationOn: user.userLocationOn,
});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(AvailableCategoriesOnMapController);
