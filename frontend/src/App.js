import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import OnboardingCarousel from '../src/vistas/PreInicio/Home';
import LoginScreen from '../src/vistas/Login';
import pacienteListVista from '../src/vistas/pacientes/pacienteListVista';


const Stack = createStackNavigator();

export default function App() {
  const [showOnboarding, setShowOnboarding] = useState(true);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {showOnboarding ? (
          <Stack.Screen name="Onboarding">
            {props => <OnboardingCarousel {...props} onFinish={() => setShowOnboarding(false)} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} />
        )}
        
        <Stack.Screen name="pacienteListVista" component={pacienteListVista} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
