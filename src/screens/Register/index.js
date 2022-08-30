import React, { useLayoutEffect, useState } from 'react'
import { View, KeyboardAvoidingView } from 'react-native'
import styles from './styles'
import { Input, Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'


const Register = () => {

    // Manage Inputs with States
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    // Firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth(app)

    // Functions

    // DP And Name Set In Firebase
    const update = {
        displayName: name,
        photoURL: imageUrl || "https://image.shutterstock.com/image-vector/khan-written-arabic-calligraphy-pakistani-260nw-2149564075.jpg"
    }

    // Register
    const register = async () => {
        const { user } = await createUserWithEmailAndPassword(auth, email, password)
            .catch((error) =>
                console.log(error)
            )

        await updateProfile(user, update).catch((error) =>
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
                <Input placeholder='Your Image URL (Optional)' type="text" value={imageUrl} onChangeText={(text) => setImageUrl(text)} onSubmitEditing={register} />
            </View>

            <Button raised title='Register' onPress={register} buttonStyle={{ backgroundColor: 'rgba(78, 116, 289, 1)' }} containerStyle={styles.botton} />
            <View style={{ height: 150 }} />
        </KeyboardAvoidingView>
    )
}

export default Register