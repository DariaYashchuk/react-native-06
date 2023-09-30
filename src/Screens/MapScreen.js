import MapView, { Marker} from 'react-native-maps'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Feather } from '@expo/vector-icons'
import { COLORS } from '../libs/colors'
import { useNavigation } from '@react-navigation/native'

export const MapScreen = () => {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <MapView
        style={styles.mapStyle}
        region={{
          latitude: 50.450001,
          longitude: 30.523333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        mapType="standard"
        minZoomLevel={15}
      >
        <Marker
          title="This place was here"
          coordinate={{ latitude: 50.450001, longitude: 30.523333 }}
        />
      </MapView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  }
})
