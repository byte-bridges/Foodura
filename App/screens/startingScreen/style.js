import {StyleSheet} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../constants/colors';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PRIMARY_COLOR,
  },
  welComeText: {
    fontSize: 24,
    color: WHITE_COLOR,
    alignSelf: 'center',
    fontWeight: '300',
  },
  appText: {
    fontSize: 28,
    color: WHITE_COLOR,
    fontWeight: '900',
    letterSpacing: 2,
    alignSelf: 'center',
  },
  buttonsContainer: {
    width: '80%',
    position: 'absolute',
    bottom: 24,
  },
  buttonStyle: {
    backgroundColor: WHITE_COLOR,
    padding: 18,
    borderRadius: 48,
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitleText: {color: PRIMARY_COLOR, fontSize: 18, fontWeight: 'bold'},
});

export default styles;
