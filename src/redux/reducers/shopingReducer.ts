import {shopingAction} from '../actions/shpingAction'
import {FoodAvailability, FoodModel, ShoppingState,} from '../models'

const initialState = {
    availability : {} as FoodAvailability,
    availableFoods : {} as [FoodModel]
};

const ShoppingReducer = (state: ShoppingState = initialState, action: shopingAction) => {
    switch(action.type) {
        case 'ON_AVAILBILITY':
            return {
                ...state,
                availability: action.payload
            }
            case 'ON_FOODS_SEARCH':
                return {
                    ...state,
                    availableFoods : action.payload
                }
          default: return state      
    }
}

export {ShoppingReducer}