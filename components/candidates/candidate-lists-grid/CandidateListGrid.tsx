"use client";

import { useState } from "react";
import CandidateCard from "../candidate-lists/CandidateCard";
import Pagination from "../candidate-lists/Pagination";

const candidates = [
  {
    name: "Jerry Thomas",
    location: "London, United Kingdom",
    avatar: "/img/author8.jpg",
    skills: ["Web", "Development", "HTML", "WordPress"],
    title: "Web Developer",
    rate: "$45 / Hour",
    isFeatured: true,
  },
  {
    name: "Catherine White",
    location: "New York, USA",
    avatar: "/img/author9.jpg",
    skills: ["UX", "UI", "Web Design"],
    title: "UX/UI Designer",
    rate: "$60 / Hour",
  },
  {
    name: "Betty Stevens",
    location: "Melbourne, Australia",
    avatar: "/img/author10.jpg",
    skills: ["Web", "Web Design", "UX", "User Interfaces"],
    title: "Web Designer",
    rate: "$45 / Hour",
    isFeatured: true,
  },
  {
    name: "Russell Wright",
    location: "California, USA",
    avatar: "/img/author11.jpg",
    skills: ["Analysis", "Finance", "Sales", "Marketing"],
    title: "Marketing Director",
    rate: "$35 / Hour",
  },
  {
    name: "Doris Stewart",
    location: "Cologne, Germany",
    avatar: "/img/author12.jpg",
    skills: ["Web", "Development", "HTML", "WordPress"],
    title: "Web Developer",
    rate: "$60 / Hour",
  },
  {
    name: "Maria Bowman",
    location: "New York, USA",
    avatar: "/img/author13.jpg",
    skills: ["UX", "UI", "Web Design"],
    title: "UX/UI Designer",
    rate: "$60 / Hour",
  },
];

export default function CandidateListGrid() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 36;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <section className="bg-light-grey pb120">
      <div className="container">
        <div className="row mb20">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <h3 className="mb40 mt-0">Search Result:</h3>
          </div>

          {candidates.map((candidate, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-sm-12 col-xs-12 mb40"
            >
              <CandidateCard {...candidate} skills={[]} />
            </div>
          ))}
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
