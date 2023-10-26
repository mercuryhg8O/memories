import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import Map from './common/components/Map';
import Profile from './common/components/Profile';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <Map/>
      <Profile/>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	map: {
		width: '100%',
		height: '100%',
	},
});