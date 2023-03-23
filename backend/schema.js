const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLInt, GraphQLList, GraphQLNonNull, 
  GraphQLInputObjectType } = require('graphql');
const dbRaw = require('./db.json');

const db = JSON.parse(JSON.stringify(dbRaw));
const quotes = db.data; 

//#region "Object types"

const HouseType = new GraphQLObjectType({
  name: 'House',
  fields: () => ({
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
  })
});

const CharacterType = new GraphQLObjectType({
  name: 'Character',
  fields: () => ({
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    house: { type: HouseType }
  })
});

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: () => ({
    sentence: { type: GraphQLString },
    character: { type: CharacterType },
    id: { type: GraphQLInt}
  })
});

const HouseInputType = new GraphQLInputObjectType({
  name: 'HouseInput',
  fields: () => ({
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
  })
});

const CharacterInputType = new GraphQLInputObjectType({
  name: 'CharacterInput',
  fields: () => ({
    name: { type: GraphQLString },
    slug: { type: GraphQLString },
    house: { type: HouseInputType }
  })
});

const QuoteInputType = new GraphQLInputObjectType({
  name: 'QuoteInput',
  fields: {
    sentence: { type: new GraphQLNonNull(GraphQLString) },
    character: { type: new GraphQLNonNull(CharacterInputType) },
  }
});

//#endregion 

//#region "Query Types"

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    quote: {
      type: QuoteType,
      args: {
        id: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        for (let i = 0; i < quotes.length; i++) {
          if (quotes[i].id === args.id) {
            return quotes[i];
          }
        }
      }
    },
    quotes: {
      type: new GraphQLList(QuoteType),
      args: {},
      resolve() {
        return quotes;
      }
    }
  }
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutationType',
  fields: {
    addQuote: {
      type: QuoteType,
      args: {
        data: {
          name: 'data',
          type: new GraphQLNonNull(QuoteInputType)
        }
      },
      resolve(root, params, options) {
        const data = { ...params.data };
        data.id = quotes.length + 1
        quotes.push(data);
        return data;
      }
    },
    updateQuote: {
      type: QuoteType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLInt) },
        data: {
          name: 'data',
          type: new GraphQLNonNull(QuoteInputType)
        }
      },
      resolve(root, params, options) {
        const data = { ...params.data }
        quotes.map(quote => {
          if (params.id === quote.id) {
            quote.sentence = data.sentence;
            quote.character = data.character;
          }
        });
        data.id = params.id;
        return data;
      }
    }
  }
});

//#endregion

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});