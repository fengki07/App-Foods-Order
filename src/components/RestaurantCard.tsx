import React from 'react'
import { Dimensions, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { FoodModel, Restaurants } from '../redux/models';



const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps {
    item: Restaurants | FoodModel
    onTap: Function
}

const RestaurantCard: React.FC<RestaurantProps> = ({item, onTap}) => {
    return(
        <TouchableOpacity style={styles.container} onPress={() => onTap(item)}>
            <Image style={{width: screenWidth - 20, height: 220, borderRadius: 20, backgroundColor:'#EAEAEA'}}
            source={{ uri: `${item.images[0]}`}}/>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container:{width: screenWidth - 20, height: 230, justifyContent:'space-around', alignItems: 'center', margin: 10, borderRadius: 20}
})

export{RestaurantCard}