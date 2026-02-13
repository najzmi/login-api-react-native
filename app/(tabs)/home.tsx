import { useAuth } from "@/contexts/AuthContext";
import { getProfile } from "@/services/userService";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HomeScreen() {
  const router = useRouter();
  const { user} = useAuth();
  const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const data = await getProfile();
          setProfile(data);
        } catch (error: any) {
          alert(error.message);
        }
      };

      fetchProfile();
    }, []);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>
          🎉 Welcome, {user?.name}
        </Text>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f1f5f9",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});
