const http = require('http');
const express = require('express');
const cors = require('cors')
const logger = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const Apollo = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4');
const mongoose = require('mongoose');

const { resolvers } = require('./resolvers');

var responseTime = require('response-time');


const fs = require('fs');
const { addUser, addCompany, addJob } = require('./controller/main_controller');

// Set up the express app
const app = express();

app.use(cors(), express.json());

const typeDefs = fs.readFileSync('./schema.graphql', 'utf8');

const port = 7000;
app.set('port', port);
const server = http.createServer(app);

app.get('/', (req, res) => {
    res.json({
        "rrrr": "rrrrr"
    });
})

//================================= Res Api =====================

app.post('/add-user', addUser);
app.post('/add-company', addCompany);
app.post('/add-job', addJob);


//============================== end Rest Api ===================

const apolloServer = new Apollo.ApolloServer({ typeDefs, resolvers });

const startServer = async () => {
    mongoose.connect('mongodb://127.0.0.1:27017/graphQl').then(() => {
        console.log("MongoDb Connected");
    }).catch((e) => {
        console.log("Error Occur while connecting mongodb");
    });

    await apolloServer.start();
    app.use('/graphql', expressMiddleware(apolloServer));
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}/graphql`);
    });
};
  
startServer().catch(error => {
    console.error('Error starting the server:', error);
});

