import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  StatusBar,
  Platform,
} from "react-native";

interface FixedScreenProps {
  children: React.ReactNode;
  style?: object;
}

const FixedScreen: React.FC<FixedScreenProps> = ({ children, style }) => {
  const statusBarHeight = Platform.OS === "android" ? StatusBar.currentHeight || 0 : 0;

  return (
    <SafeAreaView style={[styles.screenView, { paddingTop: statusBarHeight }, style]}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.rest, style]}>{children}</View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
  rest: {
    flex: 1,
  },
});

export default FixedScreen;
