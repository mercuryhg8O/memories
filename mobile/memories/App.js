import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  View } from 'react-native';
import Map from './common/components/Map';
import Profile from './common/components/Profile';
import Search from './common/components/Search';
import SearchButton from './common/components/SearchButton';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SearchButton/>
      <Map/>
      <Search/>
      <Profile/>
    </View>
  );
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	}
});