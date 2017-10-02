// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'

import withCommonInputWrapper from './with_common_input_wrapper'

class TextInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <input
        placeholder={"Enter " + _.lowerCase(_.startCase(this.props.name))}
        className="form-control"
        type="text"
        name={this.props.name}
        value={this.props.value}
        disabled={this.props.disabled}
        onChange={this.props.onInputChange.bind(this)}
        required={this.props.required}
      />
    )
  }
}

const TextInputWithWrapper = withCommonInputWrapper(TextInput)

export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(TextInputWithWrapper)
