import { Dimensions, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';

const { width, height } = Dimensions.get('window');

const FirstScreen = ({ navigation }) => {
    return (
        <ImageBackground source={require('../images/backimg.jpg')} style={{flex:1}} resizeMode='cover'>

        <View style={styles.content}>
            <FastImage source={require('../images/startcat.gif')} resizeMode='cover' style={styles.imgage} />
            <View style={{marginVertical:20}}>
                <Text style={styles.text}>Choose your {'\n'} preferred language</Text>
                <Text style={[styles.text,{ fontFamily: '._NotoSansSC-SemiBold'}]}>选择您的语言</Text>
            </View>

            <View style={styles.buttonContainer}>
                <Pressable onPress={() => navigation.navigate('Screen1')} style={styles.button}>
                    <Text style={[styles.buttonText,{fontFamily:'Raleway'}]}>English</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('ChineseScreen1')} style={styles.button}>
                    <Text style={styles.buttonText}>中文</Text>
                </Pressable>
            </View>
        </View>
        </ImageBackground>
    ) 
}

export default FirstScreen

const styles = StyleSheet.create({
    content: {
        flex: 1,
        // backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 200
    },
    imgage: {
        width: width / 1.6,
        height: height / 3,
        borderRadius: 20,
    },
    text: {
        color: '#0082d2',
        fontSize: 70,
        textAlign: 'center',
        // marginVertical: 20,
        fontFamily: 'Raleway-Bold',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 20,
    },
    button: {
        borderRadius: 50,
        borderColor: 'white',
        borderWidth: 12,
        width: width / 2.40,
        height: height / 7,
        elevation: 10,
        backgroundColor: '#ffaa00',
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 30
    },
    buttonText: {
        color: '#0082d2',
        fontSize: 80,
        textAlign: 'center',
        fontFamily: '._NotoSansSC-Black',
        fontWeight:'800'
    },
})