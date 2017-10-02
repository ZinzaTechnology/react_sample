import * as ItemAction from '../constants/item_action'

export function setItemList(itemList) {
  return {
    type: ItemAction.SET_ITEM_LIST,
    payload: itemList,
  }
}

export function addItemList(item) {
  return (dispatch) => {
    return dispatch({
      type: ItemAction.ADD_ITEM_LIST,
      payload: item,
    }).then(dispatch(hideInputControlBarInline()))
  }
}

export function removeItemList(item) {
  return {
    type: ItemAction.REMOVE_ITEM_LIST,
    payload: item,
  }
}

export function updateItemInputContent(item) {
  return {
    type: ItemAction.UPDATE_ITEM_INPUT_CONTENT,
    payload: item,
  }
}

export function setItemEditMode(item) {
  return {
    type: ItemAction.SET_ITEM_EDIT_MODE,
    payload: item,
  }
}

export function moveItem(item) {
  return {
    type: ItemAction.MOVE_ITEM,
    payload: item,
  }
}

export function setFundData(fundData) {
  return {
    type: ItemAction.SET_FUND_DATA,
    payload: fundData,
  }
}

export function calculateFundData() {
  return {
    type: ItemAction.CALCULATE_FUND_DATA,
    payload: {},
  }
}

export function updateFundData(content) {
  return {
    type: ItemAction.UPDATE_FUND_DATA,
    payload: content,
  }
}

export function addProjectList(project) {
  return {
    type: ItemAction.ADD_PROJECT_LIST,
    payload: project,
  }
}

export function removeProjectList(project) {
  return (dispatch) => {
    return dispatch({
      type: ItemAction.REMOVE_PROJECT_LIST,
      payload: project,
    }).then(dispatch(calculateFundData()))
  }
}

export function updateProjectContent(project) {
  return (dispatch) => {
    return dispatch({
      type: ItemAction.UPDATE_PROJECT_CONTENT,
      payload: project,
    }).then(dispatch(calculateFundData()))
  }
}

export function showInputControlBarInline(item) {
  return {
    type: ItemAction.SHOW_INPUT_CONTROL_BAR_INLINE,
    payload: item,
  }
}

export function hideInputControlBarInline() {
  return {
    type: ItemAction.HIDE_INPUT_CONTROL_BAR_INLINE,
    payload: {},
  }
}
