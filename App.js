import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import TabNavigation from './src/navigation/TabNavigation';
import * as eva from '@eva-design/eva';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import {AuthContext} from './src/context/AuthContext';
import StackNavigation from './src/navigation/StackNavigation';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);
  console.log(authenticated);
  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <AuthContext.Provider value={{authenticated, setAuthenticated}}>
          <NavigationContainer>
            <StackNavigation />
          </NavigationContainer>
        </AuthContext.Provider>
      </ApplicationProvider>
    </>
  );
};

export default App;
