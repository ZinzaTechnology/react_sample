import { fromJS } from 'immutable'
import * as AppAction from '../constants/app_action'
import * as Api from '../constants/api_action'

export const initialState = fromJS({
  apiToken: fundProps ? fundProps.token : null,
  formValidation: fundProps ? fundProps.validation : {},
  messages: [],
  loading: false,
})

export default (state = initialState, action) => {
  const {type, payload, meta} = action

  switch(type) {
    case AppAction.SET_AUTH_TOKEN:
      return state.set('apiToken', payload)

    case AppAction.SET_FORM_VALIDATION:
      return state.set('formValidation', payload)

    case 'GET' + Api.REQUEST:
    case 'POST' + Api.REQUEST:
    case 'PUT' + Api.REQUEST:
    case 'DELETE' + Api.REQUEST:
    case 'MULTIDATA' + Api.REQUEST:
      return state.set('loading', fromJS(true))

    case 'GET' + Api.SUCCESS:
    case 'MULTIDATA' + Api.SUCCESS:
    case 'UPLOAD' + Api.SUCCESS:
    case 'DELETE' + Api.SUCCESS:
    case 'GET' + Api.FAILURE:
    case 'DELETE' + Api.FAILURE:
      // TODO: Add more logic here
      return state.set('loading', fromJS(false))

    case 'POST' + Api.SUCCESS:
    case 'PUT' + Api.SUCCESS:
      {
        if (payload.redirect_path) {
          window.location = payload.redirect_path
        }
        let apiToken = payload.authentication_token ? payload.authentication_token : state.get('apiToken')
        return state.set('apiToken', apiToken)
      }

    case 'POST' + Api.FAILURE:
    case 'PUT' + Api.FAILURE:
      {
        let apiToken = payload.response.authentication_token ? payload.response.authentication_token : state.get('apiToken')
        let messages = payload.response.exception ? payload.response.exception : ''
        return state.set('apiToken', apiToken).set('messages', messages)
      }
  }

  return state
}
