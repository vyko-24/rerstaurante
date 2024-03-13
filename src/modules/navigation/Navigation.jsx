import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AuthStack from './stack/AuthStack';
import FavoritesStack from './stack/FavoritesStack'
import HomeStack from './stack/HomeStack'
import MoreStack from './stack/MoreStack'
import { Icon } from '@rneui/base'
import { StyleSheet } from 'react-native'; // Agregar la importación de StyleSheet
import PushNotification from '../notifications/PushNotification';



const Tab = createBottomTabNavigator();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            const { iconName, iconType } = getIconName(route.name, focused);
            // Retornar un Icon de React Native Elements
            return <Icon name={iconName} type={iconType} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
      >
        <Tab.Screen
          name='HomeStack'
          component={HomeStack}
          options={{ title: 'Inicio' }}
        />

        <Tab.Screen
          name='FavoritesStack'
          component={FavoritesStack}
          options={{ title: 'Favoritos' }}
        />
        <Tab.Screen
          name='AuthStack'
          component={AuthStack}
          options={{ title: 'Cuenta' }}
        />
        <Tab.Screen
          name='MoreStack'
          component={MoreStack}
          options={{ title: 'Más' }}
        />
        <Tab.Screen
          name='Notifications'
          component={PushNotification}
          options={{ title: 'Notificaciones' }}
        />

      </Tab.Navigator>
    </NavigationContainer>
  )
}

const getIconName = (routeName, focused) => {
  let iconName = '';
  let iconType = '';

  switch (routeName) {
    case 'HomeStack':
      iconName = focused ? 'home' : 'home-outline';
      iconType = 'material-community'; // Asumiendo que quieres usar Material Community Icons
      break;
    case 'FavoritesStack':
      iconName = focused ? 'heart' : 'heart-o'; // AQUI SE CAMBIA EL ICONO QUE QUIERAS UTILIZAR POR SU NOMBRE Y SU SUBNOMBRE ES EL QUE DEFINE SI ESTA RELLENO O SOLO LAS LINEAS DEL ICONO
      iconType = 'font-awesome'; //AQUI SE CAMBIA LA HERRAMIENTA DE LOS ICONOS QUE QUIERAS UTILIZAR
      break;
    case 'AuthStack':
      iconName = focused ? 'user' : 'user-o';
      iconType = 'font-awesome'; // Asumiendo que quieres usar Material Icons
      break;
    case 'MoreStack':
      iconName = focused ? 'dots-horizontal' : 'dots-horizontal-circle-outline';
      iconType = 'material-community'; // Asumiendo que quieres usar Material Icons
      break;
    case 'Notifications':
      iconName = focused ? 'bell' : 'bell-outline';
      iconType = 'material-community'; // Asumiendo que quieres usar Material Icons
      break;

  }

  return { iconName, iconType };
};