import { GraphQLClient } from "graphql-request";
import { getAccessToken } from "../auth";
import { ApolloClient, ApolloLink, concat, createHttpLink, gql, InMemoryCache } from "@apollo/client";

const client = new GraphQLClient('http://localhost:9000/graphql', {
    headers: () => {
        const accessToken = getAccessToken();
        if (accessToken) {
            return { 'Authorization': `Bearer ${accessToken}`}
        }
        return {}
    },
});


const jobDetailFragment = gql`
    fragment jobDetails on Job {
        id,
        title,
        date,
        description,
        company {
        id,
        name
        },
        description
    }
`;

const jobByIdQuery = gql`
        query JobById($id: ID!) {
            job(id: $id) {
                ...jobDetails
            } 
        }
        ${jobDetailFragment}
`;

const httpLink = createHttpLink({ uri: 'http://localhost:9000/graphql'});

const authLink = new ApolloLink((operation, forward) => {
    console.log("[customLink] operation", operation);
    const accessToken = getAccessToken();
    operation.setContext({
        headers: { 'Authorization': `Bearer ${accessToken}`}
    });
    return forward(operation);
})

const apolloClient = new ApolloClient({
    link: concat(authLink, httpLink),
    cache: new InMemoryCache(),
    defaultOptions: {
        query: {
            fetchPolicy: 'network-only'
        },
        watchQuery: {
            fetchPolicy: 'network-only'
        }
    }
});


export async function createJob (title, description) {
    const mutation = gql`
        mutation CreateJob($input: CreateJobInput!){
            job: createJob(input: $input) {
                ...jobDetails
            }
        }
        ${jobDetailFragment}
    `;

    // const { job } = await client.request(mutation, { 
    //     input: {title, description}
    //  });
    // return job;

    const { data } = await apolloClient.mutate({ 
        mutation,
        variables: { input: {title, description} },
        update: (cache, { data }) => {
            cache.writeQuery({
                query: jobByIdQuery,
                variables: { id: data.job.id },
                data,
            })
        },
     });
    return data.job;
}


export async function getCompany(id) {

    const query = gql`
       query CompanyById($id: ID!) {
            company(id: $id) {
                id,
                name,
                description,
                jobs {
                    id,
                    title,
                    date,
                    description
                }
            }
        }
    `;

    // const { company } = await client.request(query, { id });
    // return company;

    const { data } = await apolloClient.query({ 
        query,
        variables: { id },
    });
    return data.company;
}

export async function getJob(id) {

    // const query = gql`
    //     query JobById($id: ID!) {
    //         job(id: $id) {
    //             id,
    //             title,
    //             date,
    //             description,
    //             company {
    //                 id,
    //                 name
    //             },
    //             description
    //         } 
    //     }
    // `;

    // const { job } = await client.request(query, { id });
    // return job;

    const { data } = await apolloClient.query({ 
        query: jobByIdQuery,
        variables: { id },
        fetchPolicy: 'cache-first'
     });
    return data.job;
    
}


export async function getJobs() {

    const query = gql`
        query jobs {
            jobs {
                id,
                date,
                title,
                company {
                    id,
                    name
                }
            }
        }
    `;

//     const { jobs } = await client.request(query);
//     return jobs;

    const { data } = await apolloClient.query({ 
        query,
        fetchPolicy: 'network-only' 
    });
    return data.jobs

}