import { useEffect, useState } from 'react';
import JobList from '../components/JobList';
// import { jobs } from '../lib/fake-data';
// import { getJobs } from '../lib/graphql/queries';
import { useJobs } from '../lib/graphql/hook';
import PaginationBar from '../components/PaginationBar';

const JOBS_PER_PAGE = 5;



function HomePage() {

  const [ currentPage, setCurrentPage ] = useState(1);
  const { jobs, loading, error } = useJobs(JOBS_PER_PAGE, (currentPage - 1) * JOBS_PER_PAGE);

  
  
  if (loading) {
    return <h1>Loading ...</h1>
  }

  if (error) {
    return <h1>Data Unavailable</h1>
  }
  const totalPages = Math.ceil(jobs.totalCount / JOBS_PER_PAGE);
  return (
    <div>
      <h1 className="title">
        Job Board
      </h1>
      {/* <button
        disabled = {currentPage === 1} 
        onClick={() => setCurrentPage(currentPage - 1)}>
        Previous
      </button>
      <span>{`${currentPage} of ${totalPages}`}</span>
      <button 
        disabled = {currentPage === totalPages} 
        onClick={() => setCurrentPage(currentPage + 1)}>
        Next
      </button> */}

      <PaginationBar currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage}/>
      <JobList jobs={jobs.items} />
    </div>
  );
}

export default HomePage;
