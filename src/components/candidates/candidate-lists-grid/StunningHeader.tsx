'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StunningHeader() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/candidates/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="stunning-headeFind your dream jobFind your dream jobr bg-light-grey">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="crumina-module crumina-heading heading--h1 heading--with-decoration">
              <h1 className="heading-title">Find the Perfect Candidate</h1>
              <div className="heading-text">Search through thousands of qualified candidates</div>
            </div>
            <form className="crumina-module crumina-search-form" onSubmit={handleSearch}>
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Search candidates..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="btn btn-primary">
                  <i className="puzzle-icon fas fa-search"></i>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}