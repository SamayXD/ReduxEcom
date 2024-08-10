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
  container: {
    height: hp("100%"),
    backgroundColor: "white",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  productsContainer: {
    padding: wp("4%"),
  },
  productCard: {
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
    flex: 1,
  },
  cartOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartButton: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
    width: 30,
  },
  cartItemQuantity: {
    fontSize: 14,
    color: "#888",
  },
  productImage: {
    width: wp("30%"),
    height: hp("12%"),
    resizeMode: "contain",
    marginRight: wp("4%"),
  },
  productDetails: {
    flex: 1,
    justifyContent: "center",
    flexShrink: 1,
  },
  productTitle: {
    fontSize: hp("2%"),
    fontWeight: "bold",
    marginBottom: hp("0.5%"),
    flexShrink: 1,
  },
  productStars: {
    fontSize: hp("1.5%"),
    color: "gray",
    marginBottom: hp("0.5%"),
    flexShrink: 1,
  },
  productRatingCount: {
    fontSize: hp("1.5%"),
    color: "gray",
    marginBottom: hp("0.5%"),
    flexShrink: 1,
  },
  productPrice: {
    fontSize: hp("2%"),
    color: "green",
    marginBottom: hp("0.5%"),
    flexShrink: 1,
  },
  productCategory: {
    fontSize: hp("1.5%"),
    color: "gray",
    flexShrink: 1,
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
  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: wp("80%"),
    padding: wp("4%"),
    backgroundColor: "white",
    borderRadius: wp("2%"),
    alignItems: "center",
  },
  modalImage: {
    width: wp("60%"),
    height: hp("30%"),
    resizeMode: "contain",
    marginBottom: hp("2%"),
  },
  modalTitle: {
    fontSize: hp("2.5%"),
    fontWeight: "bold",
    marginBottom: hp("1%"),
  },
  modalRatingCount: {
    fontSize: hp("1.5%"),
    color: "gray",
    marginBottom: hp("1%"),
  },
  modalPrice: {
    fontSize: hp("2%"),
    color: "green",
    marginBottom: hp("1%"),
  },
  modalCategory: {
    fontSize: hp("1.5%"),
    color: "gray",
    marginBottom: hp("1%"),
  },
  modalDescription: {
    fontSize: hp("1.5%"),
    color: "black",
    marginBottom: hp("2%"),
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
    marginRight: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    backgroundColor: "lightgray",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  cartIcon: {
    marginRight: 10,
    color: "black",
  },
  starContainer: {
    flexDirection: "row",
    padding: 0,
    margin: 0,
  },
  cartOptions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  cartButton: {
    fontSize: 18,
    padding: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    textAlign: "center",
    width: 30,
  },
  cartItemQuantity: {
    fontSize: 18,
    padding: 8,
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
});

export default CartItem;
