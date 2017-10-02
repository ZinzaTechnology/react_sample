// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Select from 'react-select'

import * as Api from '../../constants/api_action'

import 'react-select/dist/react-select.css'

class ProjectSelect extends Component {
  constructor(props) {
    super(props)
    let project = props.projectDetail ? props.projectDetail.project : {}
    this.state = {
      value: project ? {id: project.id, name: project.name} : {},
      options: project ? [{id: project.id, name: project.name}] : [],
      projectDetail: props.projectDetail ? props.projectDetail : {},
      amount: props.amount ? props.amount : '',
      isLoading: false
    }
  }

  handleSelectChange(newValue) {
    if (newValue && newValue.id) {
      this.setState({
        value: newValue
      })
      fetch(Api.GET_PROJECT_DETAIL_API + '?id=' + newValue.id + '&fund_id=' + this.props.fundData.toJS().id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'X-Operator-Token': this.props.apiToken
        },
      }).then(
        response => response.json()
      ).then(
        success => {
          // console.log(success)
          this.setState({
            projectDetail: success,
            amount: success.amount
          }, () => {
            this.props.itemActions.updateProjectContent({
              project: success.project,
              amount: '',
              sort_rank: this.props.sort_rank,
            })
          })
        }
      ).catch(
        error => {
          //console.log(error)
          this.setState({
            projectDetail: {},
            amount: ''
          })
        }
      )
    } else {
      this.setState({
        projectDetail: {},
        amount: ''
      })
    }
  }

  handleInputChange(inputValue) {
    if (this.state.isLoading) {
      // return if requesting api
      return
    }

    this.setState({
      isLoading: true
    })

    let data = {
      project: {
        name: inputValue,
        selected_project_ids: this.props.projectList.filter(item => item.get('_destroy') != 1).map((value) => {
          let _value = value.toJS()
          return _value.project.id
        })
      }
    }

    fetch(Api.SEARCH_PROJECT_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Operator-Token': this.props.apiToken
      },
      body: JSON.stringify(data)
    }).then(
      response => response.json()
    ).then(
      success => {
        // console.log(success)
        this.setState({
          options: success,
          isLoading: false
        })
      }
    ).catch(
      error => {
        //console.log(error)
        this.setState({
          isLoading: false
        })
      }
    )
  }

  handleAmountChange(event) {
    let amount = event.target.value
    if (this.state.projectDetail && this.state.projectDetail.project) {
      let project = this.state.projectDetail.project
      amount = Math.max(Math.min(amount, project.loan_amount), 0)
      // Update amount
      this.setState({
        amount: amount ? amount : ''
      }, () => {
        this.props.itemActions.updateProjectContent({
          project: project,
          amount: amount,
          sort_rank: this.props.sort_rank,
        })
      })
    }
  }

  handleRemoveProjectButtonClick(event) {
    event.preventDefault()
    this.props.itemActions.removeProjectList({sort_rank: this.props.sort_rank})
    // Emit project removed event to parent
    if (this.props.onProjectRemove) {
      this.props.onProjectRemove(this.state.projectDetail)
    }
  }

  render() {
    let project = this.state.projectDetail.project
    let borrower = this.state.projectDetail.borrower

    return (
      <div className="col-md-4">
        <Select
          name="form-field-name"
          value={this.state.value}
          labelKey="name"
          valueKey="id"
          clearable={false}
          options={this.state.options}
          onChange={this.handleSelectChange.bind(this)}
          onInputChange={this.handleInputChange.bind(this)}
          isLoading={this.state.isLoading}
          disabled={this.props.disabled}
        />
        <table className="table">
          <thead>
          </thead>
          <tbody>
            <tr>
              <th>供出金額</th>
              <td>
                <input
                  name="amount"
                  type="number"
                  placeholder="0"
                  disabled={!project || !project.id}
                  value={this.state.amount}
                  onChange={this.handleAmountChange.bind(this)}
                />
              </td>
            </tr>
            <tr>
              <th>融資案件名</th>
              <td>{project ? project.name : ' - '}</td>
            </tr>
            <tr>
              <th>融資先</th>
              <td>{borrower ? borrower.name : ' - '}</td>
            </tr>
            <tr>
              <th>融資先コード</th>
              <td>{borrower ? borrower.code : ' - '}</td>
            </tr>
            <tr>
              <th>金額</th>
              <td>{project ? project.loan_amount : ' - '}</td>
            </tr>
            <tr>
              <th>残額</th>
              <td>{project ? project.loan_amount - this.state.amount : ' - '}</td>
            </tr>
            <tr>
              <th>契約締結日</th>
              <td>{project ? project.contract_date : ' - '}</td>
            </tr>
            <tr>
              <th>貸付開始日</th>
              <td>{project ? project.loan_start_date : ' - '}</td>
            </tr>
            <tr>
              <th>貸付終了予定日</th>
              <td>{project ? project.loan_end_date : ' - '}</td>
            </tr>
            <tr>
              <th>運用期間</th>
              <td>{project ? project.loan_term : ' - '}か月</td>
            </tr>
            <tr>
              <th>貸出金利</th>
              <td>{project ? project.lending_rate : ' - '}%</td>
            </tr>
            <tr>
              <th>投資家利回り</th>
              <td>{project ? project.rate_of_yield : ' - '}%</td>
            </tr>
            <tr>
              <th>募集取扱手数料</th>
              <td>{project ? project.handling_fee : ' - '}%</td>
            </tr>
            <tr>
              <th>融資手数料</th>
              <td>{project ? project.charge_rate : ' - '}%</td>
            </tr>
            <tr>
              <th>返済方式</th>
              <td>{project ? project.payment_way : ' - '}</td>
            </tr>
          </tbody>
        </table>
        <button className="btn btn-danger" onClick={this.handleRemoveProjectButtonClick.bind(this)}>
          Remove Project
        </button>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      apiToken: state.app.get('apiToken'),
      fundData: state.item.get('fundData'),
      projectList: state.item.get('projectList')
    }
  },
  (dispatch) => ({
    itemActions: bindActionCreators(require('../../actions/item_actions'), dispatch),
  })
)(ProjectSelect)
