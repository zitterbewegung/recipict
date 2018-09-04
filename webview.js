import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';
export default class WebView extends React.Component {
   getRecipieSite(){
var data = new FormData();
data.append("image", "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFhAJ/wlseKgAAAABJRU5ErkJggg==");

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === 4) {
    var food_name = response["data"]["outputs"][0]["data"]["concepts"][0];
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("GET", "food2fork/"+ food_name + "/search");
    xhr.setRequestHeader("cache-control", "no-cache");
    xhr.setRequestHeader("postman-token", "");

    xhr.send(data);
        console.log(this.responseText);
        let food_id = this.responseText
        fetch('food2fork/' + food_id+ '/get"');
      }
    });

xhr.open("POST", "clarifai");
xhr.setRequestHeader("cache-control", "no-cache");
xhr.setRequestHeader("postman-token", "");

xhr.send(data);

       
    
   }
   render() {
      
    return (
        <View style={styles.container}>
        <WebView
            ref={WEBVIEW_REF}
            style={{flex: 1}}
            onNavigationStateChange=
            {this.onNavigationStateChange.bind(this)}
            source={{uri: ‘https://google.com’}}
            /> 
        </View>

  );
  }
}
