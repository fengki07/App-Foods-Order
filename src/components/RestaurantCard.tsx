import React from 'react'
import { Dimensions, Image, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FoodModel, Restaurant } from '../redux/models';



const screenWidth = Dimensions.get('screen').width;

interface RestaurantProps {
    item: Restaurant | FoodModel
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