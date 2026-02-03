require('dotenv').config();
const { DataSource } = require('typeorm');
const User = require('./entity/User.js');
const Product = require('./entity/Product.js');
const Favourite = require('./entity/Favourite.js');
const Auction = require('./entity/Auction.js');
const Cart = require('./entity/Cart.js');
const CategoryType = require('./entity/CategoryType.js');
const CategoryItem = require('./entity/CategoryItem.js');
const Category = require('./entity/Category.js');
const VentType=require('./entity/VentType.js');
const Vent= require('./entity/Vent.js');
const VentItem = require('./entity/VentItem.js');
const VentItemType = require('./entity/VentItemType.js');
const Brand=require('./entity/Brand.js');
const BrandItem=require('./entity/BrandItem.js');

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User, Product, Favourite, Auction, Cart,Category,CategoryType,CategoryItem,VentItemType,VentItem,Vent,VentType,Brand,BrandItem],
});

AppDataSource.initialize()
  .then(() => console.log('Data Source has been initialized!'))
  .catch((err) => console.error('Data Source init failed', err));

module.exports = { AppDataSource };
