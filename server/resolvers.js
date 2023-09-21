import { getJobs, getJob, getJobSByCompany, createJob, deleteJob, updateJob } from "./db/jobs.js"
import { getCompany } from "./db/companies.js"
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
        jobs: async () => getJobs()
    },

    Mutation: {
        createJob: (_root,{input: {title, description}}, context) => {
            const companyId = "FjcJCHJALA4i";
            return createJob({companyId, title, description});
        },
        createJob: (_root,{input: {title, description}}, context) => {
            console.log("[context ===]", context)
            return null
            const companyId = "FjcJCHJALA4i";
            return createJob({companyId, title, description});
        },

        deleteJob: (_root, { id }) => deleteJob(id),

        updateJob: (_root, {input: {id, title, description}}) => updateJob({ id, title, description })
    },

    Company: {
        jobs: (company) => getJobSByCompany(company.id)
    },

    Job: {
        company: (job) => getCompany(job.companyId),
        date: (job) => toIsoDate(job.createdAt),
    },
}

function notFoundError (message) {
    return new GraphQLError(message, {
        extensions: { code : 'Not Found' }
    })
}

function toIsoDate (value) {
    return value.slice(0, 'yyyy-mm-dd'.length)
}