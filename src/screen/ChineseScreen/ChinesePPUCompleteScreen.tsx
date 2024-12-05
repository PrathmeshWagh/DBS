import { Dimensions, Image, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image';
const { width, height } = Dimensions.get('window');

const ChinesePPUCompleteScreen = ({ navigation }) => {
    return (
        <FastImage source={require('../../images/congratsgif.gif')} style={{ flex: 1 }} resizeMode='cover'>
            <View style={styles.content}>
                <View style={{}}>
                    <FastImage source={require('../../images/happy.gif')} style={{ width: width / 1.5, height: height / 2.5, alignSelf: 'center', borderRadius: 20, marginTop: 100 }} />
                </View>
                <View style={{ marginHorizontal: 40 }}>
                    <Text style={styles.titleText}>恭喜您!</Text>
                    <Text style={styles.subText}>您已正确配对更新个人资料的步骤。现在，您可{'\n'}
                        以轻松地在家里完成个人资料更新，{'\n'}
                        而无需前往银行分行。</Text>
                </View>

                <Pressable onPress={() => navigation.navigate('FirstScreen')} style={{ borderRadius: 20, borderColor: 'white', borderWidth: 12, width: width / 2.15, height: height / 11, elevation: 10, backgroundColor: '#ffaa00', alignItems: 'center', justifyContent: 'center', alignSelf: 'center', marginTop: 30 }}>
                    <Text style={{ color: '#0082d2', fontSize: 50, textAlign: 'center', fontWeight: '700', fontFamily: '._NotoSansSC-Black', }}>返回主页</Text>
                </Pressable>
            </View>
        </FastImage>
    )
}

export default ChinesePPUCompleteScreen

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
        fontFamily: '._NotoSansSC-Black',
        fontWeight: '800',
        marginBottom: 50
    },
    subText: {
        fontSize: 47,
        // fontWeight: '600',
        color: '#0082d2',
        textAlign: 'center',
        marginTop: 10,
        fontFamily: '._NotoSansSC-Black',
        fontWeight: '700'
    }
})