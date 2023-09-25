import { getJobs, getJob, getJobSByCompany, createJob, deleteJob, updateJob, countJobs } from "./db/jobs.js"
import { getCompany, companyLoader } from "./db/companies.js"
import { GraphQLError } from "graphql";

export const resolvers = {
    Query: {
        company: async (_root, {id}) => {
            const company = await getCompany(id);
            if (!company) {
                throw notFoundError('No company Found with Id'+id)
            }
            return company;
        },
        job: async (_root, { id }) => {
            const job = await getJob(id);
            if (!job) {
                throw notFoundError('No Job Found with Id'+id)
            }
            return job;
        },
        jobs: async (_root, {limit, offset}) => {
            const items = await getJobs(limit, offset);
            const totalCount = await countJobs();
    
            return {
                items,
                totalCount
            }
        }    
    },

    Mutation: {
        // createJob: (_root,{input: {title, description}}, context) => {
        //     const companyId = "FjcJCHJALA4i";
        //     return createJob({companyId, title, description});
        // },
        createJob: (_root,{input: {title, description}}, { user }) => {
            if (!user) {
                throw unAuthorisedError("Missing Authentication")
            }
            return createJob({companyId: user.companyId, title, description});
        },

        deleteJob: (_root, { id }) => deleteJob(id),

        updateJob: (_root, {input: {id, title, description}}) => updateJob({ id, title, description })
    },

    Company: {
        jobs: (company) => getJobSByCompany(company.id)
    },

    Job: {
        company: (job, _args, {companyLoader}) => { // with out cache
            return companyLoader.load(job.companyId);
        },
        // company: (job) => companyLoader.load(job.companyId), // with cache
        // company: (job) => getCompany(job.companyId),
        date: (job) => toIsoDate(job.createdAt),
    },
}

function notFoundError (message) {
    return new GraphQLError(message, {
        extensions: { code : 'Not Found' }
    })
}

function unAuthorisedError (message) {
    return new GraphQLError(message, {
        extensions: { code : 'UN AUTHORISED' }
    })
}

function toIsoDate (value) {
    return value.slice(0, 'yyyy-mm-dd'.length)
}