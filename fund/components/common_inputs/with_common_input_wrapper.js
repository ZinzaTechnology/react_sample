// @flow
import React, { Component } from 'react'
import * as _ from 'lodash'

function withCommonInputWrapper(WrappedInputComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    handleDeleteInputButtonClick(event) {
      this.props.itemActions.removeItemList(this.props.sortRank)
    }

    handleInputChange(event) {
      let payload = {
        name: event.target.name,
        value: event.target.value,
      }
      this.props.itemActions.updateFundData(payload)
    }

    render() {
      return (
        <div className="panel-group">
          <div className="panel panel-default">
            <div className="panel-heading"><label className="small">{this.props.label}</label></div>
            <div className="panel-body">
              <WrappedInputComponent {...this.props} onInputChange={this.handleInputChange.bind(this)} />
            </div>
          </div>
        </div>
      )
    }
  }
}

export default withCommonInputWrapper
