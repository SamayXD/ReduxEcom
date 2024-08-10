import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Provider, useSelector } from "react-redux";
import store from "../store";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import ProductCard from "../components/ProductCard";

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Cart</Text>
    </View>
  );
};

const CartScreen = () => {
  const items = useSelector((state) => state.cart.items);
  const cartItems = useSelector((state) => state.cart.items);

  const isInCart = (product) => {
    return cartItems.some((item) => item.id === product.id);
  };

  const total = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView edges={["top", "bottom"]}>
        <View style={styles.container}>
          <Title />
          <FlatList
            data={items}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                isInCart={isInCart(item)}
                onPress={() => {
                  console.log("NOTHING JUST CART CART CLICKED");
                }}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cartItemsContainer}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            backgroundColor: "#F9F9F9",
            height: hp("15%"),
            width: wp("100%"),
            position: "absolute",
            borderTopLeftRadius: wp("5%"),
            borderTopRightRadius: wp("5%"),
            bottom: wp("0%"),
            borderWidth: 1,
            borderColor: "black",
            paddingTop: hp("1%"),
          }}
        >
          <Text style={[styles.title, { color: "black" }]}>
            Total: Rs. {total.toFixed(2)}/-
          </Text>
        </View>
      </SafeAreaView>
    </View>
  );
};

const cart = () => {
  return (
    <Provider store={store}>
      <CartScreen />
    </Provider>
  );
};

export default cart;

const styles = StyleSheet.create({
  container: {
    height: hp("100%"),
    backgroundColor: "white",
  },
  cartItemsContainer: {
    padding: wp("4%"),
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "black",
    height: hp("5%"),
    width: wp("100%"),
  },
  title: {
    gap: wp("2%"),
    marginBottom: hp("1%"),
    fontSize: hp("3%"),
    color: "white",
  },
});
