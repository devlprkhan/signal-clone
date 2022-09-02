import React, { useEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar, ListItem } from 'react-native-elements'
// Firebase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../firebase-config'
import { doc, setDoc, collection, getFirestore, serverTimestamp, orderBy, onSnapshot, query } from "firebase/firestore";
import { getAuth } from 'firebase/auth'

const CustomListItem = ({ id, chatName, enterChat }) => {

  // Firebase
  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app);
  const auth = getAuth(app)
  const chatRef = collection(db, "chats")

  // Keep track of messages
  const [chatMessages, setChatMessages] = useState([])
  useEffect(() => {
    const unsubscribe = onSnapshot(query(collection(chatRef, id, "messages"), orderBy("timestamp", "desc")), (snapshot) => {
      setChatMessages(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    });

    return unsubscribe

  }, [])

  return (
    <ListItem
      key={id}
      onPress={() => enterChat(id, chatName)}
      bottomDivider
    >
      <Avatar
        rounded
        source={{
          uri: chatMessages[0]?.data?.photoURL || "https://images.unsplash.com/photo-1523253112282-26697ead8398?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=913&q=80"
        }}
      />
      <ListItem.Content>
        <ListItem.Title style={{ fontWeight: "800" }}>
          {chatName}
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
          {chatMessages[0]?.data?.displayName}: {chatMessages[0]?.data?.message}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  )
}

export default CustomListItem