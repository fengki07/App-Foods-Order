import { FoodModel } from "../redux/models";




const checkExistence = (item: FoodModel, cart : [FoodModel]) => {
    
    if(Array.isArray(cart)){
        let currenItem = cart.filter((cartItem) => cartItem.id == item.id)

        if(currenItem.length > 0){
            return currenItem[0]
        }
    }return item;
}
export{checkExistence}