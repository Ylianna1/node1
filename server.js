const express = require("express"),
  app = express(),
  port = process.env.port || 3000;
  (routes = require("./routes.js")),
  (mongoose = require("mongoose")),
  (User = require("./models/UserModels")),
  (swaggerJsDoc = require("swagger-jsdoc")),
  (swaggerUI = require("swagger-ui-express"));

mongoose.connect("mongodb://127.0.0.1:27017/users");
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "API for users",
      description: "users",
      servers: ["http://localhost:3000/"],
    },
  },
  apis: ["./routes.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));

app.use(express.json());
routes(app);
app.listen(port);