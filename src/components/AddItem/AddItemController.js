import React from 'react';
import PropTypes from 'prop-types';
import AddItemView from './AddItemView';
import {connect} from 'react-redux';

class AddItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadImagePicker: false,
      itemImage: '',
      imageBase64: '',
      itemTitle: '',
      itemReq: '',
    };
  }
  static propTypes = {
    itemTitle: PropTypes.string,
    itemRequirements: PropTypes.string,
    itemImage: PropTypes.string,
    itemImageBase64: PropTypes.string,
    setValue: PropTypes.func,
  };
  static defaultProps = {
    itemTitle: '',
    itemRequirements: '',
    itemImage: '',
    itemImageBase64: '',
    setValue: () => {},
  };

  closeImagePickerModal = () => {
    this.setState({uploadImagePicker: false});
  };

  openImagePickerModal = () => {
    this.setState({uploadImagePicker: true});
  };

  addItemImage = (itemImage, imageBase64) => {
    this.setState({itemImage, imageBase64});
  };

  render() {
    const {uploadImagePicker, itemImage, itemTitle, itemReq} = this.state;
    return (
      <AddItemView
        itemTitle={itemTitle}
        itemReq={itemReq}
        itemImage={itemImage}
        openImagePickerModal={this.openImagePickerModal}
        closeImagePickerModal={this.closeImagePickerModal}
        setValue={data => this.setValue(data)}
        addItemImage={this.addItemImage}
        uploadImagePicker={uploadImagePicker}
        {...this.props}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {};

export default connect(
  mapStateToProps,
  actions,
)(AddItemController);
