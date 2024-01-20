import React, {useEffect, useState} from 'react';
import {ActivityIndicator, FlatList, Text, View} from 'react-native';
import {PRIMARY_COLOR, WHITE_COLOR} from '../../constants/colors';
import {
  clearAsyncStorage,
  getData,
  storeData,
} from '../../utils/localStorage/AsyncStorage';
import CustomButton from '../../components/button';
import globalStyles from '../../utils/typography';
import CartProductCard from '../../components/cartProductCard';
import ShowToast from '../../components/toast';
import {CART} from '../../constants/asyncStorageKeys';

const CartScreen = ({navigation}) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const [orderTotalAmount, setOrderTotalAmount] = useState(0);
  const updateOrderTotalAmount = data => {
    let totalPrice = 0;
    for (const item of data) {
      totalPrice += item.totalPrice;
    }
    setOrderTotalAmount(totalPrice);
  };
  const getDataFromAsyncStorage = async () => {
    setLoading(true);
    const data = await getData(CART);
    if (data) {
      setCart(data);
      updateOrderTotalAmount(data);
    } else {
      setCart([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    const focus = navigation.addListener('focus', () => {
      getDataFromAsyncStorage();
    });
    return () => focus;
  }, [navigation]);

  const handleAddProduct = async item => {
    const searchedProductIndex = cart?.findIndex(prod => prod?.id === item?.id);
    const temp = cart;
    temp[searchedProductIndex] = item;
    setCart(temp);
    await storeData(CART, temp);
    updateOrderTotalAmount(temp);
  };

  const handleRemoveProduct = async item => {
    if (item?.quantity === 0) {
      const temp = cart.filter(prod => prod?.id !== item?.id);
      setCart(temp);
      await storeData(CART, temp);
      updateOrderTotalAmount(temp);
      ShowToast(item?.name, 'Product removed from cart');
    } else {
      handleAddProduct(item);
    }
  };

  return loading ? (
    <ActivityIndicator style={{flex: 1}} color={PRIMARY_COLOR} size={24} />
  ) : cart.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text style={{...globalStyles.subTitles, color: PRIMARY_COLOR}}>
        Cart is empty!
      </Text>
      <CustomButton
        title={'Continue Shopping'}
        onPress={() => navigation.navigate('HomeScreen')}
        containerStyle={{backgroundColor: PRIMARY_COLOR, width: '50%'}}
        titleStyle={{color: WHITE_COLOR, fontSize: 16}}
      />
    </View>
  ) : (
    <View style={{flex: 1, padding: 16}}>
      <FlatList
        data={cart}
        keyExtractor={item => item?.id}
        renderItem={({item}) => {
          return (
            <CartProductCard
              item={item}
              handleAddProduct={handleAddProduct}
              handleRemoveProduct={handleRemoveProduct}
            />
          );
        }}
      />
      <CustomButton
        title={`Checkout ( Total Amount ${orderTotalAmount} )`}
        containerStyle={{borderWidth: 1, borderColor: PRIMARY_COLOR}}
        titleStyle={{fontSize: 15}}
        onPress={async () => {
          await clearAsyncStorage([CART]);
          getDataFromAsyncStorage();
          ShowToast(
            'Order Placed Successfully',
            'This feature is under development.',
          );
        }}
      />
    </View>
  );
};

export default CartScreen;
