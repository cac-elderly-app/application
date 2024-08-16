import React from "react";
import { View, SafeAreaView, Text, StyleSheet, TextInput, TouchableOpacity, Linking, Alert  } from "react-native";
import MainHeaderBar from "@/components/headers/MainHeader";
import { StatusBar } from "expo-status-bar";
import * as Haptics from "expo-haptics"
// import * as Permissions from "expo-permissions"
import * as Notifications from 'expo-notifications';
import Toast from 'react-native-root-toast';

const Signup = () => {
    const notificationPerms = async() => {
        const settings = await Notifications.getPermissionsAsync();
  return (
    settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
  );
    }
    const requestPerms = async() => {
        // Notifications.remo
        return await Notifications.requestPermissionsAsync({
            ios: {
              allowAlert: true,
              allowBadge: true,
              allowSound: true,
              allowAnnouncements: true,
            },
          });
      }
    return (
        <>
        <MainHeaderBar />
        <StatusBar style="dark" />
        <SafeAreaView style={styles.mainView}>
            <Text style={{
                fontSize: 30,
                fontWeight: '600',
                marginLeft: 20,
                marginTop: 20
            }}>Set up your account 👤</Text>
            <Text style={{
                fontSize: 15,
                opacity: 0.5,
                marginLeft: 20,
                marginTop: 10
            }}>Create an account by filling out the fields below.</Text>

            <View style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 20,
                marginTop: 20,
                paddingVertical: 20,
                gap: 20
            }}>
                <TextInput clearButtonMode='while-editing' placeholder="First Name" style={styles.input} />
                <TextInput  clearButtonMode='while-editing' placeholder="Last Name" style={styles.input} />
                <TextInput keyboardType='email-address'  clearButtonMode='while-editing' placeholder="Email" style={styles.input} />
                <TextInput secureTextEntry placeholder="Password" style={styles.input} />
                <TextInput secureTextEntry placeholder="Confirm Password" style={styles.input} />

                <Text style={{ marginTop: 35, textAlign: 'center', color: 'rgba(0, 0, 0, 0.3)' }}>By authenticating, you agree to the <Text style={{ color: "#2b63e1", opacity: 1, fontWeight: '400' }}>Privacy Policy</Text>.</Text>

                <TouchableOpacity style={
                        {
                            width: '100%',
                            backgroundColor: 'white',
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            borderRadius: 10000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: 'rgba(0, 0, 0, 0.1)',
                            shadowOffset: {width: 0, height: 4},
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            borderWidth: 1,
                            borderColor:'rgba(0, 0, 0, 0.1)',
                            marginTop: 'auto',
                            opacity: 0.2
                        }
                        }
                        activeOpacity={0.4}
                        disabled
                        onPress={async() => {
                            if (!(await notificationPerms())){
                                await requestPerms();
                            } else {
                                let toast = Toast.show('Notifications Already Enabled.', {
                                    duration: Toast.durations.LONG,
                                  });
                                  
                            }
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            );
                        }}
                        >
                        <Text style={{color: "black", fontSize: 16, fontWeight: '600'}}>Enable Notifications</Text>
                    </TouchableOpacity>

                <TouchableOpacity style={
                        {
                            width: '100%',
                            backgroundColor: '#2b63e1',
                            paddingHorizontal: 20,
                            paddingVertical: 15,
                            borderRadius: 10000,
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            shadowColor: '#2b63e1',
                            shadowOffset: {width: 0, height: 4},
                            shadowOpacity: 0.3,
                            shadowRadius: 5,
                            marginTop: 0
                        }
                        }
                        activeOpacity={0.8}
                        onPress={() => {
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            );
                        }}
                        >
                            {/* <Link href="/signup"> */}
                            <Text style={{color: "white", fontSize: 16, fontWeight: '600'}}>Create Account</Text>
                            {/* </Link> */}
                    </TouchableOpacity>
            </View>
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    mainView: {
        backgroundColor: 'white',
        flex: 1,
    },
    input: {
        width: '100%',
        borderWidth: 1.5,
        borderColor: 'rgba(0, 0, 0, 0.07)',
        paddingHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 1000,
        fontWeight: '600',
    }
})

export default Signup;