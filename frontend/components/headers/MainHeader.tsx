import React from "react";
import { Stack, useRouter } from "expo-router";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { ArrowLeft } from "react-native-feather";

const MainHeaderBar: React.FC<{
  customText?: string;
}> = ({ customText }) => {
  const router = useRouter();

  return (
    <>
      <Stack.Screen
        options={{
          title: '',
          headerShadowVisible: false,
          headerLeft: () => (
            <>
              {router.canGoBack() && (
                <TouchableOpacity style={styles.backButton} onPress={() => { router.back(); }}>
                  <ArrowLeft width={22} height={22} strokeWidth={2.3} stroke={"#b0b0b0"} />
                </TouchableOpacity>
              )}
            </>
          ),
          headerTitle: () => (
            <View style={styles.headerTitleContainer}>
              <Text style={styles.logoText}>{customText}</Text>
            </View>
          ),
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    backgroundColor: '#f5f5f5',
    padding: 4,
    borderRadius: 4000,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'semibold',
    color: '#000', 
    opacity: 0.5
  },
  headerTitleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: -110
  },
});

export default MainHeaderBar;
