import React from 'react';
import { connect } from 'react-redux';
import CourseItem from './../../components/CourseItem/CourseItem';
import './CoursesList.css';

const CoursesList = ({ course }) => {
  return (
    <>
      <div className="courselist-container">
        <div className="filters">
          <div className="select">
            <select defaultValue={'DEFAULT'} name="slct" id="slct">
              <option value="DEFAULT" disabled>
                Filter By Category
              </option>
              <option value="javascript">Javascript</option>
              <option value="css">Css</option>
              <option value="react">React</option>
            </select>
          </div>

          <div className="search">
            <form>
              <input type="text" placeholder="Find a course" name="search" />
              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
          </div>
        </div>

        <section className="courses-list">
          <div className="courses-list-cards">
            {course.courses.map(({ _id, ...otherProps }) => (
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

export default connect(mapStateToProps)(CoursesList);
