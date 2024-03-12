import { StyleSheet, View } from 'react-native'
import React from 'react'
import { Button } from '@rneui/base'
import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import InfoProfile from './components/InfoProfile';

export default function Profile() {
    const [user, setUser] = useState(null);
    const auth = getAuth();
    useEffect(() => {
        const profile = auth.currentUser;
        setUser(profile);
        if (profile!=null) {
            setUser(profile);
        }
    },[]);

    return (
        <View style={styles.container}>
            {user && (<InfoProfile infoUser={user} />)}
            <Button
                title='Cerrar Sesión'
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: "black" }}
                onPress={() => auth.signOut()}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#FFF'
    },
    row: {
        flexDirection: 'row',
        padding: 16,
    },
    btnContainer: {
        width: '80%',
        borderRadius: 16,
        alignSelf: 'center',
        marginBottom: 16,
    },
    btnStyle: {
        backgroundColor: '#fcd562'
    },
});