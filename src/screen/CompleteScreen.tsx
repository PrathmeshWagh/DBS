import { Dimensions, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
const { width, height } = Dimensions.get('window')

const CompleteScreen = () => {
    return (
        <View style={styles.container}>
            <View style={{marginTop:20}}>
                <Image source={require('../images/dbs.jpg')} style={{ width: width/2, height: height / 3, alignSelf: 'center', borderRadius:20, marginTop:300 }} />
            </View>
            <Text style={styles.titleText}>Congratulation!</Text>
            <Text style={styles.subText}>You’ve learned the right steps to do a PayNow Funds Transfer! You can now perform cashless payments safely {`\n`}and securely</Text>
        </View>
    )
}

export default CompleteScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    titleText: {
        fontSize: 250,
        fontWeight: '600',
        color: 'red',
        textAlign: 'center',
        marginTop: 100
    },
    subText: {
        fontSize: 180,
        fontWeight: '600',
        color: 'black',
        textAlign: 'center',
        marginTop: 10
    }
})