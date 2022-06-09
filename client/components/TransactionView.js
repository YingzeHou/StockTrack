import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
class TransactionView extends React.Component{
    constructor(){
        super();
    }
    render(){
    return(
        <View style={styles.container}>
            <Text>Do Transaction Here</Text>
        </View>
    )
    }
}
export default TransactionView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
});