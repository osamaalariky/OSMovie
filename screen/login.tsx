
import React, { useState } from 'react';
import { View, StyleSheet, Button, TextInput, Text, ActivityIndicator, TouchableOpacity, Linking, Platform } from 'react-native';
import { useAuth } from '../components/context/AuthContext';
import FixedScreen from '../components/FixedScreen';
import Colors from '../assets/Colors';
import {PasswordCheck, ProfileCircle} from "iconsax-react-native"
const LoginScreen = () => {
    const { login, error, loading, logout } = useAuth();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
        login(username, password);
    };

    return (
        <FixedScreen style={styles.container}>
              {loading && (
                <ActivityIndicator size="large" color={Colors.primary} />
            )}
            <Text
            style={styles.title}>
           Welcome Back
          </Text>
          <Text
            style={styles.subTitle}
          >
           Let's Login
          </Text>
          {error && <Text style={styles.error}>{error}</Text>}

          <View >
            <View style={[styles.inputItem]}>
            <Text
                style={
                  (styles.inputTitle,
                  { writingDirection: "ltr" })
                }
              >
                Username
              </Text>

              <View
      style={[
        styles.containers,
        { width : "100%", flexDirection: "row" }
      ]}
    >
        <ProfileCircle size={18} color={Colors.primary}/>
            <TextInput
                placeholder="Enter your account Username"
                value={username}
                onChangeText={setUsername}
                style={styles.textInput}
                
            />
                </View>
             </View>
                <View style={[styles.inputItem]}>
                <Text
                style={
                  (styles.inputTitle,
                  { writingDirection: "ltr" })
                }
              >
                Password
              </Text>
                <View
             style={[
        styles.containers,
        { width : "100%", flexDirection: "row" }
      ]}
    >
        <PasswordCheck size={18} color={Colors.primary}/>
            <TextInput
                placeholder="Enter your password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.textInput}
            />
            </View>
            </View>
<TouchableOpacity onPress={handleLogin} style={[
        styles.button,
        { width: "100%", height: 60, backgroundColor: Colors.primary },
      ]}>
     <Text
        style={[
          styles.ButtonText,
          {
            fontSize: 14,
            color: Colors.white,
          },
        ]}
      > Login</Text>
</TouchableOpacity>
<TouchableOpacity
              onPress={() => Linking.openURL("https://www.themoviedb.org/signup")}
              style={[
                styles.termsButton,
                { flexDirection: "row" },
              ]}
            >
              <Text
                style={[
                  styles.termsText,
                  { writingDirection: "ltr" },
                ]}
              >
               You Don't have an account Visit TMDB website here Register
              </Text>
            </TouchableOpacity>
             </View>
          
        </FixedScreen>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 14,
        backgroundColor: Colors.white,
      },
    input: {
        height: 40,
        marginBottom: 12,
        borderWidth: 1,
        padding: 10,
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    containers: {
        backgroundColor: Colors.milkyWhite,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        padding: 14,
        height: 60,
      },
      textInput: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.dark,
        flex: 1,
        paddingLeft:12
      },
      icon: {
        marginHorizontal: 10,
        width: 25,
        textAlign: "center",
      },
      eyeIcon: {
        padding: 5,
      },
      button: {
        gap: 10,
        backgroundColor: Colors.primary,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 4,
         marginVertical: 35,
     
        paddingLeft: 7,
        paddingRight: 7,
      },
      ButtonText: {
        color: Colors.white,
        fontSize: 12,
        fontWeight: "bold",
      },
      inputTitle: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.dark,
      },
      inputItem: {
        gap: 5,
        marginTop: 20,
      },
      title: {
        fontSize: 32,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.primary,
        fontWeight: "600",
      },
      subTitle: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.dark,
        fontWeight: "bold",
        marginBottom: 10,
      },
      signUpContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
        marginBottom: 50,
      },
      signUpText: {
        fontSize: 16,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.link,
        alignItems: "center",
      },
      resetPassword: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 10,
        marginBottom: 50,
      },
      termsButton: {
        position: "absolute",
        bottom: -50,
        left: 0,
        right: 0,
        flexDirection: "row",
        justifyContent: "center",
        paddingVertical: 0,
        marginTop: 50,
      },
    
      termsText: {
        fontSize: 14,
        fontFamily: Platform.OS === "ios" ? "Avenir" : "Roboto",
        color: Colors.link,
        textAlign: "center",
        textDecorationLine: "underline",
      },
    
});

export default LoginScreen;
