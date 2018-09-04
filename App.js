import React from 'react';
import {WebView, StyleSheet, Text, View ,Button, Linking, Image, TouchableHighlight, Alert} from 'react-native';
import ImagePicker from 'react-native-image-picker';
//import RecipeView from './webview';


export default class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
	  showUpload: true,
	  pictureSource: "",
	  loading: false,
	  payload: "",
      };
	
    }

       

/**
 * The first arg is the options object for customization (it can also be null or omitted for default options),
 * The second arg is the callback which sends object: response (more info below in README)
 */
	picture_to_recipe(image_source){
		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		//debugger;
 		xhr.onreadystatechange = function() {
		    if (this.readyState === 4) {
			//console.log(this.responseText);
			
			that.setState({isLoading: false, showUpload: false, payload: this.responseText});     // console.log(this.state);
			//debugger;
			const recipe = JSON.parse(this.responseText)["recipes"][0]["source_url"];
			console.log(recipe);

			Linking.openURL(recipe).catch(err => console.error('An error occurred', err));


		    }
		};

		xhr.open("POST", "lambda_recipic");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.setRequestHeader("postman-token", "");

		xhr.send(data);
	}

    startImagePicker(){
		// More info on all the options is below in the README...just some common use cases shown here
    var options = {
	title: 'Select Avatar',
	customButtons: [
	    {name: 'fb', title: 'Choose Photo from Facebook'},
	],
	storageOptions: {
	    skipBackup: true,
	    path: 'images'
	}
    };
	var that = this;
	ImagePicker.showImagePicker(options, (response) => {
	    console.log('Response = ', response);

	    if (response.didCancel) {
		console.log('User cancelled image picker');
	    }
	    else if (response.error) {
		console.log('ImagePicker Error: ', response.error);
	    }
	    else if (response.customButton) {
		console.log('User tapped custom button: ', response.customButton);
	    }
	    else {
		//let source = { uri: response.uri };

		// You can also display the image using data:
		//let source = { uri: 'data:image/jpeg;base64,' + response.data };
		let source =  response.data;
		//console.log(source);

		that.setState({
		    isLoading: true,
		    
		    pictureSource: source
		});
		var data = new FormData();
		data.append("image", response.data);

		var xhr = new XMLHttpRequest();
		xhr.withCredentials = true;
		//debugger;
 		xhr.onreadystatechange = function() {
		    if (this.readyState === 4) {
			//console.log(this.responseText);
			
			that.setState({isLoading: false, showUpload: false, payload: this.responseText});     // console.log(this.state);
			//debugger;
			const recipe = JSON.parse(this.responseText)["recipes"][0]["source_url"];
			console.log(recipe);

			Linking.openURL(recipe).catch(err => console.error('An error occurred', err));


		    }
		}

		xhr.open("POST", "");
		xhr.setRequestHeader("cache-control", "no-cache");
		xhr.setRequestHeader("postman-token", "02890c72-792b-b783-b1d8-6925895b4661");

		xhr.send(data);
	    }
	});
	}
	_onPressButton() {
		/*Alert.alert(
			'Alert Title',
			'My Alert Msg',
			[
			  {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
			  {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
			  {text: 'OK', onPress: () => console.log('OK Pressed')},
			],
			{ cancelable: false }
		  )*/
		  this.picture_to_recipe('https://farm3.staticflickr.com/2690/4518457995_c1cf8140f2_m_d.jpg')
	}
    render() {
	   if(true ) {
		   return(   
			<View style={styles.container}>
				  <View style={styles.title}>
					<Text style={styles.paragraph}>
						Welcome

					</Text>

					</View>
				<View>
				<Text style={styles.paragraph_small}> Welcome to recipic.{"\n"}  Tap a photo to find a recipe!</Text>
				<TouchableHighlight onPress={this._onPressButton}>

					<Image style={{width: 100, height: 100}} 
					source={{uri: 'https://farm3.staticflickr.com/2690/4518457995_c1cf8140f2_m_d.jpg'}}></Image>
				</TouchableHighlight>
				<Image style={{width: 100, height: 100}} 
				source={{uri: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Phat_Thai_kung_Chang_Khien_street_stall.jpg'}}></Image>
				
				</View>
			</View>
		);

		   
	   } else {
			return (
           
       <View style={styles.container}>
          <Text style={styles.paragraph}>Open your picture and we will get you your recipe!</Text>
          <Text style={styles.paragraph}>Powered By Food2Fork.com</Text>
   
		 <Button onPress={ () => this.startImagePicker() } title="Upload Picture"  color='#48BBEC' />
        </View>
			);
		}
	    
	
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
	},
	paragraph_small:{
		color: 'black',
		fontFamily: 'System',
		fontSize: 18
	}
  });
  
