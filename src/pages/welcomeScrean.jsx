import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  Dimensions, // used to get the full width and height of the screen without using 100%
  Text,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const SlideData = [
  {
    id: 1,
    image: require('../asset/pexels-gabby-k-6998462.jpg'),
    title: 'Sign up with ease',
    description: 'Get an account in less than 5minutes and start transaction',
  },
  {
    id: 2,
    image: require('../asset/pexels-shvetsa-4556778.jpg'),
    title: 'Fund your account from other banks.',
    description:
      'You can fund your accounts seamlessly from your, account in other banks.',
  },
  {
    id: 3,
    image: require('../asset/pexels-olly-3772512.jpg'),
    title: 'Ease access to loans',
    description: 'Apply for low interest loan with ease.',
  },
  // Add more slides as needed
];

const WelcomeScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const intervalRef = useRef(null);

  // handle navigations
  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  // handle scroll
  const handleScroll = event => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.floor(contentOffsetX / Dimensions.get('window').width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    const startAutoPlay = () => {
      intervalRef.current = setInterval(() => {
        setCurrentIndex(prevIndex =>
          prevIndex === SlideData.length - 1 ? 0 : prevIndex + 1,
        );
      }, 5000); // Change the interval time as needed
    };

    startAutoPlay();

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    flatListRef.current.scrollToIndex({index: currentIndex, animated: true});
  }, [currentIndex]);

  const renderItem = ({item}) => {
    return (
      <View style={styles.slideContainer}>
        <Image
          source={item.image}
          style={{width: Dimensions.get('window').width, height: '100%'}}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.title__description}>
            <Text style={styles.imageTitle}>{item.title}</Text>
            <Text style={styles.imageDescription}>{item.description}</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        ref={flatListRef}
        data={SlideData}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        getItemLayout={(data, index) => ({
          length: Dimensions.get('window').width,
          offset: Dimensions.get('window').width * index,
          index,
        })}
      />
      <View style={styles.WelcomeScreen__logo_wrapper}>
        <Image
          style={[styles.WelcomeScreen__logo]}
          source={require('../asset/newlogo.png')}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.currentIndex}>{currentIndex + 1}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonSignUp}
          onPress={() => {
            console.log('Sign Up Pressed');
            handleSignUp();
          }}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonLogin}
          onPress={() => {
            console.log('Login Pressed');
            handleLogin();
          }}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slideContainer: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  currentIndex: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    color: '#fff',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },

  WelcomeScreen__logo_wrapper: {
    position: 'absolute',
    top: 20,
    right: 20,
    aspectRatio: 1 / 1, // Maintains a square aspect ratio
    width: '18%',
  },

  WelcomeScreen__logo: {
    flex: 1,
    width: '100%',
    aspectRatio: 1 / 1,
  },

  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity as needed
    justifyContent: 'center',
    alignItems: 'center',
  },
  title__description: {
    width: '100%',
    height: 'auto',
    position: 'absolute',
    bottom: '33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageTitle: {
    fontSize: 19, // Use a number for fontSize, not a string
    color: 'white',
    marginBottom: 15,
    flexWrap: 'wrap',
    maxWidth: '90%',
    textAlign: 'center',
  },
  imageDescription: {
    fontSize: 14, // Use a number for fontSize, not a string
    color: '#ccc',
    flexWrap: 'wrap',
    maxWidth: '80%',
    textAlign: 'center',
  },

  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 20,
    position: 'absolute',
    bottom: 80,
    width: '100%',
    marginRight: 'auto',
    marginLeft: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignUp: {
    backgroundColor: 'purple',
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 20,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonLogin: {
    backgroundColor: '#FDDA0D',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default WelcomeScreen;
