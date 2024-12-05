import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

const CompletePPUScreen = ({ navigation }) => {
    return (
        <FastImage source={require('../images/congratsgif.gif')} style={{flex:1}} resizeMode='cover'>
            <View style={styles.content}>
                <View style={{}}>
                    <FastImage source={require('../images/happy.gif')} style={{ width: width / 1.5, height: height / 2.5, alignSelf: 'center', borderRadius: 20, marginTop: 100 }} />
                </View>
                <View style={{ marginHorizontal: 40 }}>
                    <Text style={styles.titleText}>Congratulations!</Text>
                    <Text style={styles.subText}>You got the steps right to update your{'\n'}personal particulars. Now, you can easily {'\n'} do so from the comfort of your home,{'\n'}without heading to the branch.</Text>
                </View>

                <Pressable onPress={() => navigation.navigate('FirstScreen')} style={{ borderRadius: 20, borderColor: 'white', borderWidth: 12, width: width / 2.15, height: height / 11, elevation: 10, backgroundColor: '#ffaa00', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#0082d2', fontSize: 50, textAlign: 'center',fontFamily: 'Raleway-SemiBold' }}>Back to home</Text>
                </Pressable>
            </View>
        </FastImage>
    )
}

export default CompletePPUScreen

const styles = StyleSheet.create({
    content: {
        // flex: 1,
        // backgroundColor: 'white'
    },
    titleText: {
        fontSize: 100,
        // fontWeight: '600',
        color: '#0082d2',
        textAlign: 'center',
        marginTop: 50,
        fontFamily: 'Raleway-ExtraBold',
        fontWeight:'700'
    },
    subText: {
        fontSize: 45,
        // fontWeight: '600',
        color: '#0082d2',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: 'Raleway-SemiBold',
        // fontWeight:'700'
    }
})