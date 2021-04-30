
import React from 'react';
import { Image, StyleSheet} from 'react-native';
import { LandingScreen } from './src/screens/LandingScreen';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import { homeScreen } from './src/screens/HomeScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import {Provider} from 'react-redux'
import {store} from './src/redux/store'
import { FoodDetailScreen } from './src/screens/FoodDetailScreen';
import { SearchScreen } from './src/screens/SearchScreen';
import { RestaurantScreen } from './src/screens/RestauranScreen';



const switchNavigator = createSwitchNavigator({

  landingStack: {
    screen: createStackNavigator({
      Landing: LandingScreen,
      
    },{
      defaultNavigationOptions: {
        headerShown: false
      }
    }),

  },

  homeStack:  createBottomTabNavigator({

   
    home: {
      screen: createStackNavigator({
        HomePage: homeScreen,
        SearchPage: SearchScreen,
        RestaurantPage: RestaurantScreen,
        FoodDetailPage: FoodDetailScreen
      },{
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/home_icon.png') : require('./src/images/home_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    
    Offer: {
      screen: createStackNavigator({
        OfferPage: homeScreen 
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/offer_icon.png') : require('./src/images/offer_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },

    
     Cart: {
      screen: createStackNavigator({
        CartPage: homeScreen
       
      }, {
        defaultNavigationOptions: {
          headerShown: false
        }
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/cart_icon.png') : require('./src/images/cart_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    },
    
     Account: {
      screen: createStackNavigator({
        AccountPage: homeScreen,
 
      }),
      navigationOptions: {
        tabBarIcon: ({ focused, tintColor}) => {
          let icon = focused == true ? require('./src/images/account_icon.png') : require('./src/images/account_n_icon.png') 
          return <Image source={icon} style={styles.tabIcon} />
        }
      }
    }

   })

});

const AppNavigation = createAppContainer(switchNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
    
  );
}

const styles = StyleSheet.create({
  tabIcon: {
    width: 30,
    height: 30
  }
});

