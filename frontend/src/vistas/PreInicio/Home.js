import React, { useRef, useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity, FlatList, Animated } from 'react-native';

const { width, height } = Dimensions.get('window');

const ilustraciones = [
  require('../../../assets/icon.png'),
  require('../../../assets/icon.png'),
  require('../../../assets/favicon.png'),
];

const onboardingData = [
  {
    bgColor: '#0B467E',
    logo: require('../../../assets/icon.png'),
    title: '',
    text: '',
    button: false,
    label: 'Nut-App',
    isSplash: true,
    img: null,
  },
  {
    bgColor: '#fff',
    logo: require('../../../assets/icon.png'),
    title: 'BIENVENIDOS',
    text: '“Una alimentación equilibrada es la clave para un cuerpo saludable.”',
    button: true,
    label: 'Nut-App',
    isSplash: false,
    img: ilustraciones[0],
  },
  {
    bgColor: '#fff',
    logo: require('../../../assets/icon.png'),
    title: 'Tu camino hacia\nuna Mejor Nutrición\nComienza Aquí',
    text: '“Los buenos hábitos comienzan con una buena nutrición.”',
    button: true,
    label: 'Nut-App',
    isSplash: false,
    img: ilustraciones[1],
  },
  {
    bgColor: '#fff',
    logo: require('../../../assets/icon.png'),
    title: 'Guía Básica\nde Alimentación Saludable',
    text: '“Cada elección que haces en tu alimentación es una oportunidad para mejorar tu salud, fortalecer tu cuerpo y construir un futuro con más energía, vitalidad y bienestar.”',
    button: true,
    label: 'Nut-App',
    isSplash: false,
    img: ilustraciones[2],
  },
];

export default function OnboardingCarousel({ onFinish }) {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else if (onFinish) {
      onFinish();
    }
  };

  const onViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  return (
    <View style={{ flex: 1, backgroundColor: onboardingData[currentIndex].bgColor }}>
      <FlatList
        ref={flatListRef}
        data={onboardingData}
        keyExtractor={(_, i) => i.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ viewAreaCoveragePercentThreshold: 60 }}
        renderItem={({ item, index }) => {
          return (
            <View style={[styles.slide, { backgroundColor: item.bgColor, width, height }]}>
              {item.isSplash ? (
                <View style={styles.splashContainer}>
                  <Image
                    source={item.logo}
                    style={{ width: 140, height: 140, marginBottom: 24 }}
                    resizeMode="contain"
                  />
                  <Text style={[styles.splashText, { color: '#fff' }]}>Nut-App</Text>
                </View>
              ) : (
                <>
                  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image
                      source={item.img}
                      style={{ width: 180, height: 180, marginBottom: 8 }}
                      resizeMode="contain"
                    />
                    {item.title !== '' && (
                      <Text style={styles.title}>{item.title}</Text>
                    )}
                    {item.text !== '' && (
                      <Text style={styles.text}>{item.text}</Text>
                    )}
                  </View>
                  <View style={styles.bottom}>
                    {item.button && (
                      <TouchableOpacity
                        style={styles.button}
                        onPress={handleNext}
                        activeOpacity={0.85}
                      >
                        <Text style={styles.buttonText}>
                          {index === onboardingData.length - 1 ? 'Comenzar' : 'Siguiente'}
                        </Text>
                      </TouchableOpacity>
                    )}
                    <Text style={styles.logoLabel}>{item.label}</Text>
                  </View>
                </>
              )}
            </View>
          );
        }}
      />

      {/* Indicadores de paginación (opcionales y bonitos) */}
      <View style={styles.pagination}>
        {onboardingData.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              currentIndex === i ? styles.dotActive : null,
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    paddingHorizontal: 28,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 30,
    fontWeight: 'bold',
    marginTop: 22,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
    color: '#222',
    marginBottom: 12,
    marginTop: 12,
  },
  text: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
    marginBottom: 16,
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#0B467E',
    borderRadius: 22,
    paddingVertical: 12,
    paddingHorizontal: 36,
    marginBottom: 18,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 0.5,
  },
  logoLabel: {
    color: '#0B467E',
    fontSize: 19,
    fontWeight: 'bold',
    marginBottom: 22,
    textAlign: 'center',
  },
  bottom: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 0,
    right: 0,
  },
  dot: {
    width: 11,
    height: 11,
    borderRadius: 6,
    backgroundColor: '#ccc',
    marginHorizontal: 6,
  },
  dotActive: {
    backgroundColor: '#0B467E',
    width: 14,
    height: 14,
    borderRadius: 8,
  },
});
