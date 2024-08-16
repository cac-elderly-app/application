import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text } from "react-native";
import { ArrowLeft } from "react-native-feather";


const MainHeaderBar: React.FC<{}> = () => {
    const router = useRouter();
    return (
      <>
        <Stack.Screen options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <>
              {(router.canGoBack() == true) ? (
                <TouchableOpacity style={styles.backButton} onPress={() => { router.back() }}>
                  <ArrowLeft
                    width={22}
                    height={22}
                    strokeWidth={2.3}
                    stroke={"#b0b0b0"}
                  />
                </TouchableOpacity>
              ) : (
                <>

                </>
              )}
            </>
          ),
        }} />
      </>
    )
  }
  

  const styles = StyleSheet.create({
    backButton: {
      backgroundColor: '#f5f5f5',
      padding: 4,
      borderRadius: 4000,
    },
    logoText: {
      fontSize: 23,
      fontWeight: 'bold',
    }
  })
  
  export default MainHeaderBar;