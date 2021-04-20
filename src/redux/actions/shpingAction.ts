import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location'
import { Dispatch } from 'react'
import { Base_Url } from '../../utils'
import { FoodAvailability, FoodModel } from '../models'

export interface availbilityAction {
    readonly type: 'ON_AVAILBILITY',
    payload: FoodAvailability
}

export interface FoodSearchAction {
    readonly type: 'ON_FOODS_SEARCH',
    payload: [FoodModel]
}

export interface shopingErrorAction {
    readonly type: 'ON_SHOPING_ERROR',
    payload: any
}

export type shopingAction = availbilityAction | FoodSearchAction | shopingErrorAction

export const onAvailability = (postCode: string) => {

    return async ( dispatch: Dispatch<shopingAction>) => {

        try {

            const response = await axios.get<FoodAvailability>(`${Base_Url}food/availability/${postCode}`)

 
            if(!response){
                dispatch({
                    type: 'ON_SHOPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
               
                dispatch({
                    type: 'ON_AVAILBILITY',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPING_ERROR',
                payload: error
            })
        }

    }

}

export const onSearchFoods = (postCode : string) => {
    return async ( dispatch: Dispatch<shopingAction>) => {

        try {

            const response = await axios.get<FoodAvailability>(`${Base_Url}food/availability/${postCode}`)

 
            if(!response){
                dispatch({
                    type: 'ON_SHOPING_ERROR',
                    payload: 'Availability error'
                })
            }else{
               
                dispatch({
                    type: 'ON_AVAILBILITY',
                    payload: response.data
                })
            }


        } catch (error) {
            dispatch({
                type: 'ON_SHOPING_ERROR',
                payload: error
            })
        }

    }

}