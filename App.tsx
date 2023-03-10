import React from "react";
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";
// import DashBoard from './src/screens/DashBoard';
import AppLoading from "expo-app-loading";
import { AppRoutes } from "./src/routes/app.routes";

import { ThemeProvider } from "styled-components/native";
import theme from "./src/global/styles/theme";
import { NavigationContainer } from "@react-navigation/native";
import "intl";
import "intl/locale-data/jsonp/pt-BR";
import Register from "./src/screens/Register";
import CategorySelect from "./src/screens/CategorySelect";

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }
  return (
    <ThemeProvider theme={theme}>
       <NavigationContainer>
        <AppRoutes />
      </NavigationContainer>
    </ThemeProvider>
  );
}