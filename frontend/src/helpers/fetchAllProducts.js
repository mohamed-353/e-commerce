import axios from "axios"
import summaryApi from "../common"

export const fetchAllProductsCategory = async (category) => {
  const response = await axios.post(summaryApi.allProductsCategory.url,
    { category },
    { withCredentials: true }
  )
  return response.data
}