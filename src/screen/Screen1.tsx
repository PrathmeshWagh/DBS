import { Dimensions, Image, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native'
import React from 'react';
const { width, height } = Dimensions.get('window')

const Screen1 = ({ navigation }: any) => {
    return (
        <View style={styles.container}>
            <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: height/9, }}>
                <Image source={require('../images/dbs.jpg')} style={{ width: width/1.5, height: height / 2.5, borderRadius: 20 }}  />
            </View>

            <View style={{ marginVertical: 200 }}>
                <Text style={{ color:'red', fontSize: 200, fontWeight: '600', textAlign: 'center', marginTop: 20,letterSpacing:5}}>Choose your safety{'\n'} feature journey</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginHorizontal:50}}>
                <Pressable onPress={() => navigation.navigate('main')} style={{ borderRadius: 100, width: width /2.15, height: height/8, elevation: 10, backgroundColor: '#D3D3D3', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 150, fontWeight: '600', textAlign: 'center' }}>PayNow{'\n'} Fund Transfer</Text>
                </Pressable>
                <Pressable onPress={() => navigation.navigate('PPUScreen')} style={{ borderRadius: 100,  width: width / 2.15, height: height/8, elevation: 10, backgroundColor: '#D3D3D3', alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={{ color: 'black', fontSize: 150, fontWeight: '600', textAlign: 'center' }}>Personal{'\n'}Particulars Update</Text>
                </Pressable>
            </View>

            <View  style={{marginTop:200}}>
                <Text style={{ color: 'red', fontSize: 180, fontWeight: '600', textAlign: 'center', marginTop: 20 }}>Learning digital is easy!</Text>
            </View>
        </View>
    )
}

export default Screen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E0F7F1',
        padding: 5
    }
})