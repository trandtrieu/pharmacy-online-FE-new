import React, { useState } from "react";

const CategoryMenu = ({ categories, onCategoryClick }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="category-menu">
      <button
        className="btn d-flex align-items-center justify-content-between bg-primary w-100"
        onClick={toggleMenu}
      >
        <h6 className="text-dark m-0">
          <i
            className={`fa ${isOpen ? "fa-angle-up" : "fa-angle-down"} mr-2`}
          />
          Categories
        </h6>
      </button>
      {isOpen && (
        <nav className="navbar navbar-vertical navbar-light align-items-start p-0 bg-light">
          <div className="navbar-nav w-100">
            {categories.map((category) => (
              <li key={category.category_id}>
                <button
                  className="btn"
                  onClick={() => onCategoryClick(category.category_id)}
                >
                  {category.category_name}
                </button>
              </li>
            ))}
          </div>
        </nav>
      )}
    </div>
  );
};

export default CategoryMenu;
