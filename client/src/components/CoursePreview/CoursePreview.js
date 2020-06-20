import React from 'react';
import './CoursePreview.css';

const CoursePreview = () => {
  return (
    <>
      <div className="courses-container">
        <section class="courses">
          <div class="courses-heading">
            <div>
              <h2>Courses</h2>
              <span class="heading-num">20</span>
            </div>
            <div>
              <a href="./courselist.html">View All</a>
            </div>
          </div>

          <div class="courses-cards">
            <div class="card">
              <img src={require('../../img/card1.png')} alt="card" />
              <small>Lorem ipsum dolor sit amet.</small>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <p>Free</p>
            </div>
            <div class="card">
              <img src={require('../../img/card1.png')} alt="card" />
              <small>Lorem ipsum dolor sit amet.</small>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <p>Free</p>
            </div>
            <div class="card">
              <img src={require('../../img/card1.png')} alt="card" />
              <small>Lorem ipsum dolor sit amet.</small>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <p>Free</p>
            </div>
            <div class="card">
              <img src={require('../../img/card1.png')} alt="card" />
              <small>Lorem ipsum dolor sit amet.</small>
              <span>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
              </span>
              <p>Free</p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CoursePreview;
