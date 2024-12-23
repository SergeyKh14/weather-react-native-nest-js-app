import { CityProvider } from "@/context/CityContext";
import { WeatherProvider } from "@/context/WeatherContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <CityProvider>
        <WeatherProvider>
          <Stack screenOptions={{ contentStyle: { backgroundColor: "red" } }}>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: "#47BFDF" },
              }}
              name="weather"
            />
            <Stack.Screen
              options={{
                headerShown: false,
                contentStyle: { backgroundColor: "#47BFDF" },
              }}
              name="details"
            />
          </Stack>
        </WeatherProvider>
      </CityProvider>
    </QueryClientProvider>
  );
}
