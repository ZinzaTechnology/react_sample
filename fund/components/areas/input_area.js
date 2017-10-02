// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ItemHeading from '../item_inputs/item_heading'
import ItemImage from '../item_inputs/item_image'
import ItemLink from '../item_inputs/item_link'
import ItemQuote from '../item_inputs/item_quote'
import ItemSubHeading from '../item_inputs/item_sub_heading'
import ItemText from '../item_inputs/item_text'

const inputConponents = {
  ItemHeading: ItemHeading,
  ItemSubHeading: ItemSubHeading,
  ItemImage: ItemImage,
  ItemLink: ItemLink,
  ItemQuote: ItemQuote,
  ItemText: ItemText,
}

class InputArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  render() {
    return (
      <div>
        <h3>Fund Items</h3>
        {
          this.props.itemList.map((value, index) => {
            let _value = value.toJS()
            let Input = inputConponents[_value.target_type]
            return (_value._destroy != 1 &&
              <Input key={index} {..._value} itemListCount={this.props.itemList.size} />
            )
          })
        }
      </div>
    );
  }
}

export default connect(
  (state) => {
    return {
      itemList: state.item.get('itemList')
    }
  },
  (dispatch) => ({
  })
)(InputArea)
