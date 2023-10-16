const { GraphQLError } = require("graphql");
const { addCompanyGraphQl } = require('./controller/main_controller')
const resolvers = {
    Query: {
        company: async (_root, {id}) => {
            const company = {
                    "id": 2,
                    "name": "company1"
                };
            return company;
        },
       
    }

    // Mutation: {
    //     createCompany: async (_root,{input: {name, description}}) => {
    //         // const response = await addCompanyGraphQl({name, description});
    //         return "lll";
    //     }
    // }

}

module.exports = { 
    resolvers 
};