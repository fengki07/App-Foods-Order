import {combineReducers} from 'redux'
import {ShoppingReducer} from './shopingReducer'
import {UserReducer} from './UserReducer'

const rootReducer = combineReducers({
    userReducer : UserReducer,
    shopingReducer : ShoppingReducer
})
 export type ApplicationState = ReturnType<typeof rootReducer>
 export {rootReducer}