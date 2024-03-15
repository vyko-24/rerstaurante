import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView from 'react-native-maps';

export default function RestaurantDetails(props) {
    const { params} = props.route;
    console.log(params);
    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                
                initialRegion={{
                    latitude: 18.850774153527897 ,
                    longitude: -99.20080445371036,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16
    },
    map: {
        width: '100%',
        height: 300,
    },
})