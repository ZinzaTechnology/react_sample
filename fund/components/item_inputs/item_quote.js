// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import withItemInputWrapper from './with_item_input_wrapper'

class ItemQuote extends Component {
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
          <div className="panel-heading"><label className="small">Quote</label></div>
          <div className="panel-body">
            <div className="form-group">
              <label>Quote</label>
              <textarea
                className="form-control"
                placeholder="Enter Quote"
                name="description"
                onChange={this.handleChange.bind(this)}
                value={this.props.description}
              />
            </div>

            <div className="form-group">
              <label>Source</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Source"
                name="source_title"
                onChange={this.handleChange.bind(this)}
                value={this.props.source_title}
              />
            </div>

            <div className="form-group">
              <label>Source URL</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter URL"
                name="source_url"
                onChange={this.handleChange.bind(this)}
                value={this.props.source_url}
              />
            </div>
          </div>
        </div>
      )
    } else {
      // View mode
      return (
        <div className="item-quote">
          <blockquote className="quote">
            {this.props.description}
          </blockquote>
          <span className="small">Source: <a href={this.props.source_url}>{this.props.source_title}</a></span>
        </div>
      )
    }
  }
}

const QuoteInputWithWrapper = withItemInputWrapper(ItemQuote)

export default connect(
  (state) => {
    return {
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(QuoteInputWithWrapper)
