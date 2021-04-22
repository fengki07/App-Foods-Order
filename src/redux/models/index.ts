import {LocationGeocodedAddress} from 'expo-location'


export interface Category {
    id: string;
    titile: string;
    icon: string;
}

export interface FoodModel {
    id :  string;
    name : string;
    discription : string;
    category : string;
    price : number;
    readytime : number;
    images : [string];
    unit : number;
}

export interface Restaurant {
    id : string;
    name : string;
    foodtype : string;
    addresss : string;
    phone : number;
    images : [string]
    foods : [FoodModel]
}

export interface FoodAvailability {
    categories : [Category];
    restaurant : [Restaurant];
    foods : [FoodModel];
}

export interface UserModel {
    firstname : string;
    lastname : string;
    contackNumber : number;
    token : string;
    verified : boolean;
}

export interface UserState {
    user : UserModel;
    location : LocationGeocodedAddress;
    error : string | undefined;
    cart : [FoodModel];
}

export interface ShoppingState{
    availability: FoodAvailability,
    availableFoods: [FoodModel]
}