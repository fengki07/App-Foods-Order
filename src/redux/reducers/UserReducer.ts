import { LocationGeocodedAddress } from 'expo-location'
import {userAction} from '../actions/userAction'
import { FoodModel, UserModel, UserState } from '../models'



const InitialState : UserState = {
    user : {} as UserModel,
    location : {} as LocationGeocodedAddress,
    error : undefined,
    cart : {} as [FoodModel]
}

const UserReducer = (state : UserState = InitialState, action : userAction) => {
    const {type, payload} = action;
    switch(type){
        case 'ON_UPDATE_LOCATION':
        return {
            ...state,
            location: payload
        }
        case 'ON_UPDATE_CART':
            if(!Array.isArray(state.cart)){
                return {
                    ...state,
                    cart : [action.payload]
                }
            }
        
        const existingFoods = state.cart.filter(item => item.id === action.payload.id);
        if(existingFoods.length > 0) {
            let updateCart = state.cart.map((food) => {
                if(food.id == action.payload.id) {
                    food.unit = action.payload.unit;
                }
                return food
            })
            return{
                ...state,
                cart : updateCart.filter(item => item.unit > 0)
            }
        } else {
            return {
                ...state,
                cart: [...state.cart, action.payload]
            }
        }
        case 'ON_USER_LOGIN':
            console.log(' User Token'+action.payload)
            
            default: return state;
    }

}

export {UserReducer}