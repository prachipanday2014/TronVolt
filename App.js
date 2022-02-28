import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import createSagaMiddleware from 'redux-saga';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import RootReducer from './src/store/reducer';
import {persistStore} from 'redux-persist';
import {rootSaga} from './src/store/saga/sagas';
import {PersistGate} from 'redux-persist/es/integration/react';
import AppNavigator from './src/navigating/appNavigator';
import {Loading} from './src/components/loading';
import {MenuProvider} from 'react-native-popup-menu';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(RootReducer, applyMiddleware(sagaMiddleware));
  sagaMiddleware.run(rootSaga);
  const persistor = persistStore(store);

  return (
    <MenuProvider>
      <Provider store={store}>
        <PersistGate persistor={persistor} loading={null}>
          <StatusBar
            barStyle={'light-content'}
            backgroundColor={'#0b0b1e'}
          />

          <AppNavigator />

          <Loading />
        </PersistGate>
      </Provider>
    </MenuProvider>
  );
};

export default App;
