import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {Formik} from 'formik';
import {Button, Input, Icon} from '@ui-kitten/components';
import * as Yup from 'yup';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {useNavigation} from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase/config';

const SignIn = () => {
  const authenContext=useContext(AuthContext);
  const {setAuthenticated} =authenContext;
  const navigation = useNavigation();

  // password input
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const AlertIcon = props => <Icon {...props} name="alert-circle-outline" />;

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = props => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  const renderCaption = () => {
    return (
      <View style={styles.captionContainer}>
        {AlertIcon(styles.captionIcon)}
        <Text style={styles.captionText}>
          Should contain at least 8 symbols
        </Text>
      </View>
    );
  };
  // connexion
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then(userCredential => {
      setAuthenticated(true);
    });
  };

  //validation schema
  const signInSchema = Yup.object().shape({
    email: Yup.string()
               .trim()
              .email()
              .required('Required'),
    password: Yup.string()
            .required('Required')
            .trim(),
  });
  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Image source={require('../assets/logo.jpg')} style={styles.image} />
      </View>
      <View style={styles.signIn}>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={signInSchema}
          onSubmit={values => {
            login(values.email.trim(), values.password.trim());
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <View>
              <Input
                label={'Email'}
                placeholder={'Enter your email'}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                value={values.email}
                keyboardType="email-address"
              />
              {errors.email && touched.email ? (
                <Text status="danger">{errors.email}</Text>
              ) : null}
              <Input
                label={'Password'}
                placeholder={'Enter your password'}
                //  caption={renderCaption}
                accessoryRight={renderIcon}
                secureTextEntry={secureTextEntry}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
              />

              {errors.password && touched.password ? (
                <Text status="danger">{errors.password}</Text>
              ) : null}
              <View style={styles.btnContainer}>
                <Button onPress={handleSubmit}>Sign In</Button>
                <Button onPress={() => navigation.navigate('signUp')}>
                  Create account
                </Button>
              </View>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '50%',
    height: '50%',
  },
  signIn: {
    flex: 1,
  },
  btnContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent:"space-between",
    padding:10
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: '#8F9BB3',
  },
});

export default SignIn;
