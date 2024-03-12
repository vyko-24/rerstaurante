import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Avatar } from '@rneui/base';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import { auth, storage } from '../../../../../config/util/firebaseConnection';
import UsuarioAvatar from '../../../../../../assets/cuenta.png';
import { updateProfile } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import Loading from '../../../../../../src/kernel/components/Loading';


export default function InfoProfile(props) {
  const { infoUser: { photoURL, displayName, email, uid } } = props;
  console.log("foto", photoURL);
  const [visible, setVisible ] = useState(false);

  const uploadImage = async (uri) => {
    setVisible(true);
    const response = await fetch(uri);
    const { _bodyBlob } = response;
    const storageRef = ref(storage, `avatar/${uid}`);
    return uploadBytes(storageRef, _bodyBlob)
  }

  const uploadPhotoUrl = () => {
    getDownloadURL(ref(storage, `avatar/${uid}`)).then((url) => {
      updateProfile(auth.currentUser, {
        photoURL: url,
      }).catch((error) => {
        console.log(error);
        alert('Error al actualizar la foto de perfil');
      }).finally(() => {
        setVisible(false);
      });
    });
  }

  const changeAvatar = async() =>{
    const resultPermission = await MediaLibrary.requestPermissionsAsync();
    if (resultPermission.status !== 'denied') {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        // base64: true,
      });
      if (!result.cancelled) {
        setVisible(true);
        try {
          await uploadImage(result.assets[0].uri);
          await uploadPhotoUrl();
          alert('Foto de perfil actualizada');
        } catch (error) {
          alert('Error al subir la foto de perfil');
        }finally{
          setVisible(false)
        }
      }
    }else{
      alert('Es necesario aceptar los permisos de la galería');
    }
  }

  return (
    <View style={styles.row}>
      <Avatar
        size={64}
        rounded
        source={{uri: photoURL || UsuarioAvatar}}
      >
        <Avatar.Accessory size={24} onPress={changeAvatar} />
      </Avatar>
      <View style={{ flexDirection: 'column', marginLeft: 16 }}>
        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>
          {displayName || 'Anonimo'}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {email || "No hay correo electrónico"}
        </Text>
      </View>
            <Loading
                visible={visible}
                title='Subiendo imagen ...'
            />
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 16,
  },
});