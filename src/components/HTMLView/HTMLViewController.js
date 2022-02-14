import React, {Component} from 'react';
import {Text, View} from 'react-native';
import HTMLViewView from './HTMLViewView';
import PropTypes from 'prop-types';
import util from '../../util';
import _ from 'lodash';
import {Fonts, Colors} from '../../theme';
export default class HTMLViewController extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static propTypes = {
    htmlContent: PropTypes.string.isRequired,
    style: PropTypes.object,
    spanStyle: PropTypes.object,
    numberOfLines: PropTypes.string,
    ellipsizeMode: PropTypes.string,
    textAlign: PropTypes.oneOf(['auto', 'left', 'right', 'center', 'justify']),
    size: PropTypes.oneOfType([
      PropTypes.oneOf(_.keys(Fonts.size)),
      PropTypes.number,
    ]),
    children: PropTypes.node.isRequired,
    type: PropTypes.oneOf(_.keys(Fonts.type)),
  };
  static defaultProps = {
    style: {},
    spanStyle: {},
    numberOfLines: 0,
    ellipsizeMode: 'clip',
    textAlign: util.rtlRightText(),
    type: 'base',
    color: 'primary',
    size: 'normal',
  };

  render() {
    const {htmlContent, spanStyle, style} = this.props;
    return (
      <HTMLViewView
        htmlContent={htmlContent}
        style={style}
        spanStyle={spanStyle}
        {...this.props}
      />
    );
  }
}
