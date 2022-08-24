import React, {useContext} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthContext} from '../context/AuthContext';
import TabNavigation from './TabNavigation';
import SignIn from '../screens/SignIn';
import SignUp from '../screens/SignUp';
const stack = createNativeStackNavigator();
const StackNavigation = () => {
  const authContext = useContext(AuthContext);
  const {authenticated} = authContext;

  return (
    <stack.Navigator>
      {!authenticated ? (
        <stack.Group>
          <stack.Screen name="signIn" component={SignIn} />
          <stack.Screen name="signUp" component={SignUp} />
        </stack.Group>
      ) : (
        <stack.Group>
          <stack.Screen name="home" component={TabNavigation} />
        </stack.Group>
      )}
    </stack.Navigator>
  );
};

export default StackNavigation;
