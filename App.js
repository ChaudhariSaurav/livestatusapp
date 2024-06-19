import * as React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { IconButton, Menu, Provider } from 'react-native-paper'; // Assuming you use react-native-paper for Menu and IconButton
import PNRStatusComponent from './components/PnrStatus';
import CardComponent from './components/Card';

function HomeScreen({ navigation }) {
  const [menuVisible, setMenuVisible] = React.useState(false);
  const openMenu = () => setMenuVisible(true);
  const closeMenu = () => setMenuVisible(false);
  const navigateToPNRStatus = () => {
    navigation.navigate('Details');
    closeMenu();
  };

  // Custom header button using IconButton and Menu
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Provider>
          <Menu
            visible={menuVisible}
            onDismiss={closeMenu}
            anchor={
              <IconButton
                icon="dots-vertical"
                color="white"
                size={25}
                onPress={openMenu}
                style={{ marginRight: 15 }}
              />
            }>
            <Menu.Item onPress={navigateToPNRStatus} title="PNR STATUS" />
          </Menu>
        </Provider>
      ),
    });
  }, [navigation, menuVisible]);

  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
      <Text style={{ marginTop: 20 }}>Click the 3 dots on the top right</Text>
    </View>
  );
}

function DetailsScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>PNR STATUS</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ab0000', // Set header background color
          },
          headerTintColor: 'white', // Set header text color
          headerTitleStyle: {
            fontWeight: 'bold', // Set header text style
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={CardComponent}
          options={{ title: 'Live Status' }} // Set title for the Home screen
        />
        <Stack.Screen
          name="Details"
          component={PNRStatusComponent}
          options={{ title: 'PNR STATUS' }} // Set title for the PNR STATUS screen
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
