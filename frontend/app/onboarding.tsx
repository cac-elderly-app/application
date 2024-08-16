import React, { useCallback, useMemo, useRef, useState } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity } from "react-native";
// import { IconApps } from "@tabler/icons-react-native"
import AntDesign from '@expo/vector-icons/AntDesign';
import { StatusBar } from 'expo-status-bar';
import { Image } from "expo-image"
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { BlurView } from 'expo-blur';
import WebView from 'react-native-webview';
import Constants from 'expo-constants';
import { useWindowDimensions } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { Platform } from 'react-native';
import { useAssets } from 'expo-asset';
import * as Haptics from 'expo-haptics';
import { Link } from 'expo-router';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const Onboarding = () => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const [popupActive, setPopupActive] = useState<boolean>(false);

    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
      }, []);

      const router = useRouter();
    return (
        <>
        <StatusBar style="light" />

        <View style={styles.container}>

        <WebView
      originWhitelist={['*']}
      source={require("../assets/web/index2.html")}
      style={styles.view}
        />

        <SafeAreaView style={styles.textView}>
            <Text style={styles.header}>Welcome to Elderly 🙌</Text>
            {
                popupActive
                &&
                <>
                <Text style={{ fontSize: 40, color: "white", textAlign: 'center', marginTop: 40, fontWeight: '500', opacity: 0.9 }}>Some Descriptive Header Text Here.</Text>
                <Text style={{ color: "white", textAlign: 'center', paddingHorizontal: 30, opacity: 0.5 }}>Help the elderly community - get chores done easily. Idk what im writing. Replace this later.</Text>
                </>
            }

        </SafeAreaView>

        {
            !popupActive
            &&
            <SafeAreaView style={{ position: 'absolute', bottom: 0, left: 0, paddingHorizontal: 10, paddingVertical: 30 }}>
                <LinearGradient
                colors={['transparent', 'rgba(0, 0, 0,0.8)']}
                style={{
                    flex: 1,
                    width: '200%',
                    height: '150%',
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                }}
                />
<Text style={{ fontSize: 45, color: "white", textAlign: 'left', marginTop: 40, fontWeight: '700', opacity: 0.9, paddingHorizontal: 10, marginBottom: 30 }}>Some Big Text Which Describes App Here.</Text>
<TouchableOpacity
onPress={() => {
    Haptics.notificationAsync(
        Haptics.NotificationFeedbackType.Success
    );
    setPopupActive(() => true);
}}
activeOpacity={0.8} style={{ marginHorizontal: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'white', paddingHorizontal: 20, paddingVertical: 15, borderRadius: 10000, shadowColor: 'white', marginBottom: 40,
                            shadowOffset: {width: 0, height: 4},
                            shadowOpacity: 0.3,
                            shadowRadius: 5, }}>
            <Text  style={{color: "black", fontSize: 16, fontWeight: '600'}}>Get Started</Text>
            </TouchableOpacity>
            </SafeAreaView>
        }

        { popupActive
        &&
        
            <BottomSheet
            ref={bottomSheetRef}
            onClose={() => setPopupActive(() => false)}
            onChange={handleSheetChanges}
            snapPoints={['50%', '50%']}
            // enableDynamicSizing
            enablePanDownToClose={false}
            handleStyle={{
                opacity: 0.3
            }}

            // style={{ borderTopColor: "rgba(0, 0, 0, 0.1)", borderTopWidth: "1px" } as any}
            // onClose={onClose}
            >
                <BottomSheetView style={styles.contentContainer}>
                    <Text style={{ fontSize: 23, marginBottom: -8, fontWeight: '600' }}>Log into your account 🔑</Text>
                    <Text style={{ fontSize: 13, marginBottom: 10, opacity: 0.5 }}>Create an account or log in.</Text>
                    <View style={{ width: '100%', height: 1, backgroundColor: 'rgba(0, 0, 0, 0.1)', marginBottom: 10 }} />
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
                        }
                        }
                        activeOpacity={0.8}
                        onPress={() => {
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            );
                            router.push("/signup")
                        }}
                        >
                            {/* <Link href="/signup"> */}
                            <Text style={{color: "white", fontSize: 16, fontWeight: '600'}}>Sign Up</Text>
                            {/* </Link> */}
                    </TouchableOpacity>
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
                            borderColor:'rgba(0, 0, 0, 0.1)'
                        }
                        }
                        activeOpacity={0.4}
                        onPress={() => {
                            Haptics.notificationAsync(
                                Haptics.NotificationFeedbackType.Success
                            )
                        }}
                        >
                        <Text style={{color: "black", fontSize: 16, fontWeight: '600'}}>Log In</Text>
                    </TouchableOpacity>

                    <Text style={{ marginTop: 35, textAlign: 'center', color: 'rgba(0, 0, 0, 0.3)' }}>By authenticating, you agree to the <Text style={{ color: "#2b63e1", opacity: 1, fontWeight: '400' }}>Privacy Policy</Text>.</Text>
                </BottomSheetView>
        </BottomSheet>
}
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        // padding: 24,
        // backgroundColor: 'grey',
        flex: 1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        // backgroundColor: "red",
        left: 0,
        top: 0
      },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        paddingHorizontal: 20,
        paddingVertical: 30,
        maxHeight: 'auto'
      },
      image: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "(255, 0, 0, 0.1)"
      },
      shade: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
        left: 0,
        top: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      },
      blur: {
        flex: 1,
        width: "100%",
        height: "100%",
        position: 'absolute',
        left: 0,
        top: 0,
      },
      view: {
        flex: 1,
        // marginTop: Constants.statusBarHeight,
        // maxHeight: '80%',
        pointerEvents: 'none'
      },
      textView: {
        position: 'absolute',
        width: '100%',
        display: "flex",
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: 'center',
        gap: 20,
        left: 0,
        alignSelf: 'center',
        marginTop: 80
      },
      header: {
        fontSize: 20,
        fontWeight: "500",
        color: "white",
        opacity: 0.7
      }
})

export default Onboarding;