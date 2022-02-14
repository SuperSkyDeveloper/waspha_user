import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import BottomSheet from 'react-native-bottomsheet';
import {connect} from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import ImagePickerView from './ImagePickerView';
import {strings} from '../../constants';
import util from '../../util';
import {alertMessage} from '../../actions/GeneralActions';

class ImagePickerController extends React.Component {
  constructor() {
    super();
    this.state = {image: '', loading: false};
  }
  static propTypes = {
    showPickerModal: PropTypes.bool,
    closeModal: PropTypes.func,
    addImage: PropTypes.func,
    itemIndex: PropTypes.number,
  };
  static defaultProps = {
    showPickerModal: false,
    addImage: () => {},
    closeModal: () => {},
    itemIndex: null,
  };

  handleSelectImagePress = () => {
    BottomSheet.showBottomSheetWithOptions(
      {
        options: [strings.CAMERA, strings.GALLERY, strings.CLOSE],
        title: strings.UPLOAD_IMAGE,
        dark: false,
        cancelButtonIndex: 2,
      },
      value => {
        if (value === 0) {
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
            useFrontCamera: true,
          }).then(image => {
            this.setState({
              image: image,
            });
          });
        }
        if (value === 1) {
          ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
          }).then(image => {
            this.setState({
              image: image,
            });
          });
        }
      },
    );
  };

  onModalClose = () => {
    const {closeModal} = this.props;
    this.setState({image: ''});
    closeModal();
  };
  handleUploadPress = () => {
    const {image} = this.state;
    const {addImage, itemIndex} = this.props;

    if (itemIndex !== null) {
      addImage(image, itemIndex);
    } else {
      addImage(image);
    }

    this.setState({loading: false});
  };

  setValue = (key, callback) => {
    this.setState(key, callback);
  };

  render() {
    const {image, loading} = this.state;
    return (
      <ImagePickerView
        image={image}
        loading={loading}
        setValue={this.setValue}
        handleUploadPress={this.handleUploadPress}
        onModalClose={this.onModalClose}
        handleSelectImagePress={this.handleSelectImagePress}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {
  alertMessage,
};

export default connect(
  mapStateToProps,
  actions,
)(ImagePickerController);
