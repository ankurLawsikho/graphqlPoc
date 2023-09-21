import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { getCompany } from '../lib/graphql/queries';
import JobList from '../components/JobList';
// import { companies } from '../lib/fake-data';

function CompanyPage() {
  const { companyId } = useParams();
  const [state, setState] = useState({
    company: null,
    loading: true,
    error: false
  })

  useEffect(() => {
    (async () => {
      try {
        const company = await getCompany(companyId);
        console.log("company--",company)
        setState({ company, loading: false, error: false})
      } catch (error) {
        console.log('error', JSON.stringify(error, null, 2))
        setState({ company: null, loading: false, error: true})
      }
    })()
  }, [companyId]);

  const {company, loading, error} = state;
  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>Data Unavailable</h1>
  }

  // const company = companies.find((company) => company.id === companyId);
  return (
    <div>
      <h1 className="title">
        {company.name}
      </h1>
      <div className="box">
        {company.description}
      </div>
      
      <h2 className='title is-5'>
          Jobs At {company.name}
          {company.jobs ? <JobList jobs={company.jobs} /> : <p>No Job Found</p>}
      </h2>
    </div>
  );
}

export default CompanyPage;
