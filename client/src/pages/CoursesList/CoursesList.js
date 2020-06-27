import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CourseItem from './../../components/CourseItem/CourseItem';
import { getAllWebinars } from './../../actions/course';
import './CoursesList.css';

const categories = [
  'Javascript',
  'Fullstack',
  'Frontend',
  'Backend',
  'Mobile Development',
  'React',
  'Node',
  'Angular',
  'Docker',
  'AWS',
  'Python',
  'Css',
  'React Native',
];

const CoursesList = ({ course, getAllWebinars }) => {
  const [category, setCategory] = useState('');
  const [searchValue, setSearchValue] = useState('');
  const [submitData, setSubmitData] = useState('');

  useEffect(() => {
    getAllWebinars(category);
  }, [category]);

  const handleChange = (e) => {
    e.preventDefault();
    setCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    e.preventDefault();
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setSubmitData(searchValue);
    setSearchValue('');
  };

  return (
    <>
      <div className="courselist-container">
        <div className="filters">
          <div className="select">
            <select
              defaultValue={'DEFAULT'}
              name="slct"
              id="slct"
              onChange={(e) => handleChange(e)}>
              <option value="DEFAULT" disabled>
                Filter By Category
              </option>

              {categories.map((item, i) => (
                <option key={`${item}-${i}`} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="search">
            <form onSubmit={(e) => handleSearchSubmit(e)}>
              <input
                type="text"
                placeholder="Find a course"
                name="search"
                onChange={(e) => handleSearchChange(e)}
                value={searchValue}
              />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>
        <section className="courses-list">
          <div className="courses-list-cards">
            {course.courses
              .filter((item) => {
                if (
                  item.title.toLowerCase().indexOf(submitData.toLowerCase()) ===
                  -1
                ) {
                  return false;
                } else {
                  return true;
                }
              })
              .map(({ _id, ...otherProps }) => (
                <CourseItem key={_id} {...otherProps} />
              ))}
          </div>
        </section>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    course: state.course,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllWebinars: (param) => dispatch(getAllWebinars(param)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CoursesList);
