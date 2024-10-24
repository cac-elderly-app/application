import MainHeaderBar from "@/components/headers/MainHeader"
import { StatusBar } from "expo-status-bar"
import { SafeAreaView } from "react-native-safe-area-context"
import { StyleSheet } from "react-native"

const Profile = () => {
    return (
        <>
        <MainHeaderBar customText='Dashboard' />
        <StatusBar style="dark" />
    <SafeAreaView style={styles.container}>
        </SafeAreaView>

        {
            /*
            This is simple, just make a <Text> show the service hours. the StatusBar has UI incorporated to take the user back to the prev page. This is a mostly integration-needed file
            */
        }
        
        </>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
})