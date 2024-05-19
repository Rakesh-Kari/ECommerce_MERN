import axios from "axios";
import { toast } from "react-toastify";

const AddToCart = async (e, productId) => {
  e?.stopPropagation();
  e?.preventDefault();
  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/cart/create",
      {
        products: [{ productId }], // Only productId is passed
      },
      {
        withCredentials: true,
      }
    );

    if (response.data.success) {
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }

    return response.data;
  } catch (err) {
    console.log("The error message is", err);
    toast.error("Failed to add to cart. Please try again.");
  }
};

export default AddToCart;
