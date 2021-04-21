import React, { useEffect, useState, useReducer } from 'react';
import {View, Text, StyleSheet, Image, Dimensions} from 'react-native'
import * as Location from 'expo-location'
import { useNavigation } from '../utils/useNavigation'
import { connect } from 'react-redux'
import { ApplicationState } from '../redux'
import {onUpdateLocation} from '../redux/actions/userAction'
import { UserState } from '../redux/models';

const screenWidth = Dimensions.get('screen').width

interface LandingProps{
    userReducer : UserState,
    onUpdateLocation : Function
}

const LandingScreens: React.FC<LandingProps> = (props) => {
    const {userReducer, onUpdateLocation} = props;
    const { navigate } = useNavigation()

    const [errorMsg, setErrorMsg] = useState("")
    const [address, setAddress] = useState<Location.LocationGeocodedAddress>()
    const [displayAdrres, setDisplayAddress] = useState("Waiting for Current Location")

    useEffect(() => {


        (async () => {

            let { status } = await Location.requestForegroundPermissionsAsync();

            if (status !== 'granted'){
                setErrorMsg('Permission to access location is not granted')
            }

            let location: any = await Location.getCurrentPositionAsync({});

            const { coords } = location

            if(coords){

                const { latitude, longitude} = coords;

                let addressResponse: any = await Location.reverseGeocodeAsync({ latitude, longitude})

                for(let item of addressResponse){
                    setAddress(item)
                    onUpdateLocation(address)
                    let currentAddress = `${item.name}, ${item.street}, ${item.postalCode}, ${item.country}`
                    setDisplayAddress(currentAddress)

                    if(currentAddress.length > 0){
                        setTimeout(() =>{
                            navigate('homeStack')
                        }, 2000)
                    }


                    return;
                }


            }else{
               
            }

        })();



    }, [])


    return (
        <View style={styles.container}>
            <View style={styles.navigation}/>
               
            <View style={styles.body}>
                <Image source={require('../images/delivery_icon.png')} style={styles.deliveryIcon}/>
                <View style={styles.addresContainer}>
                    <Text style={styles.addresTitle}>Your Delivery Address</Text>
                </View>
                <Text style={styles.addresText}>{displayAdrres}</Text>
                </View>
            <View style={styles.footer}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(242,242,242,1)'
    },
    navigation: {
        flex: 1,
    },
    body : {
        flex: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deliveryIcon: {
        width: 120,
        height: 120
    },
    addresContainer: {
        width: screenWidth - 100,
        borderBottomColor: 'red',
        borderBottomWidth: 0.5 ,
        padding: 5,
        marginBottom: 10,
        alignItems: 'center'
    },
    addresTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: '#7D7D7D'
    },
    addresText: {
        fontSize: 22,
        fontWeight: '200',
        color: '#4F4F4F'
    },
    footer: {
        flex: 1,
    }
    
})

const mapToStateProps = (state : ApplicationState) => ({
    userReducer: state.userReducer
})

const LandingScreen = connect(mapToStateProps,{onUpdateLocation})(LandingScreens)
export {LandingScreen}