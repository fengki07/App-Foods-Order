import React, { useEffect } from 'react';
import {View, Text, StyleSheet} from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { ButtonWhiteIcon } from '../components/ButtonWhiteIcon';
import { CategoryCard } from '../components/CategoryCard';
import { RestaurantCard } from '../components/RestaurantCard';
import { SearchBar } from '../components/SearchBar';
import { ApplicationState} from '../redux';
import {onAvailability, onSearchFoods} from '../redux/actions/shpingAction'
import { FoodModel, Restaurant, ShopingState, UserState } from '../redux/models';
import { useNavigation } from '../utils';


interface HomeProps {
    userReducer: UserState,
    ShopingReducer : ShopingState,
    onAvailability : Function,
    onSearchFoods : Function
}

const HomeSreens: React.FC<HomeProps> = (props) => {
    const {navigate} = useNavigation()
    const {location} = props.userReducer;
    const {availability} = props.ShopingReducer;
    const {categories, foods, restaurant} = availability

    useEffect(() => {
        props.onAvailability(location.postalCode)
        setTimeout(() => {
            props.onSearchFoods(location.postalCode)
        },1000)
    },[])

    const onTapRestaurant = (item: Restaurant) => {
        navigate(`RestaurantPage`, {food:item})
    }
    const onTapFood = (item: FoodModel) => {
        navigate(`FoodDetailPage`, {food:item})
    }
    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
                <View style={{marginTop: 50, flex : 4,backgroundColor: 'white', paddingLeft: 20, paddingRight: 20, alignItems: 'center', justifyContent: 'center', flexDirection:'row'}}>
                <Text>{`${location.name},${location.street},${location.city}`}</Text>
                </View>
                <View style={{display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: "row", alignItems: 'center', marginHorizontal: 4}}>
                <SearchBar didTouch={()=>{
                    navigate('SearchPage')
                }} onTextChange={()=>{}}/>
                <ButtonWhiteIcon onTap={()=>{}} icon={require('../images/hambar.png')} width={50} height={40} />
                </View>
                </View>
            <View style={styles.body}>
                <ScrollView>
                    <FlatList horizontal showsHorizontalScrollIndicator={false}
                    data={categories}
                    renderItem = {({item}) => <CategoryCard item={item} onTap={() => {alert('Category tapped')}}/>}
                    keyExtractor ={(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20}}>Top Restaurants</Text>
                    </View>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={restaurant}
                    renderItem={({item}) => <RestaurantCard item={item} onTap={onTapRestaurant}/>}
                    keyExtractor = {(item) => `${item.id}`}
                    />
                    <View>
                        <Text style={{fontSize: 25, fontWeight: '600', color: '#f15b5d', marginLeft: 20}}>30 minutes foods</Text>
                    </View>
                    <FlatList 
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={foods}
                    renderItem={({item}) => <RestaurantCard item={item} onTap={onTapFood}/>}
                    keyExtractor = {(item) => `${item.id}`}
                    />
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'pink'
    },
    navigation: {
        flex: 1,
        backgroundColor: 'red'
    },
    body : {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'blue'
    }
})
const mapToStateProps = (state : ApplicationState) => ({
    userReducer: state.userReducer,
    shopingReducer : state.shopingReducer
})

const homeScreen = connect(mapToStateProps, { onAvailability,  onSearchFoods })(HomeSreens)
export {homeScreen}