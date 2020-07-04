import React from 'react';
import './CourseDetail.css';

const CourseDetail = () => {
  return (
    <>
      <main className="container row">
        <section className="desc">
          <h1 className="h-secondary my-1">Full Stack Javacript Course</h1>
          <h3 className="s-secondary">(CSS, React, Node)</h3>
          <hr />
          <h3 className="h-secondary my-1">Course Description</h3>
          <p className="para-primary">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Expedita
            exercitationem sit quidem natus sint ducimus earum facilis, maxime
            nulla distinctio facere sequi molestiae consequatur aperiam minus
            tenetur vero vitae perferendis? Lorem ipsum dolor sit amet
            consectetur, adipisicing elit. Facere fugiat cupiditate
            reprehenderit? Dolores cumque placeat, quis vitae labore
            necessitatibus reiciendis earum, reprehenderit asperiores tenetur
            quas a perspiciatis est soluta exercitationem!
          </p>

          <section className="course-time">
            <img
              className="time-img"
              src={require('../../img/queue.svg')}
              alt="time"
            />
            <span>2 Hours & 30 mins</span>
          </section>

          <section className="course-struct">
            <h2 className="heading">Course Structure</h2>
            <div className="box">
              <h2>
                <span>01</span> Javacript Basics
              </h2>
            </div>
            <div className="box">
              <h2>
                <span>02</span> React Basics
              </h2>
            </div>
            <div className="box">
              <h2>
                <span>03</span> Node Basics
              </h2>
            </div>
          </section>
        </section>

        <section className="content">
          <span className="badge">Beginner</span>

          <section className="video-content">
            <h1 className="heading hide-on-large">
              Full Stack Javacript Course
            </h1>
            <iframe
              src="https://www.youtube.com/embed/XuFDcZABiDQ?vq=hd1080&modestbranding=1&showinfo=0&rel=0"
              width="560"
              height="315"
              frameborder="0"
              allowfullscreen="true"
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
              <p>Read Reviews</p>
            </div>
            <div className="options-box">
              {' '}
              <p>Write Reviews</p>
            </div>
            <div className="options-box">
              {' '}
              <p>Start Learning</p>
            </div>
          </section>
        </section>
      </main>
    </>
  );
};

export default CourseDetail;
