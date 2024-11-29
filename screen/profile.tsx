
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Platform, TouchableOpacity } from 'react-native';
import { useAuth } from '../components/context/AuthContext';
import { RootStackParamList, UserDetail } from '../components/types/type';
import { getAccountDetails } from '../api/getUser';
import Colors from '../assets/Colors';
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { Heart, BookSaved, Logout } from "iconsax-react-native"
type WatchListNavigationProp = StackNavigationProp<RootStackParamList, 'Watchlist', 'RatedList'>;


const ProfileScreen = () => {
    const { user, logout } = useAuth();
    const [profile, setProfile] = useState<UserDetail | null>(null);
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const navigation = useNavigation<WatchListNavigationProp>();
    useEffect(() => {
        const fetchDetails = async () => {
            setLoading(true); 
            try {
                const details = await getAccountDetails();
                setProfile(details);
                setLoading(false);  
            } catch (error) {
                setError('An error occurred while fetching profile details');
                setLoading(false);  
            }
        };
        fetchDetails();
    }, []);

    return (
        <View style={styles.container}>
           <View style={styles.account}>
        <View style={[styles.acountName]}>
          <Text style={[styles.name]} numberOfLines={1}>
            {profile?.username}
          </Text>
          <View style={{flexDirection: "row"}}>
          {profile?.iso_3166_1 && profile.iso_639_1 && (
            <Text style={[styles.email]} numberOfLines={2}>
              {profile.iso_3166_1} | {profile.iso_639_1}
            </Text> 
          )}
          </View>
        </View>
        <View>
          {profile?.username && (
            <View style={styles.leftContainer}>
              <Text style={styles.initials}>
                {profile?.username ? profile?.username.substring(0, 2).toUpperCase() : ""}
              </Text>
            </View>
          )}
        </View>
      </View>
            <Text style={[styles.email]} numberOfLines={1}>
             Include Adult Content: {profile?.include_adult ? "Yes" : "No"}
            </Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Watchlist')}>
            
                    <BookSaved size={20} color={Colors.white}/>
                    <Text style={styles.buttonText}>Watch List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}  onPress={() => navigation.navigate('RatedList')}>
                    <Heart size={20} color={Colors.white} />
                    <Text style={styles.buttonText}>Rated List</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={logout}>
             
                    <Logout size={20} color={Colors.white}/>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    padding: 14,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    account: {
        justifyContent: "space-between",
        alignItems: "center",
        flexDirection: "row",
        marginVertical: 20,
      },
      acountName: { alignItems: "flex-start", gap: 10 },
      name: {
        fontSize: 34,
        fontWeight: "bold",
        fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
      },
      email: {
        fontSize: 16,
        color: Colors.gray,
        fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
        paddingHorizontal: 2
      },
      leftContainer: {
        backgroundColor: Colors.primaryHighlight,
        borderRadius: 35,
        height: 70,
        width: 70,
        borderColor: Colors.line,
        borderWidth: 2,
        alignItems: "center",
        justifyContent: "space-around",
        alignContent: "space-around",
      },
      initials: {
        color: Colors.primary,
        fontSize: 34,
        fontWeight: "bold",
        fontFamily: Platform.OS === "ios" ? "Inter" : "Roboto",
      },
      buttonContainer: {
        width: '100%',
        paddingHorizontal: 20,
        marginTop: 150
    },
    button: {
        flexDirection: 'row',
        backgroundColor: Colors.primary,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        marginBottom: 10,
    },
    logoutButton: {
        backgroundColor: '#fc5c65',
    },
    buttonText: {
        color: '#fff',
        marginLeft: 10,
    },
});

export default ProfileScreen;
