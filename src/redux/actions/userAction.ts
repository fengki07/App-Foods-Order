import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { LocationGeocodedAddress } from 'expo-location'
import {Dispatch} from 'react'
import {Base_Url} from '../../utils'
import { FoodModel } from '../models'


export interface updateLocationAction {
    readonly type : 'ON_UPDATE_LOCATION',
    payload : LocationGeocodedAddress
}

export interface useErrorAction {
    readonly type : 'ON_USER_ERROR',
    payload : any
}

export interface updateCartAction {
    readonly type : 'ON_UPDATE_CART'
    payload : FoodModel
}

export interface userLoginAction {
    readonly type : 'ON_USER_LOGIN'
    payload : string
}

export type userAction = updateLocationAction | useErrorAction | updateCartAction | userLoginAction;

export const onUpdateLocation = (location : LocationGeocodedAddress) => {
    return async (dispatch : Dispatch<userAction>) => {
        try {
            const locationString = JSON.stringify(location)
            await AsyncStorage.setItem('user_locaion', locationString)

            dispatch ({
                type: 'ON_UPDATE_LOCATION',
                payload : location
            })
        }catch (error) {
            dispatch({
                type : 'ON_USER_ERROR',
                payload : error
            })
        }
    }
}

export const updateCart = (item : FoodModel) => {
    return async (dispatch : Dispatch<userAction>) => {
            dispatch ({
                type: 'ON_UPDATE_CART',
                payload : item
            })
     }
}   

const userLogin = (email : string, password : string) => {
    return async (dispatch : Dispatch<userAction>) => {
        try {
            const response = await axios.post<string>(`${Base_Url}user/login`,{
                email,password
            })
            console.log(response)

            if(!response){
                dispatch({
                    type : 'ON_USER_ERROR',
                    payload : 'Login_Error'
                })
            } else {
                dispatch({
                    type : 'ON_USER_LOGIN',
                    payload : response.data
                })
            }
        } catch (error) {
            dispatch ({
                type : 'ON_USER_ERROR',
                payload : 'Login Error'
            })
        }
    }
}

export const onUserSignup = (email: string, phone : string, password: string) => {
    return async (dispatch : Dispatch<userAction>) => {
        try {
            const response = await axios.post<string>(`${Base_Url}user/signup`,{
                email,phone,password
            })
            console.log(response)

            if(!response){
                dispatch({
                    type : 'ON_USER_ERROR',
                    payload : 'Login_Error'
                })
            } else {
                dispatch({
                    type : 'ON_USER_LOGIN',
                    payload : response.data
                })
            }
        } catch (error) {
            dispatch ({
                type : 'ON_USER_ERROR',
                payload : 'Login Error'
            })
        }
    }
}