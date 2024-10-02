// refes
import React, {useState} from 'react';
import {Link} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {useFormik} from 'formik';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoginValidationSchema} from '../component/ErrorValidation';

const initialValues = {
  email: '',
  password: '',
};

const Login = () => {
  // const fullWidth = Dimensions.get('window').width;
  const [err, setErr] = useState('');
  const Navigation = useNavigation();
  const {handleBlur, handleChange, handleSubmit, values, errors, resetForm} =
    useFormik({
      initialValues: initialValues,
      validationSchema: LoginValidationSchema,
      onSubmit: (value, {resetForm}) => {
        console.log(value);

        resetForm();
      },
    });

  const handleNavigationForgetPassword = () => {
    Navigation.navigate('Password_reset');
  };

  const submit = () => {
    if (values.email === '' || values.password === '') {
      setTimeout(() => {
        setErr('All fields re required!!');
      }, 1000);
    } else {
      handleSubmit();
      Navigation.navigate('Dashboard');
    }
  };

  return (
    <View style={styles.login__wrapper}>
      <View style={{width: '100%'}}>
        <View style={styles.login__logo_wrapper}>
          <Image
            source={require('../asset/newlogo.png')}
            style={styles.logo__login}
          />
        </View>
      </View>
      <View style={styles.login_body_info_wrapper}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 500,
            marginBottom: 20,
          }}>
          Welcome!!
        </Text>

        <Text style={{textAlign: 'center', color: 'red', fontSize: 15}}>
          {err}
        </Text>

        <View>
          <Text style={styles.login_email_text}>Email Address</Text>
          <View>
            <TextInput
              style={[
                styles.Email_input,
                errors?.email ? styles.error__border : null,
              ]}
              placeholder="Enter your email addres"
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
          </View>
          {errors.email && (
            <Text style={styles.error__message}>{errors.email}</Text>
          )}
        </View>

        <View>
          <Text style={styles.login_password_text}>Password</Text>
          <View>
            <TextInput
              style={[
                styles.Password_input,
                errors?.password ? styles.error__border : null,
              ]}
              placeholder="Password"
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            {/* <Icon name="rocket" size={30} color="#900" /> */}
          </View>
          {errors.password && (
            <Text style={styles.error__message}>{errors.password}</Text>
          )}
        </View>

        <View>
          <Text
            style={styles.forget__pas}
            onPress={handleNavigationForgetPassword}>
            Forgot Password?
          </Text>
        </View>

        {!values.email && !values.password ? (
          <View>
            <TouchableOpacity
              style={styles.login__btn}
              onPress={() => {
                console.log('Logged in');
              }}>
              <Text style={styles.login__text_btn}>Sign In</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View>
            <TouchableOpacity
              style={styles.login__btn}
              onPress={() => {
                console.log('Logged in');
                submit();
              }}
              disabled={
                errors.email ||
                errors.password ||
                !values.email ||
                !values.password
              }>
              <Text style={styles.login__text_btn}>Login</Text>
            </TouchableOpacity>
          </View>
        )}
        <View style={{marginTop: 60}}>
          <Text style={styles.text__link_signup}>
            Dont have an account yet?{' '}
            <Link to={'/SignUp'} style={styles.link_sign_navigate}>
              Sign-up
            </Link>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  login__wrapper: {
    width: Dimensions.get('window').width,
    height: '100%',
    padding: 10,
    backgroundColor: 'white',
  },
  login__logo_wrapper: {
    width: '18%',
    aspectRatio: 1 / 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
    marginRight: 5,
  },

  logo__login: {
    flex: 1,
    width: '100%',
    aspectRatio: 1 / 1,
    objectFit: 'contain',
  },

  login_body_info_wrapper: {
    height: 'auto',
    marginTop: 70,
    paddingLeft: 10,
    paddingRight: 10,
  },
  login_email_text: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  login_password_text: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  Email_input: {
    borderWidth: 1,
    /*
    borderBottomWidth: 1, // No bottom border
    borderTopWidth: 1, // Top border with 1 pixel width
    borderLeftWidth: 0, // No left border
    borderRightWidth: 0, // No right border
    */
    borderColor: '#ccc', // Border color
    borderRadius: 10, // Border radius to create rounded corners
    marginBottom: 20,
    paddingLeft: 20,
  },

  Password_input: {
    borderWidth: 1, // Border width in pixels
    borderColor: '#ccc', // Border color
    borderRadius: 10, // Border radius to create rounded corners
    marginBottom: 20,
    paddingLeft: 20,
  },
  forget__pas: {
    textAlign: 'center',
    marginTop: 10,
    // color: '#FA8072',
    color: 'purple',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },

  login__btn: {
    width: '100%',
    backgroundColor: 'purple',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 50,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    cursor: 'pointer',
  },

  login__text_btn: {
    color: 'white',
    fontSize: 20,
    fontWeight: '700',
  },

  text__link_signup: {
    textAlign: 'center',
    fontWeight: '600',
  },

  link_sign_navigate: {
    color: 'red',
    textDecorationLine: 'underline',
  },

  error__border: {
    borderColor: 'red',
  },

  error__message: {
    color: 'red',
  },
});
