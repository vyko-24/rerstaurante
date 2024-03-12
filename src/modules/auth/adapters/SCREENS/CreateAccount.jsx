import React, { useState } from "react";
import { View, Text, StyleSheet} from "react-native";
import { Input, Button, Image, Icon } from '@rneui/base';
import Logo from '../../../../../assets/images.jpg';
import { isEmpty } from 'lodash'
import Loading from '../../../../kernel/components/Loading';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

export default function CreateAccount(props) {
    const { navigation } = props;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(true);
    const [showMessage, setShowMessage] = useState('');
    const [visible, setVisibel] = useState(false);
    const auth = getAuth();

    const register = async () => {
        if (!isEmpty(email) && !isEmpty(password) && !isEmpty(confirmPassword)) {
            if (password !== confirmPassword) {
                setShowMessage('Las contraseñas no coinciden');
                return;
            }

            setShowMessage("");
            setVisibel(true);

            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log("Usuario creado con éxito");
                // Pa redirigir a otro lado, pero ahí que vea el profe
            } catch (error) {
                console.log("Error al crear usuario", error);
                setShowMessage("Error al crear usuario");
            } finally {
                setVisibel(false);
            }
        } else {
            setShowMessage('Todos los campos son obligatorios');
        }
    }

    return (
        <View style={styles.container}>
            <Image
                source={Logo}
                style={styles.logo}
                residizeMode='contain'
            />

            <Input
                placeholder='viko@utez.com'
                label='Correo Electrónico: *'
                keyboardType='email-address'
                onChange={({ nativeEvent: {text} }) => setEmail(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                errorMessage={showMessage}
                rightIcon={
                    <Icon
                        type='material-community'
                        name='email-outline'
                        color='tomato'
                    />
                }
            />

            <Input
                placeholder='*********'
                label='Contraseña: *'
                onChange={({ nativeEvent: {text} }) => setPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        color='tomato'
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                errorMessage={showMessage}
            />

            <Input
                placeholder='*********'
                label='Confirmar Contraseña: *'
                onChange={({ nativeEvent: {text} }) => setConfirmPassword(text)}
                labelStyle={styles.label}
                containerStyle={styles.input}
                secureTextEntry={showPassword}
                rightIcon={
                    <Icon
                        type='material-community'
                        name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                        color='tomato'
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
                errorMessage={showMessage}
            />

            <Button
                title='Registrarse'
                onPress={register}
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btnStyle}
                titleStyle={{ color: '#000' }}
            />

            <Loading
                visible={visible}
                title='Registrando usuario...'
            />

            <Button
                title='Iniciar Sesión'
                type='clear'
                onPress={() => navigation.navigate('Login')}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    logo: {
        width: 120,
        height: 120,
    },
    input: {
        paddingHorizontal: 16,
        marginVertical: 8
    },
    label: {
        color: 'tomato',
    },
    btnStyle: {
        backgroundColor: '#fcd562',
    },
    btnContainer: {
        width: '80%',
    }
});