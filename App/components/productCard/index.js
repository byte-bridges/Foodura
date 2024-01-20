import React, {useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import globalStyles from '../../utils/typography';

const ProductCard = ({item, onPress}) => {
  const [love, setLove] = useState(false);
  const handleFavorite = () => {
    setLove(!love);
  };
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: PRIMARY_COLOR,
        borderRadius: 8,
        padding: 10,
        margin: 4,
        flex: 1,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <Image
          source={item?.image}
          style={{height: 64, width: 64, borderRadius: 8}}
        />
        <TouchableOpacity onPress={handleFavorite}>
          <Image
            source={
              love
                ? require(`../../assets/images/favourite-filled.png`)
                : require(`../../assets/images/favourite.png`)
            }
            style={{height: 24, width: 24}}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingTop: 10}}>
        <Text style={globalStyles.headline2}>{item?.name}</Text>
        <Text style={globalStyles.headline3}>PKR {item?.price}</Text>
        <Text numberOfLines={1} style={globalStyles.headline4}>
          {item?.desc}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
