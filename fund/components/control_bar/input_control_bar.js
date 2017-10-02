// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class InputControlBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleAddInputButtonClick(event) {
    event.preventDefault()
    this.props.itemActions.addItemList({
      target_type: event.target.name,
      edit_mode: true, // New item is editable by default
      sort_rank: this.props.itemList.size, // Add to bottom
    })
  }

  render() {
    return (
      <div style={{ paddingTop: '20px', paddingBottom: '20px' }}>
        <span className="text-muted small">Add item</span>
        <p>
          <button
            className="btn btn-default add-item-button"
            id="add-item-header-button"
            name="ItemHeading"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
          <button
            className="btn btn-default add-item-button"
            id="add-item-sub-header-button"
            name="ItemSubHeading"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
          <button
            className="btn btn-default add-item-button"
            id="add-item-text-button"
            name="ItemText"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
          <button
            className="btn btn-default add-item-button"
            id="add-item-image-button"
            name="ItemImage"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
          <button
            className="btn btn-default add-item-button"
            id="add-item-link-button"
            name="ItemLink"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
          <button
            className="btn btn-default add-item-button"
            id="add-item-quote-button"
            name="ItemQuote"
            onClick={this.handleAddInputButtonClick.bind(this)}>
          </button>
        </p>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      itemList: state.item.get('itemList')
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(InputControlBar)
