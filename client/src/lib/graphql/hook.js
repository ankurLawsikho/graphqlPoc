import { useQuery, useMutation } from '@apollo/client';
import { companyByIdQuery, allJobsQuery, createJobMutation, jobByIdQuery, getCompany } from './queries';



export function useCompany (id) {
    const { data, loading, error } = useQuery(companyByIdQuery,{
      variables: { id },
      fetchPolicy: 'cache-first'
    });
  
    return { company: data?.company , loading, error: Boolean(error)}
}


export function useJobs () {
    const { data, loading, error } = useQuery(allJobsQuery,{
      fetchPolicy: 'cache-first'
    });
  
    return { jobs: data?.jobs , loading, error: Boolean(error)}
}

export function useCreateJob() {
  const [mutate, { loading }] = useMutation(createJobMutation);

  const createJob = async (title, description) => {
    const { data: { job } } = await mutate({
      variables: { input: { title, description } },
      update: (cache, { data }) => {
        cache.writeQuery({
          query: jobByIdQuery,
          variables: { id: data.job.id },
          data,
        });
      },
    });
    return job;
  };

  return {
    createJob,
    loading,
  };
}