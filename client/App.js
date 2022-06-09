import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PredictionView from './components/PredictionView';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import TransactionView from './components/TransactionView';

const Tab = createBottomTabNavigator();
class App extends React.Component{
  constructor(props){
    super(props);
    
  }
  render(){
    return(
      <NavigationContainer>
        <Tab.Navigator initialRouteName='Prediction'
          screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Prediction') {
              iconName = focused
              ? 'trending-up'
              : 'trending-up-outline';
          } else if (route.name === 'Transaction') {
              iconName = focused ? 'card' : 'card-outline';
          } 
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'gray',
      })}
        >
          <Tab.Screen name="Prediction">
            {(props) =>(
              <PredictionView></PredictionView>
            )}
          </Tab.Screen>
          <Tab.Screen name="Transaction">
            {(props) =>(
              <TransactionView></TransactionView>
            )}
          </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>
    )
  }
}
export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
