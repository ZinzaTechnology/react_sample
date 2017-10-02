// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'

import withCommonInputWrapper from './with_common_input_wrapper'

class DropList extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <select
        className="form-control"
        name={this.props.name}
        value={this.props.value}
        onChange={this.props.onInputChange.bind(this)}
        required={this.props.required}
      >
        <option value="" hidden></option>
        {this.props.list.map((value, key) => {
          return(
            <option key={key} value={value}>{value}</option>
          )
        })}
      </select>
    )
  }
}

const DropListWithWrapper = withCommonInputWrapper(DropList)

export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(DropListWithWrapper)
