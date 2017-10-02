import { CALL_API } from 'redux-api-middleware'
import * as Api from '../constants/api_action'
import * as _ from 'lodash'

function callAPI(method, apiCode, data, bonusData = null, apiToken = null) {
  let form = null
  if (!(apiCode in Api.URL))
    return {
      type: 'NOTHING',
    }

    var type = null
    if (method == 'POST' && bonusData == 'file') {
      type = 'UPLOAD'
    } else if (( method == 'POST' || method == 'PUT') && bonusData == 'multiData') {
      type = 'MULTIDATA'
    } else {
      type = method
    }

  var xhrObj = {
    endpoint: Api.URL[apiCode],
    method: method,
    types: [
      {
        type: type + Api.REQUEST,
        payload: (action, state) => ({
          URL: action[CALL_API].endpoint,
          data: action[CALL_API].body
        }),
        meta: data
      },
      {
        type: type + Api.SUCCESS,
        meta: apiCode
      },
      {
        type: type + Api.FAILURE,
        meta: apiCode
      },
    ],
    headers: {
      'Content-Type': 'application/json',
      'X-Operator-Token': apiToken,
    },
  }

  switch (type) {
    case 'GET':
      var parameter = '?'
      _.map(data, (value, key) => {
        parameter = parameter + key + '=' + value + '&'
      })
      xhrObj.endpoint = xhrObj.endpoint + parameter
      xhrObj.types[1].meta = {
        apiCode: apiCode,
        bonusData: bonusData,
      }
      break
    case 'POST':
      xhrObj.body = JSON.stringify(data)
      break
    case 'UPLOAD':
      form = new FormData()
      form.append('file_name', data)
      xhrObj.body = form
      xhrObj.headers = { 'X-Operator-Token': apiToken }
      break
    case 'MULTIDATA':
      form = new FormData()
      _.map(data, (value, key) => {
        form.append(key, value)
      })
      xhrObj.body = form
      xhrObj.headers = { 'X-Operator-Token': apiToken }
      if (method == 'PUT') {
        xhrObj.method='POST'
        _.map(data, (value, key) => {
          xhrObj.endpoint = xhrObj.endpoint.replace('{' + key + '}', value)
        })
      }
      break
    case 'PUT':
      xhrObj.body = JSON.stringify(data)
    case 'DELETE':
      _.map(data, (value, key) => {
        xhrObj.endpoint = xhrObj.endpoint.replace('{' + key + '}', value)
      })
      break
  }
  return {
    [CALL_API]: xhrObj
  }
}

export function getAPI(apiCode, data, bonusData = null) {
  return (dispatch, getState) => {
    let apiToken = getState().app.get('apiToken')
    return dispatch(callAPI('GET', apiCode, data, bonusData, apiToken))
  }
}

export function postAPI(apiCode, data, bonusData = null) {
  return (dispatch, getState) => {
    let apiToken = getState().app.get('apiToken')
    return dispatch(callAPI('POST', apiCode, data, bonusData, apiToken))
  }
}

export function putAPI(apiCode, data, bonusData = null) {
  return (dispatch, getState) => {
    let apiToken = getState().app.get('apiToken')
    return dispatch(callAPI('PUT', apiCode, data, bonusData, apiToken))
  }
}

export function deleteAPI(apiCode, data) {
  return (dispatch, getState) => {
    let apiToken = getState().app.get('apiToken')
    return dispatch(callAPI('DELETE', apiCode, data, apiToken))
  }
}

export function uploadFileAPI(apiCode, data) {
  return (dispatch, getState) => {
    let apiToken = getState().app.get('apiToken')
    return callAPI('POST', apiCode, data, 'file', apiToken)
  }
}
