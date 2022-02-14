import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import AdditionalNoteView from './AdditionalNoteView';
import {connect} from 'react-redux';
import util from '../../util';
import {Actions} from 'react-native-router-flux';
import {addCartProduct} from '../../actions/CartActions';
import {strings} from '../../constants';
const refNote = React.createRef();
class AdditionalNoteController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalNote: _.isNil(props.item.additional_notes)
        ? ''
        : props.item.additional_notes,
      additionalNoteError: '',
    };
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    addCartProduct: PropTypes.func,
  };
  static defaultProps = {
    addCartProduct: () => {},
  };

  setValue = key => {
    this.setState(key);
  };

  //  focus on fields
  additionalNoteFocus = () => {
    this.additionalNoteRef.focus();
  };

  validation = () => {
    const {additionalNote, additionalNoteError} = this.state;
    if (_.isEmpty(additionalNote)) {
      this.setState({
        additionalNoteError: strings.ADDITIONAL_NOTES_ARE_REQ,

        //util.isRequiredErrorMessage( strings.ADDITIONAL_NOTES,),
      });
      this.additionalNoteFocus();
      return false;
    }
    return true;
  };

  handleSubmit = () => {
    if (this.validation()) {
      this.setState({
        additionalNoteError: '',
      });
      this.handleUpdateNotesOfProduct();
      Actions.pop();
    }
  };

  handleUpdateNotesOfProduct = () => {
    const {item} = this.props;

    let tempProduct = _.cloneDeep(item);
    tempProduct['additional_notes'] = this.state.additionalNote;
    this.props.addCartProduct(tempProduct);
  };

  render() {
    const {additionalNote, additionalNoteError} = this.state;
    return (
      <AdditionalNoteView
        {...this.props}
        refNote={refNote}
        additionalNote={additionalNote}
        additionalNoteError={additionalNoteError}
        setValue={this.setValue}
        handleSubmit={this.handleSubmit}
        additionalNoteRef={ref => {
          this.additionalNoteRef = ref;
        }}
      />
    );
  }
}

const mapStateToProps = ({}) => ({});

const actions = {addCartProduct};

export default connect(
  mapStateToProps,
  actions,
)(AdditionalNoteController);
