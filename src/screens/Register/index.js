import React, { useLayoutEffect, useState } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import { Input, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'


const Register = () => {

    // Manage Inputs with States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imgUrl, setImageUrl] = useState('')

    // Firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    // Functions
    // Register
    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log('Registered');
            const user = userCredential.user.updateProfile({
                displayName: name,
                photoURL: imgUrl || "https://images.unsplash.com/photo-1523253112282-26697ead8398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80"
            });
            console.log(user)
        }).catch((error) =>
            console.log(error)
        )
    }

    // Navigation Hook
    const navigation = useNavigation()

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Text h3 style={{ marginBottom: 50 }}>
                Create a Signal Account
            </Text>
            <View style={styles.inputContainer}>
                <Input placeholder='Full Name' autoFocus type="text" value={name} onChangeText={(text) => setName(text)} />
                <Input placeholder='Set Email' type="email" value={email} onChangeText={(text) => setEmail(text)} />
                <Input placeholder='Set Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
                <Input placeholder='Your Image URL (Optional)' type="text" value={imgUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
            </View>

            <Button raised title='Register' onPress={register} buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }} containerStyle={styles.botton} />
            <View style={{ height: 150 }} />
        </KeyboardAvoidingView>
    )
}

export default Register