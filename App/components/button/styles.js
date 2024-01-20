import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../constants/colors';

const styles = StyleSheet.create({
  container: {
    height: 48,
    width: '100%',
    backgroundColor: WHITE_COLOR,
    marginTop: 10,
    borderRadius: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: PRIMARY_COLOR,
    fontWeight: '300',
  },
});
export default styles;
