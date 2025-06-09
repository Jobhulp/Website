'use client';

import { useState } from 'react';
import CandidateList from './CandidateList';
import FeaturedCandidates from './FeaturedCandidates';
import Pagination from './Pagination';

export default function CandidateListsSection() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 36; // This should come from your data source

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Add your logic to fetch data for the new page
  };

  return (
    <section className="bg-light-grey pb120">
      <div className="container">
        <div className="row mb40">
          <div className="col-lg-8 col-md-12 col-sm-12 col-xs-12">
            <CandidateList />
          </div>
          <div className="col-lg-4 col-md-12 col-sm-12 col-xs-12 mt-4 mt-lg-0">
            <FeaturedCandidates />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </section>
  );
}