import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { Image, AirbnbRating } from '@rneui/base';


export default function FlatListRestaurant(props) {
    const {image, title, description, rating, action} = props
    return (
      <TouchableOpacity onPress={action}>
      <View style={styles.row}>
          <Image
              source={{ uri: image }}
              style={styles.image}
          />
          <View style={{ flex: 1, flexDirection: 'column', marginLeft: 8 }}>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.title}>{title}</Text>
                  <AirbnbRating count={5} defaultRating={rating} size={12} isDisabled={true} showRating={false} />
              </View>

              <Text style={styles.description}>{description}</Text>
          </View>
      </View>
      </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    
  title: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    padding: 18,
    marginBottom: 12,

    // shadow ios
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,

    // shadow android
    elevation:3,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    width: 124,
    height: 124,
    borderRadius: 12,
  },
})