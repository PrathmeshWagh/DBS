import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

const ChineseCompleteScreen = ({ navigation }) => {
    return (
        <FastImage source={require('../../images/congratsgif.gif')} style={{ flex: 1 }} resizeMode='cover'>
            <View style={styles.content}>
                <View style={{}}>
                    <FastImage source={require('../../images/happy.gif')} style={{ width: width / 1.5, height: height / 2.5, alignSelf: 'center', borderRadius: 20, marginTop: 100 }} />
                </View>
                <View style={{ marginHorizontal: 40 }}>
                    <Text style={styles.titleText}>恭喜您！</Text>
                    <Text style={styles.subText}>您已正确配对 PayNow 转账的步骤。{'\n'}
                        现在，您可以使用您亲友的手机号码，{'\n'}
                        轻松转账给他们。
                    </Text>
                </View>

                <Pressable onPress={() => navigation.navigate('FirstScreen')} style={{ borderRadius: 20, borderColor: 'white', borderWidth: 12, width: width / 2.15, height: height / 11, elevation: 10, backgroundColor: '#ffaa00', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#0082d2', fontSize: 50, textAlign: 'center', fontWeight: '700', fontFamily:'._NotoSansSC-Black',}}>返回主页</Text>
                </Pressable>
            </View>
        </FastImage>
    )
}

export default ChineseCompleteScreen

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
        marginTop: 10,
        fontFamily:'._NotoSansSC-Black',
        fontWeight: '800',
        marginBottom:20
    },
    subText: {
        fontSize: 55,
        // fontWeight: '600',
        color: '#0082d2',
        textAlign: 'center',
        marginTop: 10,
        fontFamily:'._NotoSansSC-Black',
        fontWeight: '700'
    }
})