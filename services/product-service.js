const models = require('./../models');
const Product = models.Product;
const ProductPhoto = models.ProductPhoto;
const Category = models.Category;
const Transaction = models.Transaction;
const User = models.user;

class ProductService {

  constructor() { }

  getAll() {
    return Product.findAll({
      include: [{
        model: ProductPhoto
      },{
        model: Category
      }],
      limit: 20
    })
      .then(products => {
        return products;
      }).catch(err => {
        return err;
      })
  }

  getSell(user){  
    return Product.findAll({
      where: {
        sellerId: user.id
      },
      include: [{
        model: ProductPhoto
      }]
    })
      .then(products => {
        return products
      })
      .catch(err => {
        return err
      })
  }

  getColor(title) {
    return Product.findAll({
      where: {
        title: title
      }
    })
      .then((result) => {
        return result.map((e) => {
          return e.color
        })
      })
      .catch((err) => {
        return err
      })
  }

  get(productId) {
    return Product.findOne({
      where: {
        id: productId
      },
      include: {
        model: ProductPhoto
      },
      attributes: { 
        exclude: ['CategoryId'] 
      },
      include: [{
        model: Category
      },{
        model:ProductPhoto
      }]
    })
      .then((product) => {
        return product;
      }).catch(err => {
        return err;
      })
  }

  search(){}

  post(productInfo, user) {
    // console.log(productInfo);
    // let category;
    return Category.findOne({
      where: {
        title: productInfo.category
      }
    })
    .then(category => {
      return Product.create({
        title: productInfo.title,
        description: productInfo.description,
        size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        // curentBidPrice: productInfo.curentBidPrice,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        sellerId: user.id,
        // buyerId: productInfo.INTEGER,
        categoryId: category.id,
        brand: productInfo.brand
      })      
    })
    .then(product => {
      for (let photo of productInfo.photos) {
        ProductPhoto.create({
          url: photo.url,
          productId: product.id
        }).then(photo => {
          console.log(photo);
        })
      }
      return product;
    })
    .catch((err) => {
      return err;
    })
  }

  update(productId, productInfo, user) {
    return Product.findOne({
      where:{
        id: productId,
        sellerId: user.id
      }
    }).then((product) => {
      return product.updateAttributes({
        title: productInfo.title,
        description: productInfo.description,
        size: productInfo.size,
        color: productInfo.color,
        condition: productInfo.condition,
        currentAskPrice: productInfo.currentAskPrice,
        quantity: productInfo.quantity,
        // categoryId: category.id, ****HOW TO CHANGE CAT ID
        brand: productInfo.brand
      }).then(() => {
        return ProductPhoto.destroy({
          where:{
            productId: productId
          }
        }).then(() => {
          return productInfo.photos.forEach((data)=>{
            ProductPhoto.create({
              url: data.url,
              productId: productId
            })
          }).then(()=>{
            return 'Update completed'
          })
        })
      })
    }).catch((err) => {
      return err
    })
  }

  delete(productId) {
    return Product.destroy({
      where: { id: productId }
    }).then(() => {
      console.log('Deleted product: ', productId)
    }).catch(err => {
      console.log(err)
    })
  }
}

module.exports = ProductService;