import { StyleSheet, Text, View } from 'react-native'
import SocketWrapper from './src/components/wrapper/SocketWrapper'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Home from './src/screen/Home'

const Stack = createNativeStackNavigator()

export default function App() {
  // useSocket();

  return (
    <SocketWrapper>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Home'
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SocketWrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
