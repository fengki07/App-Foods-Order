import {shopingAction} from '../actions/shpingAction'
import {FoodAvailability, FoodModel, ShopingState,} from '../models'

const initialState = {
    availability : {} as FoodAvailability,
    availableFoods : {} as [FoodModel]
};

const ShoppingReducer = (state: ShopingState = initialState, action: shopingAction) => {
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