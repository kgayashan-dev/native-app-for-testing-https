import { View, Text, Alert, ActivityIndicator, Button } from "react-native";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;

const New = () => {
  const [data, setData] = useState<any>(null);
  const [dataPost, setPostData] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [posting, setPosting] = useState<boolean>(false);

  // Fetch data with GET request
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/auth/TestGet/1`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const json = await response.json();
        setData(json);
      } catch (err: any) {
        console.error(err);
        Alert.alert("Error", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Function to send a POST request
  const handlePostRequest = async () => {
    setPosting(true);
    setPostData(null); // Reset previous post data before new request

    try {
      const response = await fetch(`${API_BASE_URL}/auth/TestPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          testId: "1",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      Alert.alert("Success", "Data submitted successfully!");
      console.log("POST Response:", json);
      setPostData(json);
    } catch (err: any) {
      console.error(err);
      Alert.alert("Error", err.message);
    } finally {
      setPosting(false);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
      <Text style={{ fontSize: 20, fontWeight: "bold", marginBottom: 10 }}>New</Text>

      {loading ? (
        <ActivityIndicator size="large" color="blue" />
      ) : data ? (
        <Text style={{ marginBottom: 10 }}>{JSON.stringify(data, null, 2)}</Text>
      ) : (
        <Text>No data available</Text>
      )}

      <Button
        title={posting ? "Sending..." : "Send POST Request"}
        onPress={handlePostRequest}
        disabled={posting}
      />

      {dataPost && (
        <View style={{ marginTop: 20, padding: 10, backgroundColor: "#f0f0f0", borderRadius: 8 }}>
          <Text style={{ fontWeight: "bold" }}>Post Response:</Text>
          <Text>{JSON.stringify(dataPost, null, 2)}</Text>
        </View>
      )}
    </View>
  );
};

export default New;
