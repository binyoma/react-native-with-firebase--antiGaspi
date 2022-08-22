import {View, Text} from 'react-native';
import React, {useEffect} from 'react';

import { db } from '../firebase/config';

import {collection, getDocs} from 'firebase/firestore';

const Home = () => {
    useEffect(() => {
        const usersRef = collection(db, 'users');
        getDocs(usersRef).then(querySnapShot => {
          const users = [];
          // console.log('====================================');
          // // console.log(querySnapShot);
          // console.log('====================================');
          querySnapShot.forEach(doc => {
            users.push({
              ...doc.data(),
              id: doc.id,
            });
          });
          console.log('====================================');
          console.log(users);
          console.log('====================================');
        });
      }, []);
  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}

export default Home