"use client";

import React from "react";
import Link from "next/link";

const companiesByLetter = {
  A: [
    { name: "Acer", jobs: 8 },
    { name: "Adidas", jobs: 32 },
    { name: "Adobe Systems", jobs: 10 },
    { name: "Aldi", jobs: 6 },
    { name: "Alfa Romeo", jobs: 209 },
    { name: "Amazon", jobs: 67 },
    { name: "Apache", jobs: 20 },
    { name: "Apple", jobs: 4 },
    { name: "Arcelor", jobs: 38 },
    { name: "Arm & Hammer", jobs: 5 },
    { name: "ARM Limited", jobs: 11 },
    { name: "Asda", jobs: 3 },
    { name: "ASICS", jobs: 8 },
    { name: "Aston Martin", jobs: 10 },
    { name: "Audi", jobs: 6 }
  ],
  B: [
    { name: "B&Q", jobs: 8 },
    { name: "Beko", jobs: 32 },
    { name: "Berkska", jobs: 10 },
    { name: "Bosh", jobs: 6 },
    { name: "Boeing", jobs: 209 },
    { name: "Bose Corporation", jobs: 67 },
    { name: "BlackBerry", jobs: 20 },
    { name: "Bull", jobs: 4 },
    { name: "Bultaco", jobs: 38 }
  ],
  C: [
    { name: "Cadillac", jobs: 8 },
    { name: "Coca-Cola", jobs: 32 },
    { name: "Corel", jobs: 10 },
    { name: "Cray", jobs: 6 },
    { name: "Cromemco", jobs: 209 },
    { name: "Cutco", jobs: 67 }
  ],
  F: [
    { name: "Facebook", jobs: 8 },
    { name: "Ferrari", jobs: 32 },
    { name: "Fiat", jobs: 10 },
    { name: "Fonterra", jobs: 6 },
    { name: "FranklinCovey", jobs: 209 }
  ],
  M: [
    { name: "MAN", jobs: 8 },
    { name: "Manulife Finance", jobs: 32 },
    { name: "McDonald's", jobs: 10 },
    { name: "Mercedes-Benz", jobs: 6 },
    { name: "MFI", jobs: 209 },
    { name: "Microlins", jobs: 67 },
    { name: "Micron Tech", jobs: 20 },
    { name: "Microsift", jobs: 4 },
    { name: "Miele", jobs: 38 },
    { name: "Minolta", jobs: 5 },
    { name: "Motorola", jobs: 11 },
    { name: "Musco Lighting", jobs: 3 }
  ],
  S: [
    { name: "Skoda Auto", jobs: 8 },
    { name: "Skype", jobs: 32 },
    { name: "Smart", jobs: 10 },
    { name: "Starbucks", jobs: 6 },
    { name: "Stellent", jobs: 209 },
    { name: "Subaru", jobs: 4 }
  ],
  X: [
    { name: "Xerox", jobs: 8 },
    { name: "Xobni", jobs: 32 },
    { name: "Xstrata", jobs: 10 },
    { name: "XTO Energy", jobs: 6 }
  ]
};

function chunkArray<T>(arr: T[], size: number): T[][] {
  const result: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }
  return result;
}

const CompanyAlphabetList: React.FC = () => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const hasCompanies = (letter: string) => letter in companiesByLetter;

  return (
    <section className="medium-padding120 bg-light-grey">
      <div className="container">
        <div className="row mb60">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <header className="crumina-module crumina-heading heading--h2 heading--with-decoration heading--inline mb-0">
              <h2 className="heading-title">We have 368 great companies special for you!</h2>
              <div className="heading-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </header>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="crumina-module crumina-alphabeta-search">
              <div className="alphabeta-letters">
                {alphabet.map((letter) => (
                  <a
                    key={letter}
                    className={hasCompanies(letter) ? "has-result" : ""}
                    href={hasCompanies(letter) ? `#${letter}` : "#"}
                    data-scroll={hasCompanies(letter)}
                  >
                    {letter}
                  </a>
                ))}
              </div>

              <ul className="alphabeta-list-result">
                {Object.entries(companiesByLetter).map(([letter, companies]) => (
                  <li key={letter} className="alphabeta-letter-item">
                    <div id={letter} className="company-letter">{letter}</div>
                    {chunkArray(companies, 5).map((group, groupIdx) => (
                      <ul key={groupIdx}>
                        {group.map((company, idx) => (
                          <li key={idx}>
                            <Link href="/employers/company-profile">
                              {company.name} ({company.jobs})
                            </Link>
                          </li>
                        ))}
                      </ul>
                    ))}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyAlphabetList;