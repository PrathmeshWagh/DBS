import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions, Animated, ScrollView, Vibration } from 'react-native';
import { shuffle } from 'lodash';
import Icon from 'react-native-vector-icons/FontAwesome6';
import Icon1 from 'react-native-vector-icons/Entypo';
import FastImage from 'react-native-fast-image';

const images = [
    { id: 1, src: require('../../images/ppu/Asset1.webp'), title: 'Open the digibank app, tap on PayNow and login.' },
    { id: 2, src: require('../../images/ppu/Asset2.webp'), title: 'Select ‘Paynow’ from the smart shortcuts' },
    { id: 3, src: require('../../images/ppu/Asset3.webp'), title: 'Key in the Mobile No. of the recipient' },
    { id: 4, src: require('../../images/ppu/Asset4.webp'), title: 'Key in the amount to transfer and tap "Next' },
    { id: 5, src: require('../../images/ppu/Asset5.webp'), title: 'Review the transfer and select Transfer now' },
    { id: 6, src: require('../../images/ppu/Asset6.webp'), title: 'Your payment is successful!' }
];

const { width, height } = Dimensions.get('window');

const ChinesePPUScreen = ({ navigation }: any) => {
    const [bottomImages, setBottomImages] = useState(shuffle(images));
    const [placedImages, setPlacedImages] = useState([
        { id: 1, src: null, title: '登录 digibank。' },     
        { id: 2, src: null, title: '点击 “More”。' },
        { id: 3, src: null, title: '点击 “Update\n Particulars”。' },
        { id: 4, src: null, title: '选择 “Contact Details”。' },
        { id: 5, src: null, title: '点击 “Change” 后，修改您的个\n人联系资料。' },
        { id: 6, src: null, title: '修改完成后，\n核对所有信息\n请求并点击\n“Confirm”。' }
    ]);
    const [currentBox, setCurrentBox] = useState(0);
    const [correctPlaced, setCorrectPlaced] = useState(null);

    const animatedValue = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
    const [movingImage, setMovingImage] = useState(null);
    const [selectedImageId, setSelectedImageId] = useState(null);
    const [borderColor, setBorderColor] = useState('transparent');
    const [iconVisible, setIconVisible] = useState(false);
    const [iconType, setIconType] = useState(null);

    const inactivityTimeout = useRef(null);
    const [highlighborder, setHighlighBorder] = useState(false)
    const promptDelay = 8000;
    const [showInactivityImage, setShowInactivityImage] = useState(false);
    const [showCorrectGif, setShowCorrectGif] = useState(false);
    const [showIncorrectGif, setShowIncorrectGif] = useState(false);
    const [isGifVisible, setIsGifVisible] = useState(false);



    useEffect(() => {
        startInactivityTimer();
        return () => {
            clearTimeout(inactivityTimeout.current);
        };
    }, []);


    const startInactivityTimer = () => {        
        if (inactivityTimeout.current) {
            clearTimeout(inactivityTimeout.current);
        }
        inactivityTimeout.current = setTimeout(() => {            
            showInactivityPrompt();
        }, promptDelay);
    };

    const showInactivityPrompt = () => {
        setShowInactivityImage(true)
        setHighlighBorder(true)


    };

    const resetInactivityTimer = () => {
        startInactivityTimer()
        setShowInactivityImage(false);
        setHighlighBorder(false)
    };


    const handleImageSelect = (selectedImage, layout) => {
        resetInactivityTimer();
        // clearTimeout(inactivityTimeout.current);

        if (selectedImage.id - 1 === currentBox) {
            // Correct selection
            if (!isGifVisible || selectedImageId !== selectedImage.id) {
                setBorderColor('#45f248');
                setSelectedImageId(selectedImage.id);
                setIconVisible(true);
                setIconType('check');
                setCorrectPlaced(true);

                // Remove any ongoing GIFs
                setShowCorrectGif(false);
                setShowIncorrectGif(false);

                // Show the correct GIF instantly
                setShowCorrectGif(true);
                setIsGifVisible(true);

                setTimeout(() => {
                    setShowCorrectGif(false); // Hide correct GIF
                    setIsGifVisible(false);
                }, 3000); // Reduced delay

                // Proceed with moving image and updating state
                setTimeout(() => {
                    setMovingImage(selectedImage);
                    moveImageToBox(layout);

                    setTimeout(() => {
                        const newPlacedImages = [...placedImages];
                        newPlacedImages[currentBox] = selectedImage;
                        setPlacedImages(newPlacedImages);

                        const newBottomImages = bottomImages.map(image =>
                            image.id === selectedImage.id ? { ...image, src: null } : image
                        );
                        setBottomImages(newBottomImages);

                        if (currentBox === placedImages.length - 1) {
                            navigation.navigate('ChinesePPUCompleteScreen');
                        } else {
                            setCurrentBox(currentBox + 1);
                        }

                        // Reset the state to hide the icon and move the next image
                        setTimeout(() => {
                            setIconVisible(false);
                            setMovingImage(null);
                            setSelectedImageId(null);
                            setCorrectPlaced(null);
                        }, 200); // Shortened time before resetting
                    }, 200); // Reduced timeout to speed up transitions
                }, 200); // Reduced timeout to speed up transitions
            }
        } else {
            // Incorrect selection
            if (!isGifVisible || selectedImageId !== selectedImage.id) {
                setBorderColor('#e50000');
                setSelectedImageId(selectedImage.id);
                setIconVisible(true);
                setIconType('cross');
                setCorrectPlaced(false);

                // Remove any ongoing GIFs
                setShowCorrectGif(false);
                setShowIncorrectGif(false);

                // Show the incorrect GIF instantly
                setShowIncorrectGif(true);
                setIsGifVisible(true);

                setTimeout(() => {
                    setShowIncorrectGif(false); // Hide incorrect GIF after 1 second
                    setIsGifVisible(false);
                }, 3000); // Shortened incorrect GIF delay

                setTimeout(() => {
                    setIconVisible(false);
                    setCorrectPlaced(null);
                    setSelectedImageId(null);
                }, 1000); // Shortened reset delay
            }
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
        <View style={styles.content}>
            <View style={styles.columnsContainer}>
                {placedImages.map((image, index) => (
                    <View key={index} style={styles.column}>
                        {image.src ? (
                            <FastImage source={image.src} style={styles.image} resizeMode='contain' />
                        ) : (
                            <View style={{ marginTop: 70 }}>
                                <Text style={{ fontSize: 30, color: 'black',fontFamily:'._NotoSansSC-Black', fontWeight:'800', textAlign: 'center' }}>步骤 {index + 1} :</Text>
                                <Text style={styles.columntext}>{image.title}</Text>
                            </View>
                        )}
                    </View>
                ))}
            </View>

            <View style={{ marginVertical: 10 }}>
                <Text style={styles.heading}>更新个人资料的步骤是什么？{'\n'}请按正确的顺序点击下方的屏幕</Text>
            </View>

            <View style={styles.bottomContainer}>
                <FlatList
                    data={bottomImages}
                    keyExtractor={(item) => item.id.toString()}
                    numColumns={3}
                    columnWrapperStyle={{ alignSelf: 'center', marginVertical: 5 }}
                    renderItem={({ item }) => (
                        item.src ? (
                            <TouchableOpacity
                                style={[
                                    styles.draggable,
                                    selectedImageId === item.id && { borderColor, borderWidth: 8 },
                                    highlighborder && item.id === currentBox + 1 && { borderColor: '#cc0000', borderWidth: 10 }
                                ]}
                                ref={(ref) => {
                                    if (ref) {
                                        // Assign the ref for later use in measure
                                        item.ref = ref;
                                    }
                                }}
                                onPress={() => {
                                    // Make sure ref exists, then use measure
                                    if (item.ref) {
                                        item.ref.measure((x, y, width, height, pageX, pageY) => {
                                            const layout = { x: pageX, y: pageY };
                                            handleImageSelect(item, layout);
                                        });
                                    }
                                }}
                            >
                                <FastImage source={item.src} style={styles.bottomimage} resizeMode='cover' />
                                {iconVisible && selectedImageId === item.id && (
                                    iconType === 'check' ? (
                                        <Icon
                                            name="check"
                                            size={200}
                                            color={borderColor === '#45f248' ? '#19a337' : '#e50000'}
                                            style={styles.icon}
                                        />
                                    ) : (
                                        <Icon1
                                            name="cross"
                                            size={250}
                                            color={borderColor === '#45f248' ? '#19a337' : '#e50000'}
                                            style={styles.icon}
                                        />
                                    )
                                )}
                            </TouchableOpacity>
                        ) : (
                            <View style={[styles.draggable, styles.emptyBox]} />
                        )
                    )}
                />
            </View>

            {(showCorrectGif || showIncorrectGif) && (
                <View style={styles.inactivityImageContainer}>

                    <FastImage
                        source={showCorrectGif ? require('../../images/rightchinese.gif') : require('../../images/wrongchinese.gif')}
                        style={styles.gif}
                        resizeMode="contain"
                    />
                </View>
            )}


            {showInactivityImage && (
                <View style={styles.inactivityImageContainer}>
                    <FastImage
                        source={require('../../images/hintchinese.gif')}
                        style={styles.inactivityImage}
                        resizeMode="contain"
                    />
                </View>
            )}

            {movingImage && (
                <Animated.View style={[styles.movingImageContainer, { transform: animatedValue.getTranslateTransform() }]}>
                    <FastImage source={movingImage.src} style={styles.movingImage} />
                </Animated.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        backgroundColor: 'white',
    },
    columnsContainer: {
        flexDirection: 'row',
        width: '100%',
        height: height / 6,
        justifyContent: 'space-evenly',
    },
    column: {
        width: width / 6,
        backgroundColor: '#CFE2F3',
        alignItems: 'center',
        height: '100%',
        borderWidth: 2,
        borderColor: 'white',
        padding: 10,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    columntext: {
        fontSize: 20,
        color: 'black',
        fontFamily:'._NotoSansSC-Black',
        textAlign: 'center',
        fontWeight:'700'
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    draggable: {
        width: width / 4.6,
        height: height / 3.85,
        marginVertical: 5,
        marginHorizontal: 25,
        borderColor: 'transparent',
        borderWidth: 7,
    },
    bottomimage: {
        width: '100%',
        height: '100%',
    },
    heading: {
        color: '#0082d2',
        fontSize: 60,
        fontFamily:'._NotoSansSC-Black',
        textAlign: 'center',
        fontWeight: '800'
    },
    subHeading: {
        color: '#0082d2',
        fontSize: 35,
        fontFamily:'._NotoSansSC-Black',
        textAlign: 'center',
        fontWeight: '700'
    },
    icon: {
        position: 'absolute',
        right: '6%',
        top: '22%',
    },
    inactivityImageContainer: {
        position: 'absolute',
        bottom: -10,
        left: width / 6

    },
    inactivityImage: {
        width: 600,
        height: 450,
    },
    movingImageContainer: {
        position: 'absolute',
        width: width / 5.7,
        height: height / 4.9,
    },
    movingImage: {
        width: '100%',
        height: '100%',
    },
    emptyBox: {
        borderColor: 'transparent',
        borderWidth: 2,
    },
    gif: {
        width: 600,
        height: 450,
        alignSelf: 'center'

    }
});

export default ChinesePPUScreen;
