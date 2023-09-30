import { Image, StyleSheet } from 'react-native'

export const PreviewPhoto = ({ source }) => {
  return <Image style={styles.photoPreview} source={source} />
}

const styles = StyleSheet.create({
  photoPreview: {
    width: '100%',
    height: '100%'
  }
})
