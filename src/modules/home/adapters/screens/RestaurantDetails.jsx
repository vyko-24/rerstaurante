import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, {useEffect} from 'react'
import MapView, { Marker } from 'react-native-maps';
import { Image, AirbnbRating } from '@rneui/base';
import Loading from '../../../../kernel/components/Loading';

export default function RestaurantDetails(props) {
    const { params } = props.route;
    const {navigation}=props;
    useEffect(()=>{
        navigation.setOptions({title: params.item.title})
    },[]);
    console.log("params", params.item);
    return (
        <ScrollView>
        <View style={styles.container}>
            <Image
                source={params.item.image ? { uri: params.item.image } : { uri: '../../../../../assets/dish.png' }}
                style={styles.image}
            />
            <View style={styles.row}>
                <Text style={styles.title}>{params.item.title}</Text>
                <AirbnbRating count={params.item.rating} defaultRating={params.item.rating} size={16} isDisabled={true} showRating={false} />
            </View>
            <Text style={styles.description}>{params.item.description}</Text>
            <MapView
                style={styles.map}

                initialRegion={{
                    latitude: params.item.longitude,
                    longitude: params.item.latitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            > 
                <Marker
                    coordinate={{longitude: params.item.latitude, latitude: params.item.longitude,}}
                />
            </MapView>
        </View>
        </ScrollView> 
    )
}
//nota: nos confundimos longitud y latitud jajs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    map: {
        width: '100%',
        height: 300,
    },
    image: {
        width: '100%',
        height: 250,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        paddingHorizontal: 16,
        marginBottom: 16,
    },
})