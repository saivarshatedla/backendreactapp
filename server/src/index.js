const { ApolloServer } = require("apollo-server");
var mysql = require("mysql");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  database: "react",
  port: 3306,
  password: "varsha@123",
});

let userdata = {
  id: 0,
  Name: "",
  Gender: "",
  Age: 0,
  Link: "",
};

const typeDefs = `
type Query {
    
    userDetails(id:ID!): User!
  }
  type Mutation {
    
    update(id:ID!,Link:String!):User!
  }

  type User {
    id: ID!
    Name: String!
    Gender: String!
    Age :Int!
    Link:String!
  }

`;

const resolvers = {
  Query: {
    userDetails: async (parent, args) => {
      return new Promise(function (resolve, reject) {
        connection.query(
          "SELECT * FROM userdata WHERE `id`=?",
          [args.id],
          function (err, results, fields) {
            (userdata.id = results[0].id),
              (userdata.Name = results[0].Name),
              (userdata.Age = results[0].Age),
              (userdata.Gender = results[0].Gender),
              (userdata.Link = results[0].Link);

            return resolve(userdata);
          }
        );
      });
    },
  },
  Mutation: {
    update: async (parent, args) => {
      return new Promise(function (resolve, reject) {
        connection.query(
          "UPDATE userdata SET `Link`=? WHERE `id`=?",
          [args.Link, args.id],
          function (err, results, fields) {
            userdata.Link = args.Link;

            return resolve(userdata);
          }
        );
      });
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => console.log(`Server is running on ${url}`));
