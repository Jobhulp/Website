import React from 'react';

interface Tab {
  label: string;
  value: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (value: string) => void;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({ tabs, activeTab, onTabChange, className }) => {
  return (
    <div className={className ? `tabs ${className}` : 'tabs'}>
      <ul className="nav nav-tabs" role="tablist">
        {tabs.map((tab) => (
          <li
            key={tab.value}
            className="nav-item"
            role="presentation"
          >
            <a
              className={`nav-link h6 tabs-scroll${activeTab === tab.value ? ' active' : ''}`}
              onClick={() => onTabChange(tab.value)}
              id={tab.value}
              data-toggle="tab"
              role="tab"
              aria-controls={tab.value}
              aria-selected={activeTab === tab.value}
              style={{ cursor: 'pointer' }} 
            >
              {tab.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Tabs;