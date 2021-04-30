import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { SearchBar } from '../components';
import { ButtonWhiteIcon } from '../components/ButtonWhiteIcon';
import { FoodCard } from '../components/FoodCard';
import { ApplicationState} from '../redux/actions';
import { FoodModel, ShoppingState, UserState } from '../redux/models';
import { useNavigation } from '../utils';
import { checkExistence } from '../utils/CartHelper';
import {onUpdateCart} from '../redux/actions/userAction'


interface SearchScreenProps{ 
    UserReducer: UserState,
    shoppingReducer: ShoppingState,
    onUpdateCart: Function,
 }


const SearchScreens: React.FC<SearchScreenProps> = (props) => {

    const { navigate } = useNavigation()

    const [isEditing, setIsEditing] = useState(false)
    const [keyword, setKeyword] = useState(" ")

    const { availableFoods } = props.shoppingReducer;
  
    const onTapFood = (item: FoodModel) => {    
        navigate('FoodDetailPage', { food: item})
    }
 
    const { cart } = props.UserReducer;

return (<View style={styles.container}>
        <View style={styles.navigation}> 
                 <View style={{ display: 'flex', height: 60, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center', marginLeft: 4}}>
                     <ButtonWhiteIcon icon={require('../images/back_arrow.png')} onTap={() => navigate("HomePage")} width={40} height={50} />
                    <SearchBar onTextChange={setKeyword}  onEndEditing={() => setIsEditing(false)} didTouch={() => setIsEditing(true)}/>
                 </View>
            </View>

            <View style={styles.body}>
                <FlatList 
                    showsVerticalScrollIndicator={false}
                    data={isEditing?  availableFoods.filter(function(item) {
                            return item.name.includes(keyword)
                         }): availableFoods
                    }
                    renderItem={({ item}) => <FoodCard onTap={onTapFood} item={checkExistence(item, cart)} onUpdateCart={props. onUpdateCart} /> }
                    keyExtractor={(item) => `${item.id}`}
                />

            </View>
 </View>)}


const styles = StyleSheet.create({
container: { flex: 1, backgroundColor: '#F2F2F2'},
navigation: { flex: 1,  marginTop: 43, },
body: { flex: 10, justifyContent: 'center', alignItems: 'center' },
footer: { flex: 1, backgroundColor: 'cyan' }
})

const mapToStateProps = (state:ApplicationState) => ({
    shoppingReducer: state.shoppingReducer,
    UserReducer : state.userReducer
})

const SearchScreen = connect(mapToStateProps,{onUpdateCart})(SearchScreens)
export{SearchScreen}