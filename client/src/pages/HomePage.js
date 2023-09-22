import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
// import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hook';



function HomePage() {

  // const [jobs, setJobs] = useState([]);

  // useEffect(() => {
  //   getJobs().then((data) => {
  //     setJobs(data)
  //   })
  // }, [])

  const { jobs, loading, error } = useJobs();
  console.log("[HomePage] ------", { jobs, loading, error })

  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>Data Unavailable</h1>
  }

  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      <JobList jobs={jobs} />
    </div>
  );
}

export default HomePage;
