require('express-async-errors');
const connectDB = require('./config/db');
const { configureExpress, errorHandler } = require('./config/express');
const initializeModels = require('./models/index');
const routes = require('./routes');

const startServer = async () => {

  // Initialize database connection
  await connectDB();

  // Load models (alternative: use a models index file)
  initializeModels();

  // Configure Express app
  const app = configureExpress();

  // Load routes
  app.use('/api', routes);

  // 404 Handler
  app.all('*', (req, res) => {
    res.status(404).json({
      status: 'failed',
      message: 'Not found!',
    });
  });

  // Error handler
  app.use(errorHandler);

  // Start server
  const PORT = process.env.PORT || 8000;
  
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};
startServer().catch(err => {
  console.error('Server startup error:', err);
  process.exit(1);
});