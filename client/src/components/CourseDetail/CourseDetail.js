import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { getSingleWebinar } from '../../actions/course';
import './CourseDetail.css';
import { connect } from 'react-redux';

const CourseDetail = ({ singleWebinar, getSingleWebinar, history, match }) => {
  useEffect(() => {
    getSingleWebinar(match.params.id);
  }, []);

  return (
    <>
      <main className="container row">
        <section className="desc">
          <h1 className="h-secondary my-1">{singleWebinar.title}</h1>
          <h3 className="s-secondary">
            ({' '}
            {singleWebinar.ManageTopics ? (
              <span>
                {singleWebinar.ManageTopics.toString().split(',')[0]} {' , '}
                {singleWebinar.ManageTopics.toString().split(',')[1]}
              </span>
            ) : (
              <></>
            )}
            )
          </h3>
          <hr />
          <h3 className="h-secondary my-1">Course Description</h3>
          <p className="para-primary">{singleWebinar.description}</p>

          <section className="course-time">
            <img
              className="time-img"
              src={require('../../img/queue.svg')}
              alt="time"
            />
            <span>
              {singleWebinar.time ? (
                <span>
                  {singleWebinar.time.split(':')[0]} hours &{' '}
                  {singleWebinar.time.split(':')[1]} minutes{' '}
                </span>
              ) : (
                <></>
              )}
            </span>
          </section>

          <section className="course-struct">
            <h2 className="heading">Course Structure</h2>
            {singleWebinar.CourseStructure
              ? singleWebinar.CourseStructure.map((el, i) => (
                  <React.Fragment key={`item-${i}`}>
                    <div className="box">
                      <h2>
                        <span>0{i + 1}</span> {el ? el : 'hi'}
                      </h2>
                    </div>
                  </React.Fragment>
                ))
              : null}
          </section>
        </section>

        <section className="content">
          <span className="badge">{singleWebinar.difficulty}</span>

          <section className="video-content">
            <h1 className="heading hide-on-large">
              Full Stack Javacript Course
            </h1>
            <iframe
              title="tube"
              src="https://www.youtube.com/embed/XuFDcZABiDQ?vq=hd1080&modestbranding=1&showinfo=0&rel=0"
              width="560"
              height="315"
              frameBorder="0"
              allowFullScreen={true}
              className="youtube-video"></iframe>
          </section>

          <h3 className="ratings">
            <img
              className="rating-star"
              src={require('../../img/icon-star.svg')}
              alt="star"
            />
            <span className="rated">4.5</span> Ratings{' '}
            <img
              className="rating-star"
              src={require('../../img/icon-reviews.svg')}
              alt="star"
            />
            <span className="rated">86</span> Reviews
          </h3>

          <section className="content-options">
            <div className="options-box">
              {' '}
              <p style={{ letterSpacing: '1.4px' }}>Read Reviews</p>
            </div>
            <div className="options-box">
              {' '}
              <p style={{ letterSpacing: '1.4px' }}>Write Reviews</p>
            </div>
            <div className="options-box">
              {' '}
              <p
                style={{ letterSpacing: '1.4px' }}
                onClick={(e) => {
                  e.preventDefault();
                  history.push(`/discussions/${match.params.id}`);
                }}>
                All Discussion
              </p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleWebinar: (id) => dispatch(getSingleWebinar(id)),
  };
};

const mapStateToProps = (state) => {
  return {
    singleWebinar: state.course.singleWebinar,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(CourseDetail));
