import { fromJS } from 'immutable'
import * as ItemAction from '../constants/item_action'

export const initialState = fromJS({
  fundData: fundProps && fundProps.fundData ? fundProps.fundData : {
  },
  itemList: fundProps && fundProps.itemList ? fundProps.itemList.map(
    (value, index) => {
      // Re-calculate sort_rank
      value.sort_rank = index
      return value
    }) : [],
  projectList: fundProps && fundProps.projectList ? fundProps.projectList.map(
    (value, index) => {
      value.sort_rank = index
      return value
    }) : [],
  activeInputControlBarInline: null,
})

export default (state = initialState, action) => {
  const {type, payload, meta} = action

  switch(type) {
    case ItemAction.SET_ITEM_LIST:
      {
        return state.set('itemList', fromJS(payload))
      }

    case ItemAction.ADD_ITEM_LIST:
      {
        let newItemList = state.get('itemList').insert(payload.sort_rank, fromJS(payload))
        // Re-calculate sort_rank
        newItemList = newItemList.map((value, index) => {
          return value.set('sort_rank', index)
        })
        return state.set('itemList', newItemList)
      }

    case ItemAction.REMOVE_ITEM_LIST:
      {
        let index = state.get('itemList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let newItemList
        if (index >= 0) {
          // Remove old item
          newItemList = state.get('itemList').setIn([index, '_destroy'], 1)
        } else {
          // Remove new item
          newItemList = state.get('itemList').filter(item => item.get('sort_rank') != payload.sort_rank)
          // Re-calculate sort_rank
          newItemList = newItemList.map((value, index) => {
            return value.set('sort_rank', index)
          })
        }
        return state.set('itemList', newItemList)
      }

    case ItemAction.UPDATE_ITEM_INPUT_CONTENT:
      {
        let index = state.get('itemList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let newItemList = state.get('itemList').setIn([index], fromJS(payload))
        return state.set('itemList', newItemList)
      }

    case ItemAction.SET_ITEM_EDIT_MODE:
      {
        let index = state.get('itemList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let newItemList = state.get('itemList').setIn([index, 'edit_mode'], payload.edit_mode)
        return state.set('itemList', newItemList)
      }

    case ItemAction.MOVE_ITEM:
      {
        let next_sort_rank = Math.max(Math.min(payload.next_sort_rank, state.get('itemList').size - 1), 0)
        if (next_sort_rank == payload.sort_rank) {
          // Return if same sort_rank
          break
        }
        let index = state.get('itemList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let item = state.get('itemList').get(index)
        let newItemList = state.get('itemList').delete(index).insert(next_sort_rank, item)
        // Re-calculate sort_rank
        newItemList = newItemList.map((value, index) => {
          return value.set('sort_rank', index)
        })
        return state.set('itemList', newItemList)
      }

    case ItemAction.SET_FUND_DATA:
      {
        if (payload) {
          return state.set('fundData', fromJS(payload))
        } else {
          return state.set('fundData', fromJS({}))
        }
      }

    case ItemAction.UPDATE_FUND_DATA:
      {
        let newFundData = state.get('fundData').setIn([payload.name], payload.value)
        return state.set('fundData', newFundData)
      }

    case ItemAction.CALCULATE_FUND_DATA:
      {
        // Re-calculate some fund field based on selected projects
        let tempProjectList = state.get('projectList').filter(item => item.get('_destroy') != 1)
        // Get maximum rate_of_yield from projects
        let interest_rate = tempProjectList.maxBy(item => item.get('project').get('rate_of_yield')).get('project').get('rate_of_yield')
        // Get sum amount from projects
        let invitation_amount = 0
        tempProjectList.map((value, key) => {
          invitation_amount += parseInt(value.get('amount'))
        })
        // Get maximum loan_term from projects
        let loan_term = tempProjectList.maxBy(item => item.get('project').get('loan_term')).get('project').get('loan_term')
        // Get minimum loan_start_date from projects
        let loan_start_date = tempProjectList.minBy(item => item.get('project').get('loan_start_date')).get('project').get('loan_start_date')
        // Get maximum loan_end_date from projects
        let loan_end_date = tempProjectList.maxBy(item => item.get('project').get('loan_end_date')).get('project').get('loan_end_date')

        let newFundData = state.get('fundData')
                                .setIn(['interest_rate'], interest_rate ? interest_rate : '')
                                .setIn(['invitation_amount'], invitation_amount ? invitation_amount : '')
                                .setIn(['loan_term'], loan_term ? loan_term : '')
                                .setIn(['loan_start_date'], loan_start_date ? loan_start_date : '')
                                .setIn(['loan_end_date'], loan_end_date ? loan_end_date : '')
        return state.set('fundData', newFundData)
      }

    case ItemAction.ADD_PROJECT_LIST:
      {
        let newProjectList = state.get('projectList').insert(payload.sort_rank, fromJS(payload))
        // Re-calculate sort_rank
        newProjectList = newProjectList.map((value, index) => {
          return value.set('sort_rank', index)
        })
        return state.set('projectList', newProjectList)
      }

    case ItemAction.REMOVE_PROJECT_LIST:
      {
        let index = state.get('projectList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let newProjectList
        if (index >= 0) {
          // Remove old item
          newProjectList = state.get('projectList').setIn([index, '_destroy'], 1)
        } else {
          // Remove new item
          newProjectList = state.get('projectList').filter(item => item.get('sort_rank') != payload.sort_rank)
          // Re-calculate sort_rank
          newProjectList = newProjectList.map((value, index) => {
            return value.set('sort_rank', index)
          })
        }
        return state.set('projectList', newProjectList)
      }

    case ItemAction.UPDATE_PROJECT_CONTENT:
      {
        let index = state.get('projectList').findIndex(item => item.get('sort_rank') == payload.sort_rank)
        let newProjectList = state.get('projectList').setIn([index], fromJS(payload))
        return state.set('projectList', newProjectList)
      }

    case ItemAction.SHOW_INPUT_CONTROL_BAR_INLINE:
      {
        return state.set('activeInputControlBarInline', payload.sort_rank)
      }

    case ItemAction.HIDE_INPUT_CONTROL_BAR_INLINE:
      {
        return state.set('activeInputControlBarInline', null)
      }
  }

  return state
}
