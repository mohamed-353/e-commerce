const backendDomain = "http://localhost:8080"

const summaryApi = {
  signUp: {
    url: `${backendDomain}/api/signUp`,
    method: "post",
  },
  signIn: {
    url: `${backendDomain}/api/signIn`,
    method: "post",
  },
  userDetails: {
    url: `${backendDomain}/api/userDetails`,
    method: "get",
  },
  userLogout: {
    url: `${backendDomain}/api/userLogout`,
    method: "get",
  },
  allUsers: {
    url: `${backendDomain}/api/allUsers`,
    method: "get",
  },
  updateUser: {
    url: `${backendDomain}/api/updateUser`,
    method: "post",
  },
  uploadProduct: {
    url: `${backendDomain}/api/uploadProduct`,
    method: "post",
  },
  allProducts: {
    url: `${backendDomain}/api/allProducts`,
    method: "get",
  },
  updateProduct: {
    url: `${backendDomain}/api/updateProduct`,
    method: "post",
  },
  deleteProduct: {
    url: `${backendDomain}/api/deleteProduct`,
    method: "post",
  },
  productCategory: {
    url: `${backendDomain}/api/productCategory`,
    method: "get",
  },
}

export default summaryApi