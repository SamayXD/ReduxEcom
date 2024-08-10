import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, increaseQuantity, decreaseQuantity } from "../store";
import Icon from "react-native-vector-icons/FontAwesome";
const generateStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);

  return <Text style={styles.productStars}>{"⭐".repeat(filledStars)}</Text>;
};

const ProductCard = ({ product, onPress, isInCart }) => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);
  const getProductQuantityById = (items, productId) => {
    const product = items.find((item) => item.id === productId);
    return product ? product.quantity : null;
  };
  const quantity = getProductQuantityById(items, product.id);

  return (
    <TouchableOpacity onPress={() => onPress(product)} activeOpacity={1}>
      <View style={styles.productCard}>
        <Image source={{ uri: product.image }} style={styles.productImage} />
        <View style={styles.productDetails}>
          <Text style={styles.productTitle} numberOfLines={1}>
            {product.title}
          </Text>
          {generateStars(product.rating.rate)}
          <Text style={styles.productRatingCount} numberOfLines={1}>
            ({product.rating.count})
          </Text>
          <Text style={styles.productPrice} numberOfLines={1}>
            Rs. {product.price}
          </Text>
          <Text style={styles.productCategory} numberOfLines={1}>
            {product.category}
          </Text>
          {isInCart && (
            <View style={styles.cartOptions}>
              <TouchableOpacity
                onPress={() => dispatch(decreaseQuantity({ id: product.id }))}
              >
                <Text style={styles.cartButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.cartItemQuantity}>{quantity}</Text>

              <TouchableOpacity
                onPress={() => dispatch(increaseQuantity({ id: product.id }))}
              >
                <Text style={styles.cartButton}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => dispatch(removeItem({ id: product.id }))}
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
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
const styles = StyleSheet.create({
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
    fontSize: 18,
    padding: 8,
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
