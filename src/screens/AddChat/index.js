import React, { useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import styles from './styles'
import { Button, Icon, Input } from 'react-native-elements'
// Firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'
import { getFirestore, collection, doc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'



const AddChat = ({ navigation }) => {

  // States for Inputs
  const [input, setInput] = useState("")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Add a new chat",
      headerBackTitle: "Chats"
    })
  }, [navigation])

  // Functio to createChat
  // Firebase Stuff
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const chatRef = collection(db, "chats");


  const createChat = async () => {
    await setDoc(doc(chatRef), {
      chatName: input,
    }).then(() => {
      navigation.navigate("Home")
    }).catch((error) => console.log(error))
  }


  return (
    <View style={styles.container}>
      <View style={styles.input}>
      <Input
        placeholder='Chat Name'
        value={input}
        onChangeText={(text) => setInput(text)}
        onSubmitEditing={createChat}
        leftIcon={
          <Icon name='wechat' type='antdesign' size={24} color="#000" />
        }
        />
        </View>
      <Button disabled={!input} buttonStyle={{ backgroundColor: '#2c6bed' }} onPress={createChat} title="Create new Chat" />
    </View>
  )
}

export default AddChat