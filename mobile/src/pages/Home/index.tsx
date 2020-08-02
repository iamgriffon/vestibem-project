import React, { useState, useEffect } from 'react';
import { Feather as Icon } from '@expo/vector-icons';
import { View, ImageBackground, Image, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const [uf, setUF] = useState('');
  const [city, setCity] = useState('');
  const navigation = useNavigation();
  const handleNavigationToMap = () => {
    navigation.navigate('points', {
      uf,
      city
    });
  }

   const teste = [
    { label: 'Football', value: 'football' },
    { label: 'Baseball', value: 'baseball' },
    { label: 'Hockey', value: 'hockey' },
];


  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground style={styles.container}
        source={require('../../assets/home-background.png')}
        imageStyle={{ width: 274, height: 368 }}
        resizeMode='center'>
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />

          <View>
            <Text style={styles.title}>Seu ponto de doação de roupas na vizinhança.</Text>
            <Text style={styles.description}>Não importa o tamanho, não importa a marca, o importante é ajudar!</Text>
          </View>
        </View>


        <TextInput style={styles.input} placeholder='Digite o estado' value={uf} maxLength={2} autoCapitalize='characters' onChangeText={setUF}/>
        <TextInput style={styles.input} placeholder='Digite a cidade' value={city} onChangeText={setCity}/>
        <RectButton style={styles.button} onPress={handleNavigationToMap}>
          <View style={styles.buttonIcon}>
            <Icon name="arrow-right" color="#FFF" size={24} />
          </View>
          <Text style={styles.buttonText}>Entrar</Text>
        </RectButton>
      </ImageBackground>
    </KeyboardAvoidingView>);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
    fontWeight: 'bold'
  },

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#bb7729',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  selectInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  }
});

export default Home;
