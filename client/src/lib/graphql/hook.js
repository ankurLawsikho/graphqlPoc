import { useQuery } from '@apollo/client';
import { companyByIdQuery, allJobsQuery, getCompany } from './queries';

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