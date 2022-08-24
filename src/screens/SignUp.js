import { View, Text, TouchableWithoutFeedback, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Formik } from 'formik'
import { Button, Input,Icon } from '@ui-kitten/components'
import * as Yup from 'yup'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import {collection, doc, setDoc} from 'firebase/firestore';
import { auth, db } from '../firebase/config'

const SignUp = () => {
    const [secureTextEntry, setSecureTextEntry] =useState(true);
    // password input
    const AlertIcon = (props) => (
      <Icon {...props} name='alert-circle-outline'/>
    );
  
    const toggleSecureEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
  
    const renderIcon = (props) => (
      <TouchableWithoutFeedback onPress={toggleSecureEntry}>
        <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'}/>
      </TouchableWithoutFeedback>
    );
    const renderCaption = () => {
      return (
        <View style={styles.captionContainer}>
          {AlertIcon(styles.captionIcon)}
          <Text style={styles.captionText}>Should contain at least 8 symbols</Text>
        </View>
      )
    }
    // yup validation schema
    const signUpSchema = Yup.object().shape({
      firstname:Yup.string('Only letters, please').required('Required').trim(),
      lastname:Yup.string().required('Required').trim(),
      email:Yup.string().required('Required').email().trim(),
      password:Yup.string().required('Required').trim(),
      confirmPassword: Yup.string()
      .trim()
      .oneOf([Yup.ref('password'), null], 'Passwords must match'),
     
    })
    // sign up 
    const sign = values => {
      /**
       * @var string email
       * @var string password
       */
      const {email, password} = values;
      // Condition de connexion ok
      createUserWithEmailAndPassword(auth, email.trim(), password.trim())
        .then(userCredential => {
          const user = userCredential.user;
          const id = user.uid;
          // récupérer la collection
          const userCollRef = collection(db, 'users');
          // on récupère le doc qui à l'id de l'utilisateur. Il le crée s'il n'existe pas.
          const userDoc = doc(userCollRef, id);
          delete values.password;
          delete values.confirmPassword;
  
          console.log(values);
          // on modifit et persiste les données dans firestore
          setDoc(userDoc, {
            ...values,
          }).then(userCredential => {
            console.log('user created!');
          });
          console.log(user);
          // on appelle firestore pour persister une version de notre user avec plus d'info
        })
        .catch(error => {
          console.log(error.message);
        });
    };
    return (
      <Formik
         initialValues={{
          firstname:"",
          lastname:"",
          email:"",
          password:"",
          confirmPassword:"",
         }}
         validationSchema={signUpSchema}
         onSubmit={values=>{
          sign(values);
        }}
      >
      {({handleChange, handleBlur, handleSubmit,values,errors, touched})=>(
          <View>
             <Input
             label={'Firstname'}
             placeholder={"Enter your firstname"}
             onChangeText={handleChange('firstname')}
             onBlur ={handleBlur('fistname')}
             value={values.firstname}
             />
             {errors.firstname &&touched.firstname?(<Text status='danger'>{errors.firstname}</Text>):null}
             <Input
             label={'Lastname'}
             placeholder={"Enter your lastname"}
             onChangeText={handleChange('lastname')}
             onBlur ={handleBlur('lastname')}
             value={values.lastname}
             />
             {errors.lastname &&touched.lastname?(<Text status='danger'>{errors.lastname}</Text>):null}
             <Input
             label={'Email'}
             placeholder={"Enter your email"}
             onChangeText={handleChange('email')}
             onBlur ={handleBlur('email')}
             value={values.email}
             keyboardType="email-address"
             />
             {errors.email &&touched.email?(<Text status='danger'>{errors.email}</Text>):null}
             <Input
             label={'Password'}
             placeholder={"Enter your password"}
            //  caption={renderCaption}
             accessoryRight={renderIcon}
             secureTextEntry={secureTextEntry}
             onChangeText={handleChange('password')}
             onBlur ={handleBlur('password')}
             value={values.password}
             />
             {errors.password &&touched.password?(<Text status='danger'>{errors.password}</Text>):null}
             <Input
             label={'confirm password'}
             placeholder={"confirm password"}
            //  caption={renderCaption}
             accessoryRight={renderIcon}
             secureTextEntry={secureTextEntry}
             onChangeText={handleChange('confirmPassword')}
             onBlur ={handleBlur('confirmPassword')}
             value={values.confirmPassword}
             />
             {errors.confirmPassword &&touched.confirmPassword?(<Text status='danger'>{errors.confirmPassword}</Text>):null}
             <Button onPress={handleSubmit}>Submit</Button>
          </View>
      )}
      </Formik>
    )
  }
  const styles = StyleSheet.create({
    captionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    captionIcon: {
      width: 10,
      height: 10,
      marginRight: 5
    },
    captionText: {
      fontSize: 12,
      fontWeight: "400",
      fontFamily: "opensans-regular",
      color: "#8F9BB3",
    }
  });

export default SignUp