'use client';

import React from 'react';

interface TabItem<T extends string> {
  id: T;
  label: string;
  count?: string;
  icon?: {
    dark: string;
    light: string;
    alt: string;
  };
}

interface TabsProps<T extends string> {
  items: TabItem<T>[];
  activeTab: T;
  onTabChange: (tabId: T) => void;
}

const Tabs = <T extends string>({ items, activeTab, onTabChange }: TabsProps<T>) => {
  return (
    <div className="tabs tabs--with-icon">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              {items.map((item) => (
                <li
                  key={item.id}
                  role="presentation"
                  className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
                >
                  <a
                    className={`nav-link ${activeTab === item.id ? 'active' : ''} h4`}
                    id={`${item.id}-tab`}
                    data-toggle="tab"
                    href={`#${item.id}`}
                    role="tab"
                    aria-controls={item.id}
                    aria-selected={activeTab === item.id}
                    onClick={() => onTabChange(item.id)}
                  >
                    {item.label}
                    {item.count && <span className="position-count">{item.count}</span>}
                    {item.icon && (
                      <span className="icons">
                        <img
                          className="puzzle-icon"
                          src={item.icon.dark}
                          alt={item.icon.alt}
                          width="140"
                        />
                        <img
                          className="puzzle-icon active"
                          src={item.icon.light}
                          alt={item.icon.alt}
                          width="140"
                        />
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tabs;