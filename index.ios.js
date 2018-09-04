import {
  AppRegistry
} from 'react-native';
import { Sentry } from 'react-native-sentry';
import { StackNavigator } from 'react-navigation'

import App from './App'
import UI from './UI'

const Navigation = StackNavigator({
    App: { screen: App },
    UI: { screen: UI }
});

Sentry.config("").install();


AppRegistry.registerComponent('recipic', () => Navigation);


