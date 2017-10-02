import * as AppAction from '../constants/app_action'
import * as itemActions from './item_actions'

export function initFundApp(props) {
  return dispatch => {
    dispatch(setAuthToken(props.token))
    dispatch(setFormValidation(props.validation))
    dispatch(itemActions.setFundData(props.fundData))
    dispatch(itemActions.setItemList(props.itemList))
  }
}

export function setAuthToken(token) {
  return {
    type: AppAction.SET_AUTH_TOKEN,
    payload: token,
  }
}

export function setFormValidation(validation) {
  return {
    type: AppAction.SET_FORM_VALIDATION,
    payload: validation,
  }
}
