import React from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'


interface SearchBarProps {
    onEndEditing? : any | undefined;
    didTouch? : any | undefined;
    autoFocus? : any | boolean;
    onTextChange: Function;   
}

const SearchBar: React.FC<SearchBarProps> = ({ onEndEditing, didTouch, autoFocus = false, onTextChange }) => {
   
    return(
        <View style={styles.container}>
            <View style={styles.searchBar}>
                <Image style={{width: 25, height: 25}} source={require('../images/search.png')}/>
                <TextInput 
                    style={{marginHorizontal:5, margin:9, display:'flex', height: 42, fontSize: 20}}
                    placeholder={"Search Foods"}
                    autoFocus={autoFocus}
                    onTouchStart={didTouch}
                    onChangeText={(text) => onTextChange(text)}
                    onEndEditing={onEndEditing}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: { 
        flex: 1, 
         height: 60,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 20,
        paddingRight: 20
    },
    searchBar: {
        display: 'flex',
        height: 32,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#ededed',
        alignItems: 'center',
        borderRadius: 20,
        paddingLeft: 10,
        paddingRight: 10,
        borderColor: '#E5E5E5',
        borderWidth: 2
    }
})

export{SearchBar}