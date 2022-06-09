import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import GraphView from './PredPage/GraphView';
import Constants from "expo-constants";
import ListView from './PredPage/ListView';
import { uri } from '../config';

class PredictionView extends React.Component{
    constructor(){
        super();
        this.state = {
          tickerInfos:{},
          tickerCodes: []
        }
    }
    componentDidMount(){
        fetch(uri+"/ticker/all",{
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((res) => res.json())
        .then(res => {
            this.setState({tickerCodes: res.codes})
        })
      }
    render(){
    return(
        <View style={styles.container}>
            {(this.state.tickerCodes.length===0)?(
                <View>
                    <Text>Loading...</Text>
                </View>
            ):(
                <View style={styles.container}>
                    <Text style={styles.title}>Stocks</Text>
                    <ScrollView>
                        {this.state.tickerCodes.map((code, i) => (
                            <ListView key={i} ticker={code}></ListView>
                        ))}
                    </ScrollView> 
                </View>
            )}
            {/* <GraphView></GraphView> */}
        </View>
    )
    }
}
export default PredictionView;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    title:{
        fontSize:25,
        margin:25
    },
    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        opacity:0.1
    },
});