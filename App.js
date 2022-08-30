import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register'
import HomeScreen from './src/screens/HomeScreen'
import AddChat from './src/screens/AddChat'

const Stack = createNativeStackNavigator();
const globalScreenOptions = {
  headerStyle: {backgroundColor: "#2c6bed"},
  headerTitleStyle: { color: 'white' },
  headerTintColor: "white",
  headerTitleAlign: 'center'
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
      // initialRouteName='Home' 
      screenOptions={globalScreenOptions}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AddChat" component={AddChat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}