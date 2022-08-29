import React, { useEffect, useState } from 'react'
import { View, Text, Image, KeyboardAvoidingView } from 'react-native'
import { StatusBar } from 'expo-status-bar';
import styles from './styles';
import { Input, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
// Firebase
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'

const Login = () => {

  // Manage Inputs with States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // Navigation Hook
  const navigation = useNavigation()

  // Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  // Listner
  useEffect(() => {
  const unsubscribe = auth.onAuthStateChanged((authUser) => {
    console.log("Current user: ",authUser);
    
    if (authUser) {
      navigation.replace("Home")
    }
  });

  return unsubscribe
  }, [])


  // Functions
  // Sign in
  const signIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed In');
        const user = userCredential.user
        console.log(user);
      })
      .catch((error) => {
        console.log(error)
      })
  }


  return (
    <KeyboardAvoidingView style={styles.container}>
      <StatusBar style='light' />
      <Image
        source={{
          uri: "https://pnggrid.com/wp-content/uploads/2021/05/Signal-1024x1024.png"
        }}
        style={styles.logo}
      />

      <View style={styles.inputContainer}>
        <Input placeholder='Set Email' type="email" value={email} onChangeText={(text) => setEmail(text)} />
        <Input placeholder='Set Password' secureTextEntry type="password" value={password} onChangeText={(text) => setPassword(text)} />
      </View>

      <Button title="Login" onPress={signIn} containerStyle={styles.botton} buttonStyle={{ backgroundColor: '#2c6bed' }} />
      <Button onPress={() => navigation.navigate('Register')} title="Register" type='outline' containerStyle={styles.botton} buttonStyle={{ borderColor: '#2c6bed' }} titleStyle={{ color: '#2c6bed' }}
      />
    </KeyboardAvoidingView>
  )
}

export default Login