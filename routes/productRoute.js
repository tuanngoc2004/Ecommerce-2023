import express from 'express';
import { isAdmin, requireSignIn } from '../middlewares/authMiddleware.js';
import { 
  createProductController,
  deleteProductController, 
  getProductController, 
  getSingleProductController, 
  productPhotoController, 
  updateProductController, 
  productFiltersController, 
  productCountController, 
  productListController,
  searchProductController,
  realtedProductController,
  productCategoryController,
  braintreeTokenController,
  brainTreePaymentController, 
  countProductsController,
  productList2Controller,
  countProducts2Controller,
  searchProductAdminController} from '../controllers/productContronller.js';
import formidable from 'express-formidable'


const router = express.Router();

router.post('/create-product', requireSignIn, isAdmin, createProductController);

// routes
router.put(
    "/update-product/:pid",
    requireSignIn,
    isAdmin,
    // formidable(),
    updateProductController
  );
  
//   get products
  router.get("/get-product", getProductController);
  
  //single product
  router.get("/get-product/:slug", getSingleProductController);
  
  //get photo
  router.get("/product-photo/:pid", productPhotoController);
  
//   //delete rproduct
  router.delete("/delete-product/:pid", deleteProductController);

  //filter product
  router.post("/product-filters", productFiltersController);

  //product count
  router.get("/product-count", productCountController);

  //product per page
  router.get("/product-list/:page", productListController);

  //search product
  router.get("/search/:keyword", searchProductController);

  //similar product
  router.get("/related-product/:pid/:cid", realtedProductController);

  //category wise product
  router.get("/product-category/:slug", productCategoryController);

  //payments routes
  //token
  router.get("/braintree/token", braintreeTokenController);

  //payments
  router.post("/braintree/payment", requireSignIn,  brainTreePaymentController);

  //admin count
  router.get("/count-product", countProductsController);

  //product per page
router.get("/product-listt/:page", productList2Controller);

//product count
router.get("/product-countt", countProducts2Controller);

router.get("/search", searchProductAdminController);
export default router;