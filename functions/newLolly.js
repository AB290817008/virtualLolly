const { ApolloServer, gql } = require('apollo-server-lambda');

const faunadb = require('faunadb');
const axios = require('axios');

const q = faunadb.query;
require('dotenv').config();

var client = new faunadb.Client({
	secret: process.env.FAUNADB_ADMIN_SECRET
});

const typeDefs = gql`
	type Query {
		getAllLollies: [Lolly]!
	}

	type Lolly {
		recipientName: String!
		sendersName: String!
		message: String!
		flavorTop: String!
		flavorMid: String!
		flavorBot: String!
		lollyPath: String!
	}

	type Mutation {
		createLolly(
			recipientName: String!
			sendersName: String!
			message: String!
			flavorTop: String!
			flavorMid: String!
			flavorBot: String!
			lollyPath: String!
		): Lolly
	}
`;

const resolvers = {
	Query: {
		getAllLollies: async () => {
			var result = await client.query(
				q.Map(q.Paginate(q.Match(q.Index('allLollies'))), q.Lambda((x) => q.Get(x)))
			);

			return result.data.map((d) => {
				return {
					recipientName: d.data.recipientName,
					sendersName: d.data.sendersName,
					flavorTop: d.data.flavorTop,
					flavorMid: d.data.flavorMid,
					flavorBot: d.data.flavorBot,
					message: d.data.message,
					lollyPath: d.data.lollyPath
				};
			});
			console.log('result', result);
		}
	},

	Mutation: {
		createLolly: async (root, args) => {
			const result = await client.query(
				q.Create(q.Collection('Lollies'), {
					data: args
				})
			);

			axios
				.post('https://api.netlify.com/build_hooks/5fdf736dab133d963439dc5b')
				.then(function(response) {
					console.log(response);
				})
				.catch(function(error) {
					console.error(error);
				});

			console.log(result);
			return result.data;
		}
	}
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
	playground: true,
	introspection: true
});

exports.handler = server.createHandler();
