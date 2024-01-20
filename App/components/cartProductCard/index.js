import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import globalStyles from '../../utils/typography';

const CartProductCard = ({item, handleRemoveProduct, handleAddProduct}) => {
  return (
    <View
      key={item?.id}
      style={{
        flexDirection: 'row',
        padding: 10,
        borderRadius: 8,
        backgroundColor: PRIMARY_COLOR,
        marginTop: 8,
      }}>
      <Image
        source={item?.image}
        style={{height: 64, width: 64, borderRadius: 8}}
      />
      <View style={{marginLeft: 10, flex: 1}}>
        <Text style={globalStyles.headline2}>{item?.name}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <Text style={globalStyles.headline4}>PKR {item?.price}</Text>
            <Text style={globalStyles?.headline3}>
              Est. Price: {item?.totalPrice}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                handleRemoveProduct({
                  ...item,
                  quantity: item?.quantity - 1,
                  totalPrice: item?.totalPrice - item?.price,
                });
              }}>
              <Image
                source={require('../../assets/images/minus.png')}
                style={{
                  height: 16,
                  width: 16,
                  marginRight: 8,
                }}
              />
            </TouchableOpacity>
            <Text style={globalStyles.headline2}>{item?.quantity}</Text>
            <TouchableOpacity
              onPress={() =>
                handleAddProduct({
                  ...item,
                  quantity: item?.quantity + 1,
                  totalPrice: item?.totalPrice + item?.price,
                })
              }>
              <Image
                source={require('../../assets/images/plus.png')}
                style={{
                  height: 16,
                  width: 16,
                  marginLeft: 8,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default CartProductCard;
