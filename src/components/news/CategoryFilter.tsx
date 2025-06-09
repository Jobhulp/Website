import React from 'react';

interface Category {
  label: string;
  value: string;
  filter: string;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (filter: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="d-block align-items-center d-md-flex text-center text-md-left">
      <h6 className="mr-0 mr-md-5">Filter:</h6>
      <ul className="category-list sorting-menu">
        {categories.map((category, index) => (
          <li
            key={index}
            data-value={category.value}
            className={activeCategory === category.filter ? 'active init' : ''}
            data-filter={category.filter}
            onClick={() => onCategoryChange(category.filter)}
          >
            {category.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryFilter;