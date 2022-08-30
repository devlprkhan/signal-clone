import React, { useLayoutEffect } from 'react'
import { Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import { Avatar } from 'react-native-elements'
import CustomListItem from '../../components/CustomListItem'
import styles from './styles'
// Firebase
import { getAuth, signOut } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'
// Icons
import {AntDesign, SimpleLineIcons} from '@expo/vector-icons'

const HomeScreen = ({ navigation }) => {

  // Firebase
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)


  // Signout
  const signOutUser = () => {
    signOut(auth).then(() => {
      navigation.replace('Login')
    }).catch((error) => console.log(error))
  }


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
                <AntDesign name='camerao' size={24} color="#000"/>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("AddChat")} activeOpacity={0.5}>
                <SimpleLineIcons name='pencil' size={24} color="#000"/>
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation])

  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

