import React, { useState, useEffect } from "react";
import {
  Image,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Button,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import Modal from "react-native-modal";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Icon from "react-native-vector-icons/Ionicons";
import { Provider, useDispatch, useSelector } from "react-redux";
import store, { addItem, removeItem, clearCart } from "../store";
import ProductCard from "../components/ProductCard"; // Import the ProductCard component

async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
}

const Title = () => {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>Shopping</Text>
    </View>
  );
};

const generateStars = (rating) => {
  const totalStars = 5;
  const filledStars = Math.round(rating);
  const emptyStars = totalStars - filledStars;

  return <Text style={styles.productStars}>{"⭐".repeat(filledStars)}</Text>;
};

const ProductModal = ({ visible, product, onClose }) => {
  const dispatch = useDispatch();

  if (!product) return null;

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      style={styles.modalContainer}
    >
      <View style={styles.modalContent}>
        <Image source={{ uri: product.image }} style={styles.modalImage} />
        <Text style={styles.modalTitle}>{product.title}</Text>
        {generateStars(product.rating.rate)}
        <Text style={styles.modalRatingCount}>({product.rating.count})</Text>
        <Text style={styles.modalPrice}>Rs. {product.price}</Text>
        <Text style={styles.modalCategory}>{product.category}</Text>
        <Text style={styles.modalDescription}>{product.description}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addToCartButton}
            onPress={() => {
              dispatch(addItem(product));
              onClose();
            }}
          >
            <Icon name="cart" size={20} color="white" style={styles.cartIcon} />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.buttonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  // const [products, setProducts] = useState([]);
  useEffect(() => {
    async function loadProducts() {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    loadProducts();
  }, []);

  const handleIncrease = (product) => {
    dispatch(addItem(product));
  };

  const handleDecrease = (product) => {
    dispatch(removeItem(product));
  };

  const isInCart = (product) => {
    return cartItems.some((item) => item.id === product.id);
  };

  const handleProductPress = (product) => {
    setSelectedProduct(product);
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <SafeAreaView edges={["top", "bottom"]}>
        <View style={styles.container}>
          <Title />
          <FlatList
            data={products}
            renderItem={({ item }) => (
              <ProductCard
                product={item}
                isInCart={isInCart(item)}
                onPress={handleProductPress}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.productsContainer}
          />
        </View>
      </SafeAreaView>
      <ProductModal
        visible={modalVisible}
        product={selectedProduct}
        onClose={handleCloseModal}
      />
    </View>
  );
};

const index = () => {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
};

export default index;

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
});
