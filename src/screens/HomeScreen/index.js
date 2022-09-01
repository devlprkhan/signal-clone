import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../../components/CustomListItem'
import styles from './styles'
// Firebase
import { getAuth, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'
import { getDocs, getFirestore, collection, onSnapshot } from 'firebase/firestore';

// Icons
import { AntDesign, SimpleLineIcons } from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {

  // Get data from firestore (firebase) states
  const [chats, setChats] = useState([])

  // Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const db = getFirestore(app);
  const chatsData = collection(db, "chats");  

  // Signout
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace('Login')
    }).catch((error) => console.log(error))
  }

  // Get data from firestore (firebase) and set to States
  useEffect(() => {
    const unsubscribe = onSnapshot(chatsData, (snapshot) => {
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    })

    return unsubscribe
  }, [])

  // Heading Styling
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Signal',
      headerStyle: { backgroundColor: "#fff" },
      headerTitleStyle: { color: "#000" },
      headerTintColor: "#000",
      headerLeft: () => (<View>
        <TouchableOpacity onPress={signOutUser} activeOpacity={0.5}>
          <Avatar rounded source={{ uri: auth?.currentUser?.photoURL }} />
        </TouchableOpacity>
      </View>),
      headerRight: () => (
        <View style={{
          flexDirection: 'row',
          justifyContent: "space-between",
          width: 80,
          marginRight: 0
        }}>
          <TouchableOpacity activeOpacity={0.5}>
            <AntDesign name='camerao' size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
            <SimpleLineIcons name='pencil' size={24} color="#000" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
        id,
        chatName,
    })
  }

  return (
    <SafeAreaView>
      <ScrollView style={{height: '100%'}}>
        {
          chats.map(({ id, data: { chatName } }) => <TouchableOpacity><CustomListItem key={id} id={id} chatName={chatName} enterChat={enterChat}/></TouchableOpacity>
          )
        }
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

