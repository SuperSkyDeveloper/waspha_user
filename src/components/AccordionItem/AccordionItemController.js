import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import BottomSheet from 'react-native-bottomsheet';
import {removeProposalItemSuccess} from '../../actions/OrdersActions';
import AccordionItemView from './AccordionItemView';
import {strings} from '../../constants';
import ImagePicker from 'react-native-image-crop-picker';

class AccordionItemController extends React.Component {
  constructor() {
    super();
    this.state = {
      uploadImagePicker: false,
      itemImage: '',
      imageBase64: '',
      itemTitle: '',
    };
  }
  static propTypes = {
    item: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired,
    togglePress: PropTypes.func.isRequired,
    isProposalDetail: PropTypes.bool,
    isDeliveryDetail: PropTypes.bool,
    itemRemovePress: PropTypes.func,
    comment: PropTypes.bool,
    imageUpload: PropTypes.bool,
    editAble: PropTypes.bool,
    onChangeFiled: PropTypes.func,
    fromOrderPlace: PropTypes.bool,
    isAccordionItemRemoveable: PropTypes.bool,
    btnOneFunc: PropTypes.func,
    modalType: PropTypes.string,
  };
  static defaultProps = {
    isDeliveryDetail: false,
    isProposalDetail: false,
    itemRemovePress: () => {},
    btnOneFunc: () => {},
    modalType: '',
    comment: false,
    imageUpload: false,
    editAble: false,
    fromOrderPlace: false,
    isAccordionItemRemoveable: false,
    onChangeFiled: () => {},
  };

  closeImagePickerModal = () => {
    this.setState({uploadImagePicker: false});
  };

  openImagePickerModal = () => {
    this.setState({uploadImagePicker: true});
  };

  addItemImage = (itemImage, imageBase64) => {
    this.setState({itemImage, imageBase64});
    this.closeImagePickerModal();
  };

  render() {
    const {uploadImagePicker, itemImage} = this.state;
    return (
      <AccordionItemView
        {...this.props}
        handleImagePress={this.handleImagePress}
        openImagePickerModal={this.openImagePickerModal}
        closeImagePickerModal={this.closeImagePickerModal}
        addItemImage={this.addItemImage}
        uploadImagePicker={uploadImagePicker}
        itemImage={itemImage}
      />
    );
  }
}

const mapStateToProps = ({user}) => ({
  user: user.data,
});

const actions = {
  removeProposalItemSuccess,
};

export default connect(
  mapStateToProps,
  actions,
)(AccordionItemController);
