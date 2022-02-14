import React from 'react';
import _, {isEmpty} from 'lodash';
import PropTypes from 'prop-types';
import OrderItemAccordianView from './OrderItemAccordianView';
import {connect} from 'react-redux';
import {PERMISSION, ORDER_ITEM_TYPE, MODAL_TYPE} from '../../constants';
import {helper, constains} from '../../s3Helper';
const reftitle = React.createRef();
const refDes = React.createRef();
const refRemark = React.createRef();
class OrderItemAccordianController extends React.Component {
  constructor() {
    super();
    this.state = {
      isImgUploadVisible: false,
      imgModalFor: '',
      productItemData: {},

      title: '',
      imageData: {},
      remark: '',
      quantity: '',
      price: '',
      tax: '',
      description: '',
      remarkImg: {},
    };
  }
  static propTypes = {
    data: PropTypes.object.isRequired,
    itemType: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    active: PropTypes.bool.isRequired,
    toggleAccordinPress: PropTypes.func.isRequired,
    onAnyChangeField: PropTypes.func,
    handleRemovePrdItem: PropTypes.func,
    showRemoveImgBtn: PropTypes.bool,

    // new
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onAnyChangeField: () => {},
    handleRemovePrdItem: () => {},
    onChange: () => {},
    showRemoveImgBtn: false,
  };

  config = {
    orderPlaceItems: {
      title: PERMISSION.WRITE,
      removeItem: PERMISSION.WRITE,
      price: PERMISSION.HIDE,
      quantity: PERMISSION.WRITE,
      quantityRead: PERMISSION.HIDE,
      requirements: PERMISSION.WRITE,
      requirementsImage: PERMISSION.WRITE,
      remarks: PERMISSION.HIDE,
      remarksImage: PERMISSION.HIDE,
    },

    createProposalForNewItems: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.HIDE,
      quantity: PERMISSION.WRITE,
      quantityRead: PERMISSION.READ,
      requirements: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.WRITE,
      remarksImage: PERMISSION.WRITE,
    },

    onlyForRead: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.HIDE,
      quantityRead: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.READ,
      remarksImage: PERMISSION.READ,
    },

    deliveryDetails: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.READ,
      quantityRead: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.READ,
      remarksImage: PERMISSION.READ,
    },

    forProposal: {
      title: PERMISSION.READ,
      removeItem: PERMISSION.HIDE,
      price: PERMISSION.READ,
      quantity: PERMISSION.READ,
      requirements: PERMISSION.READ,
      quantityRead: PERMISSION.READ,
      requirementsImage: PERMISSION.READ,
      remarks: PERMISSION.READ,
      remarksImage: PERMISSION.READ,
      promotions: PERMISSION.READ,
    },
  };

  requirementsFocus = () => {
    this.requirementsRef.focus();
  };

  isAllowedtoRead(perm) {
    return perm === PERMISSION.READ;
  }

  isAllowedtoWrite(perm) {
    return perm === PERMISSION.WRITE;
  }

  // handle if write true only then show placeholder
  isPlaceholderVisible = (condtion, text) => {
    return condtion ? text : '';
  };

  // handle image upload modal show or hide

  handleImgModal = modalType => {
    // modalType check modal for upload img or revision img

    if (
      modalType == MODAL_TYPE.PRDOUCT_IMG ||
      modalType == MODAL_TYPE.PRDOUCT_IMG_REMARKS
    ) {
      this.setState({imgModalFor: modalType});
    }

    let temp = _.cloneDeep(this.state.isImgUploadVisible);
    this.setState({isImgUploadVisible: !temp});
  };

  // handle image upload
  addItemImage = async (itemImage, itemIndex) => {
    if (!_.isEmpty(itemImage)) {
      this.setState({isImgUploadVisible: !this.state.isImgUploadVisible});
    }
    let data = '';
    let payload = '';
    if (!_.isEmpty(itemImage)) {
      payload = {
        uri: itemImage.path,
        fileType: itemImage.mime,
      };

      data = await helper.uploadImageOnS3(
        payload,
        constains.folderList.PRODUCTS,
      );
    }

    if (this.state.imgModalFor === MODAL_TYPE.PRDOUCT_IMG_REMARKS) {
      // callback function
      const imageData = {
        image: data,
      };

      this.props.onChange('remarksImgData', itemIndex, imageData);
    } else {
      const imageData = {
        image: data,
      };

      this.props.onChange('image', itemIndex, imageData);
    }
  };

  render() {
    const {isImgUploadVisible, imgModalFor} = this.state;

    return (
      <OrderItemAccordianView
        imgModalFor={imgModalFor}
        isAllowedtoRead={this.isAllowedtoRead}
        isAllowedtoWrite={this.isAllowedtoWrite}
        config={this.config}
        isPlaceholderVisible={this.isPlaceholderVisible}
        handleImgModal={this.handleImgModal}
        addItemImage={this.addItemImage}
        isImgUploadVisible={isImgUploadVisible}
        requirementsFocus={this.requirementsFocus}
        refDes={refDes}
        reftitle={reftitle}
        refRemark={refRemark}
        requirementsRef={ref => {
          this.requirementsRef = ref;
        }}
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
)(OrderItemAccordianController);
