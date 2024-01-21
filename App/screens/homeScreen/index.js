import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {PRIMARY_COLOR} from '../../constants/colors';
import globalStyles from '../../utils/typography';
import CustomTextInput from '../../components/textInput';
import {products} from '../../assets/products';
import ProductCard from '../../components/productCard';
import {getData, storeData} from '../../utils/localStorage/AsyncStorage';
import {CART, USER} from '../../constants/asyncStorageKeys';

const HomeScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [user, setUser] = useState({});
  const getDataFromStorage = async () => {
    const data = await getData(USER);
    if (data) {
      setUser(data);
    }
  };
  useEffect(() => {
    getDataFromStorage();
  }, []);

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: '27.5%',
          width: '100%',
          backgroundColor: PRIMARY_COLOR,
          padding: 24,
          borderBottomLeftRadius: 24,
          borderBottomRightRadius: 24,
          justifyContent: 'flex-end',
        }}>
        <Text
          numberOfLines={1}
          style={[globalStyles.headline, {paddingTop: 24}]}>
          Hi 👋
        </Text>
        <Text numberOfLines={1} style={globalStyles.headline2}>
          {user?.name}
        </Text>
        <CustomTextInput
          value={search}
          onChangeText={setSearch}
          style={{width: '100%'}}
          placeholder="Search"
        />
      </View>
      <View style={{flex: 1, padding: 12}}>
        <FlatList
          data={products}
          keyExtractor={item => item?.id}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem={({item}) => {
            if (item?.name?.toLowerCase().includes(search.toLowerCase())) {
              return (
                <ProductCard
                  key={item?.id}
                  item={item}
                  onPress={async () => {
                    const cart = await getData(CART);
                    navigation.navigate('ProductDetail', {
                      product: item,
                      cart: cart,
                    });
                  }}
                  handleAddToCart={async () => await handleAddToCart(item)}
                />
              );
            }
          }}
        />
      </View>
    </View>
  );
};

export default HomeScreen;
