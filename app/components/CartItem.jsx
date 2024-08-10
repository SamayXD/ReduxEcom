import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { increaseQuantity, decreaseQuantity, removeItem } from "../store";
import Icon from "react-native-vector-icons/FontAwesome";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const totalPrice = item.price * item.quantity;

  return (
    <View style={styles.cartItem}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle} numberOfLines={1}>
          {item.title}
        </Text>
        <Text style={styles.itemPrice}>Rs. {item.price.toFixed(2)}</Text>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            onPress={() => dispatch(decreaseQuantity({ id: item.id }))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.itemQuantity}>{item.quantity}</Text>
          <TouchableOpacity
            onPress={() => dispatch(increaseQuantity({ id: item.id }))}
            style={styles.quantityButton}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => dispatch(removeItem({ id: item.id }))}
            style={styles.deleteButton}
          >
            <Icon
              name="trash"
              size={20}
              color="black"
              style={styles.deleteIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total: Rs. {totalPrice.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: wp("4%"),
    marginBottom: hp("2%"),
    borderRadius: wp("2%"),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: hp("0.25%") },
    shadowOpacity: 0.1,
    shadowRadius: wp("2%"),
    elevation: 2,
    borderWidth: wp("0.25%"),
  },
  itemImage: {
    width: wp("20%"),
    height: hp("10%"),
    resizeMode: "contain",
    marginRight: wp("4%"),
  },
  itemDetails: {
    flex: 1,
    justifyContent: "center",
  },
  itemTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
  },
  itemPrice: {
    fontSize: hp("2%"),
    color: "green",
    marginBottom: hp("0.5%"),
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: hp("1%"),
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
  },
  quantityButtonText: {
    fontSize: 18,
    textAlign: "center",
  },
  itemQuantity: {
    fontSize: 18,
    paddingHorizontal: 10,
  },
  deleteButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 5,
    marginLeft: 10,
  },
  deleteIcon: {
    alignSelf: "center",
  },
  totalContainer: {
    position: "absolute",
    right: wp("4%"),
    bottom: hp("1%"),
  },
  totalText: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    color: "black",
  },
});
export default CartItem;
