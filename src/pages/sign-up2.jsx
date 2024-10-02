// refes
import React from 'react';
import {useFormik} from 'formik';
// import {useNavigation} from '@react-navigation/native';
import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Email2VerificationCode} from '../component/ErrorValidation';

const initialValues = {
  code: '',
};
const SignUp2_EmailVerification = () => {
  const {handleBlur, handleChange, handleSubmit, values, errors, resetForm} =
    useFormik({
      initialValues: initialValues,
      validationSchema: Email2VerificationCode,
      onSubmit: (value, {resetForm}) => {
        console.log(value);

        // resetForm;
      },
    });
  // const navigation = useNavigation();

  // const handleBack = () => {
  //   navigation.navigate('SignUp');
  // };

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
          {/* Step */}
          <Text style={{color: 'purple', fontSize: 21}}>
            {' '}
            Email Verification
          </Text>
        </Text>
        <View>
          <Text style={styles.PhoneNumber}>0 secs</Text>
          <View>
            <TextInput
              style={[
                styles.Email_input,
                errors?.code ? styles.error_border : null,
              ]}
              placeholder="Enter 6 digit code"
              onChangeText={handleChange('code')}
              onBlur={handleBlur('code')}
              value={values.code}
            />
          </View>
          {errors.code && (
            <Text style={styles.error__message}>{errors.code}</Text>
          )}
        </View>

        <View>
          <Text style={styles.resend__code}>
            Didn't get a mail? <Text style={styles.resend}>Resend</Text>
          </Text>
        </View>

        <View>
          <TouchableOpacity
            style={styles.login__btn}
            onPress={() => {
              console.log('verify page');
              handleSubmit();
            }}
            disabled={errors.code}>
            <Text style={styles.login__text_btn}>Verify</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp2_EmailVerification;

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
    marginTop: 60,
    paddingLeft: 10,
    paddingRight: 10,
  },
  PhoneNumber: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'purple',
    display: 'flex',
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },

  countryName: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  dob: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
  },
  nin: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
  },

  resend__code: {
    fontStyle: 'normal',
    fontWeight: 'bold',
    marginBottom: 8,
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
    margin: 'auto',
  },

  resend: {
    color: 'black',
    fontWeight: '900',
    textDecorationLine: 'underline',
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

  login__btn: {
    width: '100%',
    backgroundColor: 'purple',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 30,
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

  link_sign_navigate_back: {
    width: '100%',
    backgroundColor: '#353935',
    alignItems: 'center',
    margin: 'auto',
    marginTop: 0,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 10,
    cursor: 'pointer',
  },

  error_border: {borderColor: 'red'},

  error__message: {color: 'red'},
});
