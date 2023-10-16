const { GraphQLError } = require("graphql");
const { addCompanyGraphQl, addJobGraphQL, addUserGraphQl } = require('./controller/main_controller')
const resolvers = {
    Query: {
        company: async (_root, {id}) => {
            const company = {
                    "id": 2,
                    "name": "company1"
                };
            return company;
        },
       
    },

    Mutation: {
        createCompany: async (_root,{input: {name, description}}) => {
            const response = await addCompanyGraphQl({name, description});
            return response;
        },

        createJob: async (_root,{input: {companyId, title, description}}) => {
            const response = await addJobGraphQL({companyId, title, description});
            return response;
        },

        createUser: async (_root,{input: {companyId, email, password}}) => {
            const response = await addUserGraphQl({companyId, email, password});
            return response;
        }
    }

}

module.exports = { 
    resolvers 
};