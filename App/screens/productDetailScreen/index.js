import React, {useState} from 'react';
import {Image, View, Text, StyleSheet, SafeAreaView} from 'react-native';
import globalStyles from '../../utils/typography';
import {
  DISABLED_COLOR,
  PRIMARY_COLOR,
  WHITE_COLOR,
} from '../../constants/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import CustomButton from '../../components/button';
import {getData, storeData} from '../../utils/localStorage/AsyncStorage';
import Toast from 'react-native-toast-message';
import ShowToast from '../../components/toast';
import {CART} from '../../constants/asyncStorageKeys';

const ProductDetailsScreen = ({route, navigation}) => {
  const {id, name, price, desc, image} = route.params.product;
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(price);
  const handleAddProduct = () => {
    setQuantity(quantity + 1);
    setTotalPrice(totalPrice + price);
  };
  const handleRemoveProduct = () => {
    if (quantity === 1) {
    } else {
      setQuantity(quantity - 1);
      setTotalPrice(totalPrice - price);
    }
  };
  const handleAddToCart = async () => {
    const cart = await getData(CART);
    const itemToAdd = {id, name, price, desc, image, quantity, totalPrice};
    if (cart) {
      if (cart.find(product => product?.id === id)) {
        ShowToast(name, 'Already added to cart');
      } else {
        cart.push(itemToAdd);
        await storeData(CART, cart);
      }
    } else {
      const product = [itemToAdd];
      await storeData(CART, product);
    }
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../../assets/images/arrow.png')}
            style={{
              height: 24,
              width: 24,
            }}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginTop: 24}}>
          <Image source={image} style={styles.image} />
          <Text style={styles.name}>{name}</Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.price}>Price: {price} (PKR)</Text>
            <View
              style={{
                flexDirection: 'row',
                width: 100,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <TouchableOpacity onPress={handleRemoveProduct}>
                <Image
                  source={require('../../assets/images/minus.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
              <Text style={globalStyles.headline}>{quantity}</Text>
              <TouchableOpacity onPress={handleAddProduct}>
                <Image
                  source={require('../../assets/images/plus.png')}
                  style={{
                    height: 20,
                    width: 20,
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.description}>{desc}</Text>
        </View>
        <CustomButton
          containerStyle={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            left: 20,
          }}
          onPress={handleAddToCart}
          titleStyle={{fontSize: 14}}
          title={`Add to cart (Est. Total: PKR ${totalPrice})`}
        />
      </View>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    padding: 20,
  },
  image: {
    height: 200,
    width: '100%',
    resizeMode: 'cover',
    borderRadius: 8,
  },
  name: {fontSize: 28, color: WHITE_COLOR, fontWeight: '300', marginTop: 24},
  price: {fontSize: 22, color: WHITE_COLOR, fontWeight: '900', marginTop: 0},
  description: {
    ...globalStyles.headline2,
    fontSize: 16,
    marginTop: 8,
  },
});
