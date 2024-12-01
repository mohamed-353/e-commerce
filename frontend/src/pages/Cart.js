import axios from "axios";
import React, { useContext, useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import summaryApi from "../common";
import displayAEDCurrency from "../helpers/displayCurrency";
import Context from "../context";

const Cart = () => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState([]);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const context = useContext(Context);

  // Fetch cart products
  const fetchCartProducts = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get(summaryApi.cartProducts.url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setProducts(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load cart products.");
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch product quantities
  const fetchQuantities = useCallback(async () => {
    try {
      const response = await axios.get(summaryApi.getQuantity.url, {
        withCredentials: true,
      });
      if (response.data.success) {
        setQuantities(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to load quantities.");
    }
  }, []);

  // Update product quantity in backend
  const updateQuantity = async () => {
    try {
      await axios.post(
        summaryApi.changeQuantity.url,
        { quantities },
        { withCredentials: true }
      );
    } catch (error) {
      toast.error("Failed to update quantity.");
    }
  };

  // Calculate total quantity and price
  const calculateTotals = useCallback(() => {
    const totalQty = quantities.reduce((sum, qty) => sum + qty, 0);
    setTotalQuantity(totalQty);

    const total = products.reduce(
      (sum, product, index) => sum + product.sellingPrice * (quantities[index] || 0),
      0
    );
    setTotalPrice(total);
  }, [quantities, products]);

  // Handle quantity changes
  const handleQuantityChange = (index, delta) => {
    setQuantities((prev) =>
      prev.map((qty, i) => (i === index ? Math.max(1, qty + delta) : qty))
    );
  };

  // Delete a product from the cart
  const handleDeleteProduct = async (productId, index) => {
    try {
      await axios.delete(summaryApi.deleteCartProduct.url, {
        data: { productId },
        withCredentials: true,
      });
      setProducts((prev) => prev.filter((_, i) => i !== index));
      setQuantities((prev) => prev.filter((_, i) => i !== index));
      await context.fetchAddToCartCount();
    } catch (error) {
      toast.error("Failed to delete product.");
    }
  };

  // Effects
  useEffect(() => {
    fetchCartProducts();
    fetchQuantities();
  }, [fetchCartProducts, fetchQuantities]);

  useEffect(() => {
    calculateTotals();
  }, [quantities, products, calculateTotals]);

  useEffect(() => {
    updateQuantity();
  }, [quantities]);

  // Render
  return (
    <div className="container mx-auto m-9">
      {loading ? (
        <div className="bg-slate-300 text-2xl w-[1000px] h-[100px] flex justify-center items-center animate-pulse rounded-full">
          <p>Loading...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="bg-slate-200 text-2xl w-[1000px] h-[100px] flex justify-center items-center rounded-full">
          <p>No Items</p>
          <Link
            to="/"
            className="rounded-full text-white w-36 h-16 bg-cyan-500 hover:bg-cyan-600 flex justify-center items-center"
          >
            Shop Now
          </Link>
        </div>
      ) : (
        <div className="flex justify-between">
          {/* Product List */}
          <div>
            {products.map((product, index) => (
              <div key={product._id} className="flex mt-4 border-2 bg-white shadow-lg">
                <Link
                  to={`/product/${product._id}`}
                  className="w-44 h-40 p-2 bg-slate-200 overflow-hidden"
                >
                  <img
                    src={product.productImage[0]}
                    alt={product.productName}
                    className="w-full h-full object-scale-down hover:scale-110 transition duration-150"
                  />
                </Link>
                <div className="bg-white w-[800px] h-40">
                  <div className="m-4">
                    <h1 className="text-2xl">{product.productName}</h1>
                    <p className="text-gray-500 text-lg">{product.category}</p>
                    <p className="text-xl text-red-600">
                      {displayAEDCurrency(product.sellingPrice)}
                    </p>
                    <div className="flex gap-2 text-2xl mt-2">
                      <button
                        className="w-8 h-8 border-cyan-500 border text-cyan-600 hover:bg-cyan-500 hover:text-white rounded"
                        onClick={() => handleQuantityChange(index, -1)}
                      >
                        -
                      </button>
                      <div>{quantities[index]}</div>
                      <button
                        className="w-8 h-8 border-cyan-500 border text-cyan-600 hover:bg-cyan-500 hover:text-white rounded"
                        onClick={() => handleQuantityChange(index, 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div
                    onClick={() => handleDeleteProduct(product?._id, index)}
                    className='mr-4 mt-4 w-9 h-9 text-xl rounded-full flex justify-center items-center bg-red-200 cursor-pointer hover:bg-red-500 hover:text-white'
                  >
                    <FaTrash />
                  </div>
                  <div className="text-2xl absolute right-5 bottom-10">
                    {displayAEDCurrency(quantities[index] * product.sellingPrice)}
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Order Summary */}
          <div className="bg-white w-[440px] h-56 shadow-lg">
            <div className="h-16 bg-cyan-500 text-xl text-white rounded-lg shadow-lg">
              <h1 className="p-5">ORDER SUMMARY</h1>
            </div>
            <div className="m-2 ml-3 mr-5 text-xl">
              <p>Total Items: {totalQuantity}</p>
              <p>
                Total Price:{" "}
                <span className="text-red-500">{displayAEDCurrency(totalPrice)}</span>
              </p>
            </div>
            <div className="flex justify-center mt-5">
              <Link
                to="/"
                className="w-29 h-16 p-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-full"
                onClick={() => toast.success("Payment successful")}
              >
                CONFIRM ORDER
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
