import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal } from "react-native";
import {Card} from 'react-native-elements'
import GraphView from './GraphView';

class ModalView extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Modal
                animationType="slide"
                visible={this.props.showModal}
                onRequestClose={() => {
                    this.props.displayModal(!this.props.showModal);
                }}
                presentationStyle='pageSheet'
            >
                <View style={styles.container}>
                    <View style = {styles.bar}></View>
                    <View style={styles.graphcontainer}>
                        {/* <Text>GraphONE</Text> */}
                        <GraphView ticker={this.props.ticker}></GraphView>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ModalView

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'flex-start'
    },
    graphcontainer:{
        flex:1,
        flexDirection:'row',
        alignItems:'center'
    },
    bar:{
        marginTop:10,
        width: 100,
        height: 5,
        backgroundColor: "gray",
        borderRadius:10
    }
})