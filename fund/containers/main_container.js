// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import CommonTextInput from '../components/common_inputs/text_input'
import CommonDropList from '../components/common_inputs/drop_list'
import CommonDatetimePicker from '../components/common_inputs/datetime_picker'
import SelectProjectArea from '../components/areas/select_project_area'
import InputArea from '../components/areas/input_area'
import InputControlBar from '../components/control_bar/input_control_bar'

class MainContainer extends Component {
  constructor(props) {
    super(props)
    this.state = {
    }
  }

  handleFormSubmit(event) {
    event.preventDefault()
    let fund = this.props.fundData.toJS()
    fund.items = this.props.itemList.toJS()
    fund.projects = this.props.projectList.toJS()
    if (fund.id) {
      this.props.apiActions.putAPI("fund_edit", {fund: fund, fundId: fund.id})
    } else {
      this.props.apiActions.postAPI("fund_add", {fund: fund})
    }
  }

  render() {
    let fundData = this.props.fundData.toJS()
    let itemList = this.props.itemList.toJS()
    let validate = this.props.formValidation.toJS()
    return (
      <div className="container">
        <h1>Fund</h1>
        <div className="col-md-12">
          <SelectProjectArea />
        </div>
        <div className="col-md-12">
          <p style={{ color: 'red' }}>{this.props.messages}</p>
          <form id="fund-form" onSubmit={this.handleFormSubmit.bind(this)}>
            <div>
              <CommonTextInput name="name" label="ファンド名" required={true} value={fundData.name} />
              <CommonDropList name="status" label="ステータス" required={true} list={validate.status.inclusion.in} value={fundData.status} />
              <CommonTextInput name="code" label="号数" required={true} value={fundData.code} />
              <CommonTextInput name="description" label="ファンド説明" required={true} value={fundData.description} />
            </div>
            <div className="row">
              <div className="col-md-9">
                <InputArea />
                <InputControlBar />
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>

              <div className="col-md-3">
                <CommonTextInput name="interest_rate" label="実質利回り" disabled={true} required={true} value={fundData.interest_rate} />
                <CommonTextInput name="invitation_amount" label="募集額" disabled={true} required={true} value={fundData.invitation_amount} />
                <CommonTextInput name="guarantee_amount" label="最低成立金額" required={true} value={fundData.guarantee_amount} />
                <CommonTextInput name="loan_term" label="運用期間" disabled={true} required={true} value={fundData.loan_term} />
                <CommonDatetimePicker name="invitation_start_date" label="募集開始" required={true} value={fundData.invitation_start_date} />
                <CommonDatetimePicker name="invitation_end_date" label="募集終了" required={true} value={fundData.invitation_end_date} />
                <CommonTextInput name="loan_start_date" label="運用開始" disabled={true} required={true} value={fundData.loan_start_date} />
                <CommonTextInput name="loan_end_date" label="運用終了" disabled={true} required={true} value={fundData.loan_end_date} />
                <CommonDatetimePicker name="maturity_date" label="償還予定日" required={true} value={fundData.maturity_date} />
                <CommonTextInput name="sort_number" label="sort_number" required={true} value={fundData.sort_number} />
                <CommonDropList name="dividend_way" label="分配方法" required={true} list={validate.dividend_way.inclusion.in} value={fundData.dividend_way} />
                <CommonDropList name="dividend_date" label="分配日" required={true} list={validate.dividend_date.inclusion.in} value={fundData.dividend_date} />
                <CommonTextInput name="min_invest" label="最低投資額" required={true} value={fundData.min_invest} />
                <CommonTextInput name="min_additional_invest" label="追加単位" required={true} value={fundData.min_additional_invest} />
                <CommonTextInput name="broker_name" label="broker_name" required={true} value={fundData.broker_name} />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default connect(
  (state) => {
    return {
      apiToken: state.app.get('apiToken'),
      messages: state.app.get('messages'),
      formValidation: state.app.get('formValidation'),
      fundData: state.item.get('fundData'),
      itemList: state.item.get('itemList'),
      projectList: state.item.get('projectList'),
    }
  },
  (dispatch) => ({
    apiActions: bindActionCreators(require('../actions/api_actions'), dispatch),
    itemActions: bindActionCreators(require('../actions/item_actions'), dispatch),
  })
)(MainContainer)
