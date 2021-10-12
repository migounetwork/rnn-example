/**
 * @format
 */

import { Navigation } from "react-native-navigation";
//import {AppRegistry} from 'react-native';
import App from './App';
import SplashScreen from 'react-native-splash-screen'
//import {name as appName} from './app.json';

//AppRegistry.registerComponent(appName, () => App);

Navigation.registerComponent('com.myApp.WelcomeScreen', () => App);
Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            component: {
              name: 'com.myApp.WelcomeScreen'
            }
          }
        ],
        options: {
          topBar: {
            visible: false,
            drawBehind: true,
            animate: false,
          }
        }
      }
    }
  });
  SplashScreen.hide();
});
