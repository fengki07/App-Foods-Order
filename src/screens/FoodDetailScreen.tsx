import React, { useReducer } from 'react'
import { View, StyleSheet, Text, ImageBackground, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { ApplicationState } from '../redux';
import { FoodModel, UserState } from '../redux/models';
import { useNavigation } from '../utils';
import {onUpdateCart} from '../redux/actions/userAction'
import { ButtonWhiteIcon } from '../components/ButtonWhiteIcon';
import { FoodCard } from '../components/FoodCard';
import { checkExistence } from '../utils/CartHelper';


interface FoodDetailProps {
    onUpdateCart: Function,
    navigation: {getparams: Function, goBack: Function}
    useReducer: UserState,
}

const FoodDetailScreens: React.FC<FoodDetailProps> = (props) => {

    const {getparams, goBack} = props.navigation;
    const food = getparams('food') as FoodModel
    const {navigate} = useNavigation()
    const {cart} = props.useReducer;

    return (
        <View style={styles.container}>
            <View style={styles.navigation}>
            <ButtonWhiteIcon icon={require('../images/back_arrow.png')} onTap={() => goBack()} width={42} height={42} />
            <Text style={{fontSize: 22, fontWeight: '600', marginLeft: 60}}>{food.name}</Text>
            </View>
            <View style={styles.body}>
            <ImageBackground source={{uri: `${food.images[0]}`}}
                style={{width: Dimensions.get('screen').width, height: 300, justifyContent: 'flex-end'}}>
            <View style={{height: 120, backgroundColor: 'rgba(0,0,0,0.6)', padding:10}}>
            <Text style={{color: '#FFF', fontSize: 30, fontWeight: '700'}}>{food.name}</Text>
            <Text style={{color: '#FFF', fontSize: 25, fontWeight: '500'}}>{food.category}</Text>
            </View>
            </ImageBackground>
            <View style={{display: 'flex', height: 300, padding: 20}}>
            <Text> Food Will Be Ready Within {food.readytime} Minite(s)</Text>
            <Text>{food.discription}</Text>
            </View>
            <View style={{height: 120}}>
                <FoodCard item = {checkExistence(food, cart)} onTap={() =>{}} onUpdateCart={props.onUpdateCart}/>
            </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container: {flex:1, backgroundColor: '#F2F2F2'},
    navigation: {flex: 3, marginTop: 43, paddingLeft: 10, flexDirection: 'row', alignItems: 'center' },
    body: {flex: 10, justifyContent: 'flex-start', alignItems: 'center', backgroundColor: '#FFF', paddingBottom:160 },
    footer: {flex: 1, backgroundColor: 'cyan'}
})

const mapToStateProps = (state: ApplicationState) => {
    useReducer: state.userReducer;
}

const FoodDetailScreen = connect(mapToStateProps, { onUpdateCart })(FoodDetailScreens) 
export{FoodDetailScreen}