import {LocationGeocodedAddress} from 'expo-location'


export interface Category {
    id: string;
    title: string;
    icon: string;
}

export interface FoodModel {
    _id :  string;
    name : string;
    discription : string;
    category : string;
    price : number;
    readytime : number;
    images : [string];
    unit : number;
}

export interface Restaurants {
    _id : string;
    name : string;
    foodtype : string;
    address : string;
    phone : number;
    images : [string]
    foods : [FoodModel]
}

export interface FoodAvailability {
    categories : [Category];
    restaurants : [Restaurants];
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