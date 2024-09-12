const LOCAL_API_URL = '';

const endpoints = {
  contactApi: `${LOCAL_API_URL}/pif/api/account/v1/get-contact-details?appId=239`,
  detailsApi: `${LOCAL_API_URL}/pif/api/session/details?appId=239`,
  toolsApi: `${LOCAL_API_URL}/pif/api/tools/v1/get-tools?appId=239`,
  refreshApi: `${LOCAL_API_URL}/pif/api/session/refresh?appId=239`,
  userApi: `${LOCAL_API_URL}/pif/api/user/v1/get-user?appId=239`,
  statusApi: `${LOCAL_API_URL}/pif/api/status/v1/get-status?appId=239`,
  getProductDetail: `${LOCAL_API_URL}/productDetails/productDescription`,
  getPriceDetail: `${LOCAL_API_URL}/productDetails/price`,
  getAvailability: `${LOCAL_API_URL}/productDetails/atp`,
  getBynderPdf: `${LOCAL_API_URL}/download/?type=original`,
};

export default endpoints;
