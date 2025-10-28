import React from "react";
import { View, StyleSheet, TouchableOpacity, Image, Text } from "react-native";
import Toast from "react-native-toast-message";
import axios from "axios";

export default function App() {
  const pcIp = "192.168.1.245"; // your PC IP
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

  const mute = async () => {
    try {
      await axios.get(`${baseUrl}/mute`);
      Toast.show({ type: "info", text1: "mute triggered" });
    } catch (e) {
      Toast.show({
        type: "error",
        text1: "Failed to trigger mute",
        text2: e.message,
      });
    }
  };

    const shutdown = async () => {
      try {
        await axios.get(`${baseUrl}/shutdown`);
        Toast.show({ type: "info", text1: "shutdown triggered" });
      } catch (e) {
        Toast.show({
          type: "error",
          text1: "Failed to trigger shutdown",
          text2: e.message,
        });
      }
    };

    const buttons = [
      { label: "Shomoy", icon: require('./assets/icons/shomoy.png'), url: "https://youtu.be/TdwhCOFh9OA" },
      { label: "DBC", icon: require('./assets/icons/dbc.png'), url: "https://youtu.be/7xoFz5czzjA" },
      { label: "Mute", emoji: "⛶", action: mute },
      { label: "ShutDown", emoji: "📺", action: shutdown },
    ];    

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🖥️ Wi-Fi PC Controller</Text>

      <View style={styles.row}>
        {buttons.map((btn, index) => (
          <TouchableOpacity
            key={index}
            style={styles.iconButton}
            onPress={() => {
              if (btn.url) openUrl(btn.url, btn.label);
              else if (btn.action) btn.action();
            }}
          >
            {btn.icon && <Image source={btn.icon} style={styles.icon} />}
            {btn.emoji && <Text style={styles.icon}>{btn.emoji}</Text>}
            <Text style={styles.label}>{btn.label}</Text>
          </TouchableOpacity>
        ))}
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
    flexWrap: "wrap",
    gap: 25,
  },
  iconButton: {
    alignItems: "center",
  },
  icon: {
    width: 64,          // for image icons
    height: 64,         // for image icons
    fontSize: 40,       // for emojis
    resizeMode: "contain",
    alignSelf: "center",
  },
  label: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
});
