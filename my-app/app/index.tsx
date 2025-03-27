import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { useEffect, useState } from "react";
import { router } from "expo-router";
export default function Index() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const redirectToLogin = () => {
    router.push("/login");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Example API - replace with your actual API endpoint
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts/7"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>API Data:</Text>
      {data && (
        <View style={styles.dataContainer}>
          <Text style={styles.dataText}>ID: {data.id}</Text>
          <Text style={styles.dataText}>Title: {data.title}</Text>
          <Text style={styles.dataText}>Body: {data.body}</Text>
        </View>
      )}
      <View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.getStartedButton}
            onPress={redirectToLogin}
          >
            <Text style={styles.getStartedText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  buttonsContainer: {
    width: "100%",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  getStartedButton: {
    backgroundColor: "#4D90FE",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#4D90FE",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  getStartedText: {
    color: "#FFFFFF",
    // fontSize: isSmallDevice ? 16 : 18,
    fontWeight: "bold",
  },
  signUpButton: {
    backgroundColor: "transparent",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  signUpText: {
    color: "#FFFFFF",
    // fontSize: isSmallDevice ? 16 : 18,
    fontWeight: "bold",
  },
  dataContainer: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dataText: {
    fontSize: 16,
    marginBottom: 5,
  },
  error: {
    color: "red",
    fontSize: 16,
  },
});
