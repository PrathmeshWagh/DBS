import React from 'react';
import { Dimensions, StyleSheet, Text, View, Pressable, Image, ImageBackground } from 'react-native';
import Video from 'react-native-video';
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

const Screen1 = ({ navigation }) => {
    return (
        <ImageBackground source={require('../images/backimg.jpg')} style={{ flex: 1 }} resizeMode='cover'>

            <View style={styles.container}>
                <FastImage source={require('../images/startcat.gif')} style={styles.image} />
                <Text style={styles.text}>Choose the banking{'\n'}service you would like to{'\n'} learn</Text>
                <View style={styles.buttonContainer}>
                    <Pressable onPress={() => navigation.navigate('main')} style={styles.button}>
                        <Text style={styles.buttonText}>PayNow{'\n'} funds transfer</Text>
                    </Pressable>
                    <Pressable onPress={() => navigation.navigate('PPUScreen')} style={styles.button}>
                        <Text style={styles.buttonText}>Personal{'\n'}particulars {'\n'} update</Text>
                    </Pressable>
                </View>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'white',
        alignItems: 'center',
        paddingTop: 200
    },
    image: {
        width: width / 1.6,
        height: height / 3,
        borderRadius: 20,
    },
    text: {
        color: '#0082d2',
        fontSize: 70,
        textAlign: 'center',
        marginVertical: 25,
        fontFamily: 'RalewayLiningFig-Heavy',
        //   fontWeight:'800'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // marginHorizontal: 100,
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
        fontSize: 48,
        textAlign: 'center',
        fontFamily: 'Raleway-SemiBold',
        // fontWeight:'800'
    },
});

export default Screen1;
