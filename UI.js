import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Button,
  Alert,
  TextInput
} from 'react-native';
//import { Constants } from 'expo';

export default class App extends Component {
  state = {
    inputValue: "Search "
  };

  _handleButtonPress = () => {
    Alert.alert('Button pressed!', 'You did it!',);
  };

  _handleTextChange = inputValue => {
    this.setState({inputValue});
  };
  static navigationOptions = {
    title: 'History',
  };

  render() {
    return (
      <View style={styles.container}>
       
        <View style={styles.title}>
        <Text style={styles.paragraph}>
          Recipict

        </Text>

        </View>

        <TextInput value={this.state.inputValue} onChangeText={this._handleTextChange} style={{
          width: 200,
          height: 44,
          padding: 8
        }}/>

        <Button title="Take a Picture" onPress={this._handleButtonPress}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,

    marginTop: 25,

    textAlign: 'left'
  },
  title: {

    textAlign: 'left',
    backgroundColor: '#ecf0f1'
  },
  paragraph: {
    fontFamily: 'System',
    marginTop: 45,
    marginBottom: 15,
    marginLeft: 15,
    fontSize: 36,
    fontWeight: "800",
    color: 'black'
  }
});
