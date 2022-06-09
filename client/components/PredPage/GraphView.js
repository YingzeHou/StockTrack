import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
} from "react-native-chart-kit";
import React from 'react';
import { View, Dimensions, Text, StyleSheet } from "react-native";
import { uri } from "../../config";

class GraphView extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            dates:[],
            vals:[]
        }
    }
    convertDate(dateList){
        var res = []
        for(const d of dateList){
            var date = new Date(d);
            var result = ((date.getMonth().toString().length > 1) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' + ((date.getDate().toString().length > 1) ? date.getDate() : ('0' + date.getDate())) + '/' + date.getFullYear();
            res.push(result);
        }
        return res;
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
        fetch(uri+"/ticker/"+this.props.ticker, {
          headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
           }
        })
        .then((res) => res.json())
        .then(res => {
          this.setState({dates: this.convertDate(Object.values(res.Date)), vals: this.convertVal(Object.values(res.Close))})
        })
    }
    render(){
        return(
            <View style={styles.container}>
                {(this.state.dates.length===0)? (
                    <Text>Loading......</Text>
                ):(
                    <View style={styles.subcontainer}>
                        <Text style={styles.title}>Future 7-day Prediction for {this.props.ticker}</Text>
                        <LineChart
                            data={{
                            labels: this.state.dates,
                            datasets: [
                                {
                                data: this.state.vals
                                }
                            ],
                            legend: ["Price Dots"]
                            }}
                            width={Dimensions.get("window").width-10} // from react-native
                            height={400}
                            yAxisLabel="$"
                            yAxisInterval={1} // optional, defaults to 1
                            verticalLabelRotation={30}
                            renderDotContent={({ x, y, index }) => {
                                return (
                                <View
                                    key={index}
                                    style={{
                                    height: 10,
                                    width: 50,
                                    position: "absolute",
                                    top: y + 40, // <--- relevant to height / width (
                                    left: x - 20, // <--- width / 2
                                    }}
                                >
                                    <Text style={{ fontSize: 10, color: '#fff' }}>{this.state.vals[index]}</Text>
                                </View>
                                );
                            }}
                            chartConfig={{
                            propsForVerticalLabels:{
                                fontSize:8
                            },
                            barPercentage: 0.5,
                            backgroundColor: "#488a99",
                            backgroundGradientFrom: "#488a99",
                            backgroundGradientTo: "#1f3f49",
                            decimalPlaces: 2, // optional, defaults to 2dp
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 20,
                            },
                            propsForDots: {
                                r: "6",
                                strokeWidth: "2",
                                stroke: "#484848"
                            }
                            }}
                            style={{
                            renderVerticalLabels:{
                                paddingTop: 10
                            },
                            marginVertical: 8,
                            borderRadius: 16
                            }}
                        />
                    </View>
                )}
            </View>
        )
    }
}

export default GraphView

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center'
    },
    subcontainer:{
        alignItems:'center'
    },
    title:{
        fontSize:15,
        fontWeight:'bold'
    }
})