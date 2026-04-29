"use client";

import React, { useState } from "react";
// import dynamic from "next/dynamic";
// import type { StylesConfig, GroupBase, SingleValue } from "react-select";
// import Input from '../../ui/Input';
import Tabs from "../../ui/Tabs";

// const Select = dynamic(() => import("react-select"), {
//   ssr: false,
// }) as React.ComponentType<{
//   options: Option[];
//   value: Option;
//   onChange: (option: Option | null) => void;
//   styles: StylesConfig<Option, false, GroupBase<Option>>;
//   isSearchable: boolean;
//   classNamePrefix: string;
//   id: string;
//   instanceId?: string;
//   placeholder?: string;
// }>;

interface JobFiltersProps {
  onSearch?: (filters: {
    keywords: string;
    specialism: string;
    location: string;
  }) => void;
}

// interface Option {
//   value: string;
//   label: string;
// }

// const specialismOptions: Option[] = [
//   { value: "all", label: "Alle specialismen" },
//   { value: "freelance", label: "Freelance" },
//   { value: "full-time", label: "Full Time" },
//   { value: "internship", label: "Stage" },
//   { value: "part-time", label: "Part Time" },
//   { value: "temporary", label: "Tijdelijk" },
// ];

// const locationOptions: Option[] = [
//   { value: "all", label: "Alle Locaties" },
//   { value: "freelance", label: "Freelance" },
//   { value: "full-time", label: "Full Time" },
//   { value: "internship", label: "Stage" },
//   { value: "part-time", label: "Part Time" },
//   { value: "temporary", label: "Tijdelijk" },
// ];

// const customSelectStyles: StylesConfig<Option, false, GroupBase<Option>> = {
//   control: (base) => ({
//     ...base,
//     minHeight: "38px",
//     backgroundColor: "#fff",
//     borderColor: "#ced4da",
//     "&:hover": {
//       borderColor: "#ced4da",
//     },
//   }),
//   option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected ? "#0d6efd" : "#fff",
//     color: state.isSelected ? "#fff" : "#212529",
//     "&:hover": {
//       backgroundColor: state.isSelected ? "#0d6efd" : "#e9ecef",
//     },
//   }),
// };

// // Type guard for react-select single value
// function isOption(option: SingleValue<Option>): option is Option {
//   return (
//     option !== null &&
//     typeof option === "object" &&
//     "value" in option &&
//     "label" in option
//   );
// }

export const JobFilters: React.FC<JobFiltersProps> = () => {
  const [activeTab, setActiveTab] = useState<"find" | "candidate">("find");
  // const [candidateSpecialism, setCandidateSpecialism] = useState<Option>(
  //   specialismOptions[0]
  // );
  // const [candidateLocation, setCandidateLocation] = useState<Option>(
  //   locationOptions[0]
  // );
  // const [findKeywords, setFindKeywords] = useState('');
  // const [findSpecialism, setFindSpecialism] = useState<Option>(specialismOptions[0]);
  // const [findLocation, setFindLocation] = useState<Option>(locationOptions[0]);

  const tabList = [
    { label: "Ik zoek een job", value: "find" },
    { label: "Ik zoek een kandidaat", value: "candidate" },
  ];

  return (
    <section>
      <div className="tabs tabs--primary negative-margin-top-63">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
              <Tabs
                tabs={tabList}
                activeTab={activeTab}
                onTabChange={(tab) => setActiveTab(tab as "find" | "candidate")}
                className="tabs--primary negative-margin-top-63"
              />
            </div>
          </div>
        </div>
        <div className="tab-content">
          <div className="container">
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                {activeTab === "find" && (
                  <div
                    className="tab-pane active"
                    id="find"
                    role="tabpanel"
                    aria-labelledby="find-tab"
                  >
                    <form className="form--search">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <input
                            name="name"
                            placeholder="Zoekwoorden (bv. webdesign)"
                            type="text"
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <select
                            id="select1"
                            className="puzzle--select w-full"
                          >
                            <option>Alle specialismen</option>
                            <option value="1">Freelance</option>
                            <option value="2">Full Time</option>
                            <option value="3">Stage</option>
                            <option value="4">Part Time</option>
                            <option value="5">Tijdelijk</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-3">
                          <select
                            id="select2"
                            className="puzzle--select w-full"
                          >
                            <option>Alle locaties</option>
                            <option value="1">Antwerpen</option>
                            <option value="2">Brussel</option>
                            <option value="3">Gent</option>
                            <option value="4">Leuven</option>
                            <option value="5">Limburg</option>
                          </select>
                        </div>
                        <div className="col-md-2 mb-3">
                          <button
                            type="button"
                            className="crumina-button button--dark button--xl w-full"
                          >
                            Zoeken
                          </button>
                        </div>
                      </div>
                      <div className="row mt-4 mt-md-0">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="checkboxes-wrap">
                            <div className="checkbox checkbox--blue-dark">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Part Time
                              </label>
                            </div>

                            <div className="checkbox checkbox--green">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes1"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Full Time
                              </label>
                            </div>

                            <div className="checkbox checkbox--red">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes2"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Temporary
                              </label>
                            </div>

                            <div className="checkbox checkbox--yellow">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes3"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Internship
                              </label>
                            </div>

                            <div className="checkbox checkbox--blue">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes4"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Freelance
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
                {activeTab === "candidate" && (
                  <div
                    className="tab-pane active"
                    id="candidate"
                    role="tabpanel"
                    aria-labelledby="candidate-tab"
                  >
                    <form className="form--search">
                      <div className="row">
                        <div className="col-md-4 mb-3">
                          <input
                            name="name"
                            placeholder="Zoekwoorden (bv. developer)"
                            type="text"
                            className="input input-bordered w-full"
                          />
                        </div>
                        <div className="col-md-3 mb-3">
                          <select
                            id="select3"
                            className="puzzle--select w-full"
                          >
                            <option>Alle specialismen</option>
                            <option value="1">Freelance</option>
                            <option value="2">Full Time</option>
                            <option value="3">Stage</option>
                            <option value="4">Part Time</option>
                            <option value="5">Tijdelijk</option>
                          </select>
                        </div>
                        <div className="col-md-3 mb-3">
                          <select
                            id="select4"
                            className="puzzle--select w-full"
                          >
                            <option>Alle locaties</option>
                            <option value="1">Antwerpen</option>
                            <option value="2">Brussel</option>
                            <option value="3">Gent</option>
                            <option value="4">Leuven</option>
                            <option value="5">Limburg</option>
                          </select>
                        </div>
                        <div className="col-md-2 mb-3">
                          <button
                            type="button"
                            className="crumina-button button--dark button--xl w-full"
                          >
                            Zoeken
                          </button>
                        </div>
                      </div>
                      <div className="row mt-4 mt-md-0">
                        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
                          <div className="checkboxes-wrap">
                            <div className="checkbox checkbox--blue-dark">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Part Time
                              </label>
                            </div>

                            <div className="checkbox checkbox--green">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes1"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Full Time
                              </label>
                            </div>

                            <div className="checkbox checkbox--red">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes2"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Temporary
                              </label>
                            </div>

                            <div className="checkbox checkbox--yellow">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes3"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Internship
                              </label>
                            </div>

                            <div className="checkbox checkbox--blue">
                              <label>
                                <input
                                  type="checkbox"
                                  name="optionsCheckboxes4"
                                />
                                <span className="checkbox-material">
                                  <span className="check"></span>
                                </span>
                                Freelance
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
