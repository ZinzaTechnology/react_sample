// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as _ from 'lodash'
import Datetime from 'react-datetime'
import moment from 'moment'

import withCommonInputWrapper from './with_common_input_wrapper'

import 'react-datetime/css/react-datetime.css'


class DatetimePicker extends Component {
  constructor(props) {
    super(props)
    this.state = {
      startDate: moment()
    }
  }
  
  handleDateChange(momentObject) {
    if (this.props.onInputChange) {
      let event = {
        target: {
          name: this.props.name,
          value: momentObject.format("YYYY/MM/DD HH:mm:ss"),
        }
      }
      this.props.onInputChange(event)
    }
  }

  render() {
    return (
      <Datetime
        name={this.props.name}
        value={this.props.value}
        onChange={this.handleDateChange.bind(this)}
        inputProps={{
          required: this.props.required,
          placeholder: "Enter " + _.lowerCase(_.startCase(this.props.name)),
        }}
      />
    )
  }
}

const DatetimePickerWithWrapper = withCommonInputWrapper(DatetimePicker)

export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(DatetimePickerWithWrapper)
