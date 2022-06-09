import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from "react-native";
import {Card} from 'react-native-elements'
import { uri } from '../../config';
import ModalView from './ModalView';
class ListView extends React.Component{
    constructor(props){
        super(props);
        this.state={
            showModal: false,
            price:0,
            lastPrice:0,
        }
        this.displayModal = this.displayModal.bind(this);
    }
    displayModal = ()=>{
        this.setState({showModal:!this.state.showModal});
    }
    convertVal(valList){
        var res = []
        for(const v of valList){
            var result = Math.round(parseFloat(v) * 100) / 100
            res.push(result);
        }
        return res;
    }
    componentDidMount(){
        fetch(uri+"/ticker/price/"+this.props.ticker, {
            method:'GET',
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
          .then((res) => res.json())
          .then(res => {
            this.setState({price: this.convertVal(Object.values(res))[1], lastPrice: this.convertVal(Object.values(res))[0]})
          })
    }
    render(){
        return(
            <View>
                <Pressable onPress={()=>this.displayModal()}>
                    <Card containerStyle={styles.container}>
                        <View style={styles.pricecontainer}>
                            <Text style={styles.title}>{this.props.ticker}</Text>
                            {(this.state.price-this.state.lastPrice>0) ? (
                                <View style={styles.indcontainer}>
                                    <View style={styles.uptriangle}></View>
                                    <Text style={styles.uptextlight}>{Math.round(parseFloat(((this.state.price-this.state.lastPrice)/this.state.lastPrice)*100)*100)/100}%</Text>
                                </View>
                            ):(
                                <View style={styles.indcontainer}>
                                    <View style={styles.downtriangle}></View>
                                    <Text style={styles.downtextlight}>{Math.round(parseFloat(((this.state.price-this.state.lastPrice)/this.state.lastPrice)*100)*100)/100}%</Text>
                                </View>
                            )}
                        </View>
                        {/* <Card.Title style={styles.title}>{this.props.ticker} Predictor</Card.Title> */}
                        <View style={styles.pricecontainer}>
                            <Text style={styles.text}>Current Price:</Text>
                            <Text style={(this.state.price-this.state.lastPrice>0)?styles.uptext:styles.downtext}>{this.state.price}</Text>
                        </View>
                        <View style={styles.block}></View>
                        <View style={styles.line}></View>
                    </Card>
                </Pressable>
                <ModalView showModal={this.state.showModal} displayModal={this.displayModal} ticker={this.props.ticker}></ModalView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        borderWidth:0,
        shadowColor: 'rgba(0,0,0, 0.0)',
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0, //default is 1
        shadowRadius: 0,//default is 1
        marginTop:0,
    },
    block:{
        height:10,
    },
    line:{
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        opacity:0.1
    },
    title:{
        fontSize:15,
        color:'#1f3f49',
        fontWeight:'bold'
    },
    text:{
        color:'#1f3f49',
    },
    uptext:{
        color:'green',
        fontWeight:'bold'
    },
    uptextlight:{
        color:'green'
    },
    downtext:{
        color:'red',
        fontWeight:'bold'
    },
    downtextlight:{
        color:'red',
    },
    pricecontainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:5
    },
    indcontainer:{
        flex:1,
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        marginTop:5
    },
    uptriangle:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "green",
    },
    downtriangle:{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: 5,
        borderRightWidth: 5,
        borderBottomWidth: 10,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "red",
        transform: [{ rotate: "180deg" }],
    }
})
export default ListView