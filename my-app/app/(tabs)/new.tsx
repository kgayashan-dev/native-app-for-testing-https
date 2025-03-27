import { View, Text, Alert } from "react-native";
import React, { useEffect } from "react";
import { router } from "expo-router";
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL;
const New = () => {
  const fetchLoanBranches = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/isAuthenticated`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add this for web compatibility
          Accept: "application/json",
        },
        credentials: "include",
      });

      console.log("Response:", response);

      if (response.status === 401) {
        console.log("Unauthorized - redirecting to login");
        router.replace("/login");
        return;
      }


      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Authenticated:", data.message);
    } catch (error) {
      console.error("Auth check failed:", error);
      router.replace("/login");
    }
  };

  useEffect(() => {
    fetchLoanBranches();
  }, []); // Add empty dependency array to run once

  return (
    <View>
      <Text>New</Text>
    </View>
  );
};
export default New;
