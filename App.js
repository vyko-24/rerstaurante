import React from 'react';
import Navigation from './src/modules/navigation/Navigation';
import 'react-native-gesture-handler';
import {app, auth, db, storage} from './src/config/util/firebaseConnection' 

export default function App() {
  return (
    <Navigation />
  );
}