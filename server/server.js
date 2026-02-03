const express = require('express');
const cors = require('cors');
const logger = require('./middleware/logger');
const userRoutes = require('./routes/userRoutes');
const { AppDataSource } = require('./data-source');
const productRoutes = require("./routes/productRoutes");
const favouriteRoutes = require("./routes/favouriteRoutes");
const auctionRoutes = require("./routes/auctionRoutes");
const cartRoutes = require("./routes/cartRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const ventRoutes = require("./routes/ventRoutes");
const brandRoutes = require("./routes/brandRoutes");
const storageRoutes=require("./routes/storageRoutes");
const processorRoutes=require("./routes/processorRoutes");

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(logger);

app.use('/users', userRoutes);
app.use('/favourites', favouriteRoutes);
app.use('/products', productRoutes);
app.use("/auctions", auctionRoutes);
app.use('/cart', cartRoutes);
app.use('/categories', categoryRoutes);
app.use('/vent', ventRoutes);
app.use('/brand', brandRoutes);
app.use('/storage',storageRoutes);
app.use('/processor',processorRoutes);

AppDataSource.initialize().then(() => {
  app.listen(5001, () => {
    console.log('Server running at http://localhost:5001');
  });
}).catch((err) => {
  console.error('Failed to start server:', err);
});
