import {combineReducers} from 'redux'
import {shopingReducer} from './shopingReducer'
import {UserReducer} from './UserReducer'

const rootReducer = combineReducers({
    UserReducer : UserReducer,
    shopingReducer : shopingReducer
})
 export type ApplicationState = ReturnType<typeof rootReducer>
 export {rootReducer}