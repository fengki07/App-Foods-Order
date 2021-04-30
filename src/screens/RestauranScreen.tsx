import React, { useReducer } from 'react'
import { connect } from 'react-redux';
import { ApplicationState } from '../redux';
import { FoodModel, Restaurants, UserState } from '../redux/models';
import { useNavigation } from '../utils';
import {onUpdateCart} from '../redux/actions/userAction'
import { Dimensions, ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ButtonWhiteIcon } from '../components/ButtonWhiteIcon';
import { FlatList } from 'react-native-gesture-handler';
import { FoodCard } from '../components/FoodCard';
import { checkExistence } from '../utils/CartHelper';


interface RestaurantProps{ 
    userReducer: UserState,
    navigation: { getParam: Function, goBack: Function},
    onUpdateCart: Function,
 }

const RestaurantScreens: React.FC<RestaurantProps> = (props) => {

    const { getParam, goBack } = props.navigation;
    const restaurant = getParam('restaurant') as Restaurants
    const { navigate } = useNavigation()
    const { cart } = props.userReducer;
    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }
  
  
return (<View style={styles.container}>
        <View style={styles.navigation}>
            <ButtonWhiteIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
                <Text style={{ fontSize: 22, fontWeight: '600', marginLeft: 80}}> {restaurant.name}</Text>
        </View>
        <View style={styles.body}>
            <ImageBackground source={{ uri: `${restaurant.images[0]}`}}
            style={{ width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end', }}
            >
            <View style={{ height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding: 10}}>

                <Text style={{ color: '#FFF', fontSize: 40, fontWeight: '700' }} > {restaurant.name}</Text>
                <Text style={{ color: '#FFF', fontSize: 25, fontWeight: '500' }} > {restaurant.address} { restaurant.phone}</Text>

            </View>
            </ImageBackground>  
            <FlatList 
                showsVerticalScrollIndicator={false}
                data={restaurant.foods}
                renderItem={({ item}) => <FoodCard item={checkExistence(item, cart)}  onTap={onTapFood}  onUpdateCart={props.onUpdateCart}/>}
                keyExtractor={(item) => `${item._id}`}
            />

        </View>
</View>)}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
body: { flex: 11, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', },
footer: { flex: 1, backgroundColor: 'cyan' }
})


const mapToStateProps = (state: ApplicationState) => ({
    userReducer: state.userReducer,
})

const RestaurantScreen = connect(mapToStateProps, { onUpdateCart })(RestaurantScreens) 

export { RestaurantScreen }
    