import React from 'react'
import { Text, View, SafeAreaView, ScrollView } from 'react-native'
import CustomListItem from '../../components/CustomListItem'
import styles from './styles'

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <ScrollView>
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

