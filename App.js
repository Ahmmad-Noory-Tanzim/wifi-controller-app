import React from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function App() {
  const pcIp = "192.168.0.148"; // your PC IP
  const baseUrl = `http://${pcIp}:8080/cmd`;

  const openUrl = async (url, label) => {
    try {
      await axios.get(`${baseUrl}/open?url=${encodeURIComponent(url)}`);
      Toast.show({
        type: "success",
        text1: `Opened ${label}`,
        visibilityTime: 1500, // auto close after 1.5s
      });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Failed to open URL",
        text2: e.message,
      });
    }
  };

  const fullscreen = async () => {
    try {
      await axios.get(`${baseUrl}/fullscreen`);
      Toast.show({ type: "info", text1: "Fullscreen triggered" });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Failed to trigger fullscreen",
        text2: e.message,
      });
    }
  };

    const mute = async () => {
      try {
        await axios.get(`${baseUrl}/mute`);
        Toast.show({ type: "info", text1: "Mute triggered" });
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Failed to trigger Mute",
          text2: e.message,
        });
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖥️ Wi-Fi PC Controller</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            openUrl("https://www.youtube.com/watch?v=TdwhCOFh9OA", "Shomoy TV")
          }
        >
          <Text style={styles.icon}>📺</Text>
          <Text style={styles.label}>Shomoy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.iconButton}
          onPress={() =>
            openUrl("https://www.youtube.com/watch?v=7xoFz5czzjA", "DBC News")
          }
        >
          <Text style={styles.icon}>📰</Text>
          <Text style={styles.label}>DBC</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={fullscreen}>
          <Text style={styles.icon}>⛶</Text>
          <Text style={styles.label}>Full</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.iconButton} onPress={mute}>
          <Text style={styles.icon}>📺</Text>
          <Text style={styles.label}>Mute</Text>
        </TouchableOpacity>

      </View>

      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111",
  },
  title: {
    color: "white",
    fontSize: 22,
    marginBottom: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 25,
  },
  iconButton: {
    alignItems: "center",
  },
  icon: {
    fontSize: 40,
  },
  label: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
});
