import { View, Text, TouchableOpacity, SafeAreaView, KeyboardAvoidingView, Platform, ScrollView, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Avatar } from 'react-native-elements'
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons"
import styles from './styles'
// Firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config'
import { doc, setDoc, collection, getFirestore, serverTimestamp, orderBy, onSnapshot, query } from "firebase/firestore";
import { getAuth } from 'firebase/auth'


const ChatScreen = ({ navigation, route }) => {

  // States for Input
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  // Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth(app)
  const chatRef = collection(db, "chats")

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "left",
      headerTitle: () => (
        <View style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
          <Avatar rounded source={{ uri: messages[0]?.data?.photoURL || "https://images.unsplash.com/photo-1523253112282-26697ead8398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80" }} />
          <Text
            style={{ color: "white", marginLeft: 10, fontWeight: "700" }}
          >{route.params.chatName}</Text>
        </View>
      ),
      headerRight: () => (
        <View style={styles.topIcon}>
          <TouchableOpacity>
            <FontAwesome name='video-camera' size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name='call' size={24} color="white" />
          </TouchableOpacity>
        </View>
      )
    })
  }, [navigation, messages])

  // Send message function
  const sendMessage = async () => {
    // While Click away hide keyboard
    Keyboard.dismiss()
    // Save Timestamp to server
    const docData = {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,

    }

    await setDoc(doc(collection(chatRef, route.params.id, "messages")), docData).then(() => console.log("Data Save in firebase")).catch((error) => {
      console.log(error);
    })

    setInput("")

  }


  useLayoutEffect(() => {
    const unsub = onSnapshot(query(collection(chatRef, route.params.id, "messages"), orderBy("timestamp", "asc")), (snapshot) => {
      setMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    });

    return unsub

  }, [route])

  return (
    <SafeAreaView style={{ flex: 1, borderRightColor: "white" }}>
      <KeyboardAvoidingView
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback>
          <>
            <ScrollView contentContainerStyle={{
              paddingTop: 15
            }}>

              {messages.map(({ id, data }) => (
                data.email === auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      source={{
                        uri: data.photoURL
                      }}
                      size={30}
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                    />
                    <Text style={styles.recieverText}>{data.message}</Text>
                  </View>
                ) : (
                  <View style={styles.sender}>
                    <Avatar
                      position="absolute"
                      bottom={-15}
                      right={-5}
                      source={{
                        uri: data.photoURL
                      }}
                      size={30}
                      rounded
                      containerStyle={{
                        position: "absolute",
                        bottom: -15,
                        right: -5
                      }}
                    />
                    <Text style={styles.senderText}>{data.message}</Text>
                    <Text style={styles.senderName}>{data.displayName}</Text>
                  </View>
                )
              ))}

            </ScrollView>
            {/* Footer */}
            <View style={styles.footer}>
              <TextInput
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={text => setInput(text)} placeholder='Message'
                style={styles.input}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name='send' size={24} color="#2b68e6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default ChatScreen