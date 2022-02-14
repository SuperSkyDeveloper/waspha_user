// @flow
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import {View, Image, ImageBackground} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Actions} from 'react-native-router-flux';
import {Text, ButtonView, SearchBar, HTMLView} from '../';
import styles from './styles';
import {Images, AppStyles, Colors, Fonts, Metrics} from '../../theme';
import util from '../../util';

export default class CustomNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rightBtnActive: props.activeRightBtn,
    };
  }

  static propTypes = {
    hasBack: PropTypes.bool,
    title: PropTypes.string.isRequired,
    leftBtnImage: PropTypes.number,
    leftBtnPress: PropTypes.func,
    leftBtnText: PropTypes.string,
    rightBtnImage: PropTypes.number,
    rightBtnPress: PropTypes.func,
    rightBtnText: PropTypes.string,
    titleColor: PropTypes.string,
    hasBorder: PropTypes.bool,
    style: PropTypes.object,
    hasSearch: PropTypes.bool,
    onSearchText: PropTypes.func,
    isSearching: PropTypes.bool,
    hasBackground: PropTypes.object,
    hasBottomRadius: PropTypes.bool,
    isNavWithHeader: PropTypes.bool,
    showBackgroundColor: PropTypes.bool,
    activeRightBtn: PropTypes.bool,
    isRTL: PropTypes.bool,
  };

  static defaultProps = {
    hasBack: true,
    showBackgroundColor: true,
    titleColor: '',
    leftBtnImage: undefined,
    leftBtnPress: Actions.pop,
    leftBtnText: '',
    rightBtnImage: undefined,
    rightBtnPress: () => {},
    rightBtnText: '',
    hasBorder: true,
    style: {},
    hasSearch: false,
    onSearchText: () => {},
    isSearching: false,
    hasBackground: false,
    hasBottomRadius: false,
    isNavWithHeader: false,
    activeRightBtn: false,
    isRTL: false,
  };

  getOpacity = () => {
    console.log({btnnananna: this.state.rightBtnActive});
    if (this.state.rightBtnActive) {
      return {opacity: 0.7};
    }
    return {opacity: 1};
  };

  renderLeft(leftBtnImage, leftBtnPress, leftBtnText, hasBack, isRTL) {
    const renderBack =
      hasBack && _.isEmpty(leftBtnText) && _.isEmpty(leftBtnImage);

    return (
      <ButtonView
        onPress={leftBtnPress}
        style={util.isRTL() ? styles.btnWrapperRTL : styles.btnWrapper}>
        {!_.isEmpty(leftBtnText) && <Text>{leftBtnText}</Text>}
        {!_.isUndefined(leftBtnImage) && (
          <Image source={leftBtnImage} size={[styles.btnImage]} />
        )}
        {renderBack && (
          <Image source={Images.BackBtn} style={styles.btnImage} />
        )}
      </ButtonView>
    );
  }

  renderRight(rightBtnImage, rightBtnPress, rightBtnText) {
    // console.log({renderRight:activeRightBtn})
    return (
      <ButtonView
        onPress={rightBtnPress}
        style={[
          util.isRTL() ? styles.btnWrapperRTLRightBtn : styles.btnWrapper,
          styles.rightBtn,
        ]}>
        {!_.isEmpty(rightBtnText) && (
          <Text
            type="medium"
            numberOfLines={1}
            ellipsizeMode="tail"
            size="small">
            {rightBtnText}
          </Text>
        )}
        {!_.isUndefined(rightBtnImage) && (
          <Image
            source={rightBtnImage}
            size={styles.btnImage}
            style={this.getOpacity()}
          />
        )}
      </ButtonView>
    );
  }

  // renderTitle(title, titleColor) {
  //   return (
  //     <View style={[AppStyles.flex, AppStyles.centerInner]}>
  //       <Text
  //         color={titleColor || Colors.blue1}
  //         type="medium"
  //         numberOfLines={3}
  //         ellipsizeMode="tail"
  //         size={Fonts.size.font16}>
  //         {title || ''}
  //       </Text>
  //     </View>
  //   );
  // }

  renderTitle(title, titleColor) {
    return (
      <View style={[AppStyles.flex, AppStyles.centerInner]}>
        {/* <Text
          color={titleColor || Colors.blue1}
          type="medium"
          numberOfLines={2}
          ellipsizeMode="tail"
          size={Fonts.size.medium}
          style={{textAlign: 'center'}}>
          {title || ''}
        </Text> */}
        <HTMLView
          htmlContent={title || ''}
          color={titleColor || Colors.blue1}
          type="medium"
          numberOfLines={3}
          ellipsizeMode="tail"
          size={Fonts.size.font16}
        />
      </View>
    );
  }

  renderSearch(onSearchText, isSearching) {
    return <SearchBar onSearchText={onSearchText} isSearching={isSearching} />;
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.activeRightBtn !== this.props.activeRightBtn) {
      this.setState({rightBtnActive: this.props.activeRightBtn});
    }
  }

  render() {
    const {
      hasBack,
      title,
      leftBtnImage,
      leftBtnPress,
      leftBtnText,
      rightBtnImage,
      rightBtnPress,
      rightBtnText,
      titleColor,
      hasBorder,
      style,
      hasSearch,
      onSearchText,
      isSearching,
      hasBottomRadius,
      isNavWithHeader,
      showBackgroundColor,
      // activeRightBtn,
      isRTL,
    } = this.props;
    // const{rightBtnActive}=this.state

    // console.log({isNavWithHeader});
    // console.log({rightBtnActive});
    // console.log(isNavWithHeader === {});
    // console.log(isNavWithHeader !== {});

    const renderContent = () => {
      return (
        <>
          <View style={AppStyles.flexRow}>
            {this.renderLeft(
              leftBtnImage,
              leftBtnPress,
              leftBtnText,
              hasBack,
              isRTL,
            )}
            {this.renderTitle(title, titleColor)}
            {this.renderRight(
              rightBtnImage,
              rightBtnPress,
              rightBtnText,
              // this.state.rightBtnActive,
            )}
          </View>

          {hasSearch && (
            <View style={AppStyles.centerInner}>
              {this.renderSearch(onSearchText, isSearching)}
            </View>
          )}
        </>
      );
    };

    const navWithGradient = (
      <View
        style={{
          backgroundColor: showBackgroundColor
            ? Colors.white
            : Colors.transparent,
        }}>
        <LinearGradient
          start={{x: 0.4, y: 0}}
          end={{x: 1, y: 3}}
          colors={[Colors.resolutionBlue, Colors.violetRed]}
          style={[
            styles.container,
            hasBorder ? styles.borderBottom : {},
            hasSearch ? styles.searchHeader : {},
            hasBottomRadius && styles.borderRadius,
          ]}>
          {renderContent()}
        </LinearGradient>
      </View>
    );

    const navWithBg = (
      <ImageBackground
        source={Images.NavHeader01}
        colors={[Colors.resolutionBlue, Colors.violetRed]}
        style={[
          styles.container,
          style,
          hasBorder ? styles.borderBottom : {},
          hasSearch ? styles.searchHeader : {},
          hasBottomRadius && styles.borderRadius,
        ]}>
        {renderContent()}
      </ImageBackground>
    );

    return isNavWithHeader ? navWithBg : navWithGradient;
  }
}
