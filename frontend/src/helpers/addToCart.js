import axios from "axios";
import summaryApi from "../common";
import { toast } from "react-toastify";

const addToCart = async (e, productId, quantity) => {
  e?.preventDefault();
  e?.stopPropagation();

  try {
    const response = await axios.post(summaryApi.addToCart.url,
      { productId, quantity },
      { withCredentials: true },
    );

    const responseData = response.data;
    console.log(responseData);

    if (responseData.success) {
      toast.success(responseData.message);

      return responseData.data;
    } else {
      toast.error(responseData.message);
      return;
    }
  } catch (error) {
    console.error("Error adding to cart:", error);
    toast.error("An error occurred while adding to cart.");
  }
};

export default addToCart;
