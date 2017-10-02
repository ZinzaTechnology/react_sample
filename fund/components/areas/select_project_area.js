// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import ProjectSelect from '../project_inputs/project_select'

class SelectProjectArea extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleAddProjectButtonClick(event) {
    event.preventDefault()
    this.props.itemActions.addProjectList({
      project: {},
      amount: '',
      disabled: false,
      sort_rank: this.props.projectList.size, // Add to bottom
    })
  }

  render() {
    return (
      <div>
        <h3>Select Project</h3>
        <div className="row">
          <button className="btn btn-primary" onClick={this.handleAddProjectButtonClick.bind(this)}>
            Add Project
          </button>
        </div>
        {
          this.props.projectList.map((value, index) => {
            let _value = value.toJS()
            return (_value._destroy != 1 &&
              <ProjectSelect
                key={index}
                projectDetail={_value}
                amount={_value.amount}
                sort_rank={_value.sort_rank}
                disabled={_value.disabled}
              />
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
      projectList: state.item.get('projectList')
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(SelectProjectArea)
