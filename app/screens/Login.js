import React, { useState } from 'react';
import { Button, ImageBackground } from 'react-native';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import { signInWithEmailAndPassword } from 'firebase/auth';
import bgimage from '../img/bg.jpg';

import { auth } from '../../firebaseConfig';
import { st } from '../components/Styles';

function Login({ navigation, back }) {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = () => {
        if (username != "" && password != "") {
            signInWithEmailAndPassword(auth, username, password).then((ref) => {
                console.log(ref);
                setError("");
                navigation.navigate("All Records");
            })
                .catch((ref) => {
                    console.log(ref);
                    setError('No user found with the email..!!')
                });
        } else {
            setError('Please fill both the field..!!')
        }
    }

    const goBack = () => {
        navigation.navigate("Home");
    }

    return (
        <ImageBackground style={st.flexContainer} source={bgimage}>
            <SafeAreaView style={[st.flexContainer]}>
                <View style={st.header} ><Text onPress={goBack} style={[styles.backButton, st.whiteFont]}>Back</Text></View>
                <View style={styles.wrapper}>
                    <Text style={st.whiteFont}>Enter your credentials</Text>
                    <TextInput
                        style={styles.input}
                        value={username}
                        placeholder='Username'
                        onChangeText={setUsername} />
                    <TextInput
                        style={styles.input}
                        value={password}
                        placeholder="Password"
                        onChangeText={setPassword}
                        secureTextEntry={true} />
                    <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                        <Text style={[st.font]}>Login</Text>
                    </TouchableOpacity>
                    {/* <View><GoogleButton onClick={googleSingin} /></View> */}
                    <Button style={styles.cancelButton} color='white' title='Cancel' onPress={() => navigation.goBack()} />
                    <Text style={st.font}>{error}</Text>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    loginButton: {
        width: '80%',
        backgroundColor: '#569DAA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center'
    },
    input: {
        width: '80%',
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        borderRadius: 5,
        backgroundColor: 'lightgrey',
        fontSize: 20
    },
    wrapper: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 5
    },
    header: {
        flexDirection: "row",
        height: 50,
        width: '100%',
        alignItems: 'center',
        padding: 10
    },
    backButton: {
        fontSize: 25
    }
});

export default Login;