import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';


export default class App extends React.Component {
  getWord = (word) => {
  var searchKeyWord = word.toLowerCase();
  var url =
    'https://rupinwhitehatjr.github.io/dictionary/' + searchKeyWord + '.json';

  return fetch(url)
    .then((data) => {
      if (data.status === 200) {
        return data.json();
      } else {
        return null;
      }
    })
    .then((response) => {
      var responseObject = response;
      if (responseObject) {
        var wordData = responseObject.definitions[0];
        var definition = wordData.description;
        var lexicalCategory = wordData.wordType;

        this.setState({
          "word":this.state.text,
         "definition":definition,
         "lexicalCategory":lexicalCategory
        })
      }
      else
      {
        this.setState({
          "word":this.state.text,
          "definition":"Not Found"
        })
      }
    });
};
  constructor() {
    super();
    this.state = {
      text: '',
      displayText: '',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        
        />
        <TextInput
          style={styles.inputBox}
          onChangeText={(text) => {
            this.setState({
              text: text,
            });
          }}
          value={this.state.text}
        />
        <TouchableOpacity
          style={styles.goButton}
          onPress={() => {
            this.setState({
              displayText: this.state.text,
              isSearchPressed: true,
            });
            this.getWord(this.state.text);
          }}>
          <Text style={styles.buttonText}>go</Text>
        </TouchableOpacity>
        <Text>{this.state.displayText}</Text>

        <Text style={styles.detailsTitle}>
      Word:{""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.word}
      </Text>

       <Text style={styles.detailsTitle}>
      Type:{""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.lexicalCategory}
      </Text>

       <Text style={styles.detailsTitle}>
      Definition:{""}
      </Text>
      <Text style={{fontSize:18}}>
      {this.state.definition}
      </Text>
      </View>

     
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  inputBox: {
    marginTop: 250,
    width: '80%',
    textAlign: 'center',
    height: 40,
    alignSelf: 'center',
    borderWidth: 4,
    outline: 'none',
  },
  goButton: {
    marginTop: 0,
    textAlign: 'center',
    alignSelf: 'center',
  
  },
  buttonText: {
    marginTop: 30,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize:25
  },

  detailsTitle:{
   
    color:'indigo',
    fontSize:16,
 
  }
});

