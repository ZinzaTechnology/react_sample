// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import withItemInputWrapper from './with_item_input_wrapper'

class ItemHeading extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
    this.payload = {
      target_type: this.props.target_type,
      sort_rank: this.props.sort_rank,
    }
    // Fund item edit
    if (this.props.id) {
      this.payload.id = this.props.id
    }
  }

  handleChange(event) {
    this.payload[event.target.name] = event.target.value
    this.payload.edit_mode = this.props.edit_mode
    this.props.itemActions.updateItemInputContent(this.payload)
  }

  render() {
    if (this.props.edit_mode) {
      // Editable mode
      return (
        <div>
          <div className="panel-heading"><label className="small">Header</label></div>
          <div className="panel-body">
            <input
              type="text"
              className="form-control"
              placeholder="Enter Header"
              name="title"
              onChange={this.handleChange.bind(this)}
              value={this.props.title}
            />
          </div>
        </div>
      )
    } else {
      // View mode
      return (
        <div className="item-header">
          <h1>{this.props.title}</h1>
        </div>
      )
    }
  }
}

const HeaderInputWithWrapper = withItemInputWrapper(ItemHeading)

export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(HeaderInputWithWrapper)
