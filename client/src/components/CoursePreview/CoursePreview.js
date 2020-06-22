import React from 'react';
import './CoursePreview.css';
import { connect } from 'react-redux';
import CourseItem from '../CourseItem/CourseItem';
import { Link } from 'react-router-dom';

const CoursePreview = ({ course }) => {
  return (
    <>
      <div className="courses-container">
        <section className="courses">
          <div className="courses-heading">
            <div>
              <h2>Courses</h2>
              <span className="heading-num">{course.courses.length}</span>
            </div>
            <div>
              <Link
                style={{ color: 'grey', fontSize: '17px' }}
                to="/courselist">
                View All
              </Link>
            </div>
          </div>

          <div className="courses-cards">
            {course.courses.slice(0, 4).map(({ _id, ...otherProps }) => (
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

export default connect(mapStateToProps, null)(CoursePreview);
