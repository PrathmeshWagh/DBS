import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, Alert, TouchableOpacity, FlatList, Dimensions, Animated, ScrollView } from 'react-native';
import { shuffle } from 'lodash';
import Icon from 'react-native-vector-icons/Ionicons';

const images = [
    { id: 1, src: require('../images/ppu/ppu1.jpg'), title: 'Open the digibank app, tap on PayNow and login.' },
    { id: 2, src: require('../images/ppu/ppu.jpeg'), title: 'Select ‘Paynow’ from the smart shortcuts' },
    { id: 3, src: require('../images/ppu/ppu3.png'), title: 'Key in the Mobile No. of the recipient' },
    { id: 4, src: require('../images/ppu/ppu4.png'), title: 'Key in the amount to transfer and tap "Next' },
    { id: 5, src: require('../images/ppu/ppu5.png'), title: 'Review the transfer and select Transfer now' },
    { id: 6, src: require('../images/ppu/ppu6.png'), title: 'Your payment is successful!' }
];
const { width, height } = Dimensions.get('window');

const PPUScreen = ({ navigation }) => {
    const [bottomImages, setBottomImages] = useState(shuffle(images));
    const [placedImages, setPlacedImages] = useState([
        { id: 1, src: null, title: 'Open the digibank app, tap on PayNow and login.' },
        { id: 2, src: null, title: 'Select ‘Paynow’ from the smart shortcuts' },
        { id: 3, src: null, title: 'Key in the Mobile No. of the recipient' },
        { id: 4, src: null, title: 'Key in the amount to transfer and tap "Next' },
        { id: 5, src: null, title: 'Review the transfer and select Transfer now' },
        { id: 6, src: null, title: 'Your payment is successful!' }
    ]);

    const [currentBox, setCurrentBox] = useState(0);
    const [correctPlaced, setCorrectPlaced] = useState(false);

    const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [movingImage, setMovingImage] = useState(null);

    const [selectedImageId, setSelectedImageId] = useState(null);
    const [borderColor, setBorderColor] = useState('transparent');
    const [iconVisible, setIconVisible] = useState(false);
    const [iconType, setIconType] = useState(null);

    const handleImageSelect = (selectedImage, layout) => {
        if (selectedImage.id - 1 === currentBox) {
            setBorderColor('green');
            setSelectedImageId(selectedImage.id);
            setIconVisible(true);
            setIconType('checkmark-sharp');

            setTimeout(() => {
                setMovingImage(selectedImage);
                moveImageToBox(layout);

                setTimeout(() => {
                    const newPlacedImages = [...placedImages];
                    newPlacedImages[currentBox] = selectedImage;
                    setPlacedImages(newPlacedImages);
                    setCorrectPlaced(true);

                    const newBottomImages = bottomImages.map(image =>
                        image.id === selectedImage.id ? { ...image, src: null } : image
                    );
                    setBottomImages(newBottomImages);

                    if (currentBox === placedImages.length - 1) {
                        navigation.navigate('CompleteScreen');
                    } else {
                        setCurrentBox(currentBox + 1);
                    }
                    setTimeout(() => {
                        setIconVisible(false);
                        setMovingImage(null);
                        setSelectedImageId(null);
                    }, 2000);
                }, 500);
            }, 500);
        } else {
            setBorderColor('red');
            setSelectedImageId(selectedImage.id);

            setTimeout(() => {
                setSelectedImageId(null);
            }, 2000);

            setIconVisible(true);
            setIconType('close-sharp');
            setTimeout(() => {
                setIconVisible(false);
            }, 2000);
        }
    };

    const moveImageToBox = (layout) => {
        const targetX = (width / 6) * currentBox;
        const targetY = 0;

        animatedValue.setValue({ x: layout.x, y: layout.y });

        Animated.timing(animatedValue, {
            toValue: { x: targetX, y: targetY },
            duration: 500,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.columnsContainer}>
                {placedImages.map((image, index) => (
                    <View
                        key={index}
                        style={[styles.column, index < placedImages.length - 1 && styles.blinkingBox]}
                    >
                        {image ? (
                            <>
                                <Image source={image.src} style={styles.image} />
                                <View style={{ marginBottom: 5 }}>
                                    <Text style={[styles.columnText, { fontSize: 100, fontWeight: '700', color: 'black' }]}>Step {index + 1} :</Text>
                                    <Text style={styles.columnText}>{image.title}</Text>
                                </View>
                            </>
                        ) : (
                            <Text style={{ textAlign: 'center' }}>{`Box ${index + 1}`}</Text>
                        )}
                    </View>
                ))}
            </View>

            <View style={{ marginVertical: 100 }}>
                <Text style={styles.heading}>Match the steps to the screen!</Text>
                <Text style={styles.subHeading}>Tap on a step to move it to the top.</Text>
            </View>

            <View style={styles.bottomContainer}>
                <FlatList
                    data={bottomImages}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ alignItems: 'center', justifyContent: 'space-between', marginVertical: 0 }}
                    renderItem={({ item }) => (
                        item.src ? (
                            <TouchableOpacity
                                style={[
                                    styles.draggable,
                                    selectedImageId === item.id && { borderColor, borderWidth: 20 }
                                ]}
                                onPress={(event) => {
                                    event.target.measure((x, y, width, height, pageX, pageY) => {
                                        const layout = { x: pageX, y: pageY };
                                        handleImageSelect(item, layout);
                                    });
                                }}
                            >
                                <Image source={item.src} style={styles.bottomimage} />
                                {iconVisible && selectedImageId === item.id && (
                                    <Icon
                                        name={iconType}
                                        size={800}
                                        color={borderColor === 'green' ? 'green' : 'red'}
                                        style={styles.icon}
                                    />
                                )}
                            </TouchableOpacity>
                        ) : (
                            <View style={styles.emptyBox} />
                        )
                    )}
                />

            </View>

            {movingImage && (
                <Animated.View style={[styles.movingImageContainer, { transform: animatedValue.getTranslateTransform() }]}>
                    <Image source={movingImage.src} style={styles.image} />
                </Animated.View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    columnsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: height / 3.2,
        justifyContent: 'space-evenly',
    },
    column: {
        padding: 50,
        width: width / 6,
        backgroundColor: '#d8ddeb',
        alignItems: 'center',
    },
    columnText: {
        color: 'black',
        fontSize: 80,
        fontWeight: '500',
        textAlign: 'center',
    },
    blinkingBox: {
        height: '100%',
        borderWidth: 5,
        borderColor: 'white',
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    draggable: {
        width: width / 4.6,
        height: height / 3.8,
        marginHorizontal: 200,
        marginVertical: 50,
    },
    image: {
        width: '85%',
        height: '50%',
    },
    bottomimage: {
        width: width / 5,
        height: height / 4,
    },
    movingImageContainer: {
        position: 'absolute',
        width: width / 6,
        height: height / 4,
    },
    emptyBox: {
        width: width / 4.6,
        height: height / 3.8,
        marginHorizontal: 200,
        marginVertical: 50,
    },
    heading: {
        color: 'red',
        fontSize: 200,
        fontWeight: '600',
        textAlign: 'center',
    },
    subHeading: {
        color: 'black',
        fontSize: 200,
        fontWeight: '600',
        textAlign: 'center',
    },
    icon: {
        position: 'absolute',
        top: 300,
        right: 50,
    },
});

export default PPUScreen; 

