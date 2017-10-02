// @flow
import React, { Component } from 'react'

import InputControlBarInline from '../control_bar/input_control_bar_inline'

function withItemInputWrapper(WrappedInputComponent) {
  return class extends Component {
    constructor(props) {
      super(props)
    }

    // New
    handleNewInputButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.showInputControlBarInline({sort_rank: this.props.sort_rank})
    }

    // Add
    handleAddInputButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.setItemEditMode({sort_rank: this.props.sort_rank, edit_mode: false})
    }

    // Edit
    handleEditInputButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.setItemEditMode({sort_rank: this.props.sort_rank, edit_mode: true})
    }

    // Delete
    handleDeleteInputButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.removeItemList({sort_rank: this.props.sort_rank})
    }

    // Up
    handleMoveInputUpButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.moveItem({
        sort_rank: this.props.sort_rank,
        next_sort_rank: this.props.sort_rank - 1,
      })
    }

    // Down
    handleMoveInputDownButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.moveItem({
        sort_rank: this.props.sort_rank,
        next_sort_rank: this.props.sort_rank + 1,
      })
    }

    // Top
    handleMoveInputTopButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.moveItem({
        sort_rank: this.props.sort_rank,
        next_sort_rank: 0,
      })
    }

    // Bottom
    handleMoveInputBottomButtonClick(event) {
      event.preventDefault()
      this.props.itemActions.moveItem({
        sort_rank: this.props.sort_rank,
        next_sort_rank: this.props.itemListCount - 1,
      })
    }

    render() {
      if (this.props.edit_mode) {
        return (
          <div className="panel-group">
            <div className="panel panel-default">
              <WrappedInputComponent {...this.props} />
              <div className="panel-footer">
                <button className="btn btn-primary" onClick={this.handleAddInputButtonClick.bind(this)}>
                  Save
                </button>
                <button className="btn btn-default" onClick={this.handleDeleteInputButtonClick.bind(this)}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        )
      } else {
        return (
          <div className="item">
            <InputControlBarInline sort_rank={this.props.sort_rank} />
            <div className="action-area">
              <a onClick={this.handleNewInputButtonClick.bind(this)}>New Item</a>
              <div className="pull-right">
                <a onClick={this.handleMoveInputTopButtonClick.bind(this)} hidden={this.props.sort_rank <= 0}>To TOP</a>
                <a onClick={this.handleMoveInputUpButtonClick.bind(this)} hidden={this.props.sort_rank <= 0}>Up 1 level</a>
                <a onClick={this.handleMoveInputDownButtonClick.bind(this)} hidden={this.props.sort_rank >= this.props.itemListCount - 1}>Down 1 level</a>
                <a onClick={this.handleMoveInputBottomButtonClick.bind(this)} hidden={this.props.sort_rank >= this.props.itemListCount - 1}>To BOTTOM</a>
                <a onClick={this.handleDeleteInputButtonClick.bind(this)}>Delete</a>
                <a onClick={this.handleEditInputButtonClick.bind(this)}>Edit</a>
              </div>
            </div>
            <WrappedInputComponent {...this.props} />
          </div>
        )
      }
    }
  }
}

export default withItemInputWrapper
