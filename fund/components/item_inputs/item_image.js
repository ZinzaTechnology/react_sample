// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as Api from '../../constants/api_action'
import withItemInputWrapper from './with_item_input_wrapper'

class ItemImage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      file: '',
      imagePreviewUrl: this.props.source_url 
        ? this.props.source_url 
        : (this.props.image && this.props.image.url) 
          ? this.props.image.url : '',
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

  handleImageChange(event) {
    event.preventDefault()

    let reader = new FileReader()
    let file = event.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)

    // FormData
    let form = new FormData()
    form.append('item_image[image]', file)
    // Upload image
    fetch(Api.IMAGE_UPLOAD_API, {
      method: 'POST',
      headers: {
        'X-Operator-Token': this.props.apiToken
      },
      body: form
    }).then(
      response => response.json()
    ).then(
      success => {
        // console.log(success)
        this.handleChange({
          target: {
            name: 'target_id',
            value: success.id,
          }
        })
      }
    ).catch(
      error => {
        //console.log(error)
      }
    )
  }

  render() {
    let {imagePreviewUrl} = this.state
    let imagePreview = null
    if (imagePreviewUrl) {
      imagePreview = (<img src={imagePreviewUrl} />)
    } else {
      imagePreview = (<div className="previewText">Please select an Image for Preview</div>)
    }

    if (this.props.edit_mode) {
      // Editable mode
      return (
        <div>
          <div className="panel-heading"><label className="small">Image</label></div>
          <div className="panel-body">
            <div className="imgPreview">
              {imagePreview}
            </div>
            <input
              type="file"
              className="form-control"
              placeholder="Enter name"
              name="image"
              onChange={this.handleImageChange.bind(this)}
            />
            <div className="form-group" hidden>
              <label>Or insert source url</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Source"
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
        <div className="panel-body">
          <div className="imgPreview">
            {imagePreview}
          </div>
        </div>
      )
    }
  }
}

const ImageInputWithWrapper = withItemInputWrapper(ItemImage)

export default connect(
  (state) => {
    return {
      apiToken: state.app.get('apiToken'),
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(ImageInputWithWrapper)
