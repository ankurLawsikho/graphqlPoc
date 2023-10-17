const { GraphQLError } = require("graphql");
const { addJobGraphQL, addUserGraphQl } = require('./controller/main_controller');
const { createCompanyCt, getCompanyCtl, getJobCtl, getUserCtl } = require('./controller/resolver_controller');
const resolvers = {
    Query: {
        getcompany: async (_root, {id}) => {
            const response = await getCompanyCtl({id: id});
            return response;
        },

        getJob: async (_root, {id}) => {
            const response = await getJobCtl({id: id});
            return response;
        },

        getUser: async (_root, {id}) => {
            const response = await getUserCtl({id: id});
            return response;
        },
       
    },

    Mutation: {
        createCompany: async (_root,{input: {name, description}}) => {
            const response = await createCompanyCtl({name, description});
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