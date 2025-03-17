import React from 'react';
import Select from 'react-select';

const Filters = ({ setSortBy, setSelectedUserId }) => {
  const userOptions = Array.from({ length: 10 }, (_, index) => ({
    value: index + 1,
    label: `User ${index + 1}`,
  }));

  const handleSortChange = e => {
    setSortBy(e.target.value);
  };

  const handleUserChange = selectedOption => {
    setSelectedUserId(selectedOption ? selectedOption.value : '');
  };

  return (
    <div>
      <select onChange={handleSortChange}>
        <option value="titleAsc">Sort by Title (Asc)</option>
        <option value="titleDesc">Sort by Title (Desc)</option>
        <option value="userIdAsc">Sort by User ID (Asc)</option>
        <option value="userIdDesc">Sort by User ID (Desc)</option>
      </select>

      <Select
        options={userOptions}
        onChange={handleUserChange}
        isClearable
        placeholder="Filter by User ID"
      />
    </div>
  );
};

export default Filters;
