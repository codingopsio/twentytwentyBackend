import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { switchTabs } from '../../utils/tabs';
import './Homepage.css';

const Homepage = () => {
  useEffect(() => {
    switchTabs();
  }, []);

  return (
    <>
      <header className="main-header">
        <div className="container">
          <div className="heading-content">
            <div>
              <h1 className="h-primary my-1">A Simple Bookmark Manager</h1>
              <p className="para-primary my-2">
                A clean and simple interface to organize your favourite
                websites. Open a new browser tab and see your sites load
                instantly. Try it for free.
              </p>

              <div className="heading-buttons">
                <a href="/#" className="btn-blue">
                  GET STARTED
                </a>
                <a href="/#" className="btn-white">
                  VIEW WEBINARS
                </a>
              </div>
            </div>
            <div>
              <img
                src={require('../../img/undraw_youtube_tutorial_2gn3.svg')}
                alt="youtube-img"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="main-features">
        <div className="container">
          <div className="features-heading">
            <h2 className="h-secondary my-1">Features</h2>
            <p className="para-primary my-2">
              Our aim is to make it quick and easy for you to access your
              favourite websites. Your bookmarks sync between your devices so
              you can access them on the go.
            </p>
          </div>

          <div className="features-tabs">
            <div className="tab show-tab">Simple Bookmarking</div>
            <div className="tab">Speedy Searching</div>
            <div className="tab">Easy Sharing</div>
          </div>

          <div className="features-content show-content">
            <div className="features-content-1">
              <div>
                <img
                  src={require('../../img/illustration-features-tab-1.svg')}
                  alt="tab-1-img"
                />
              </div>
              <div>
                <h2 className="h-secondary my-1">Bookmark in one click</h2>
                <p className="para-primary my-2">
                  Organize your bookmarks however you like. Our simple
                  drag-and-drop interface gives you complete control over how
                  you manage your favourite sites.
                </p>

                <a href="/#" className="btn-blue">
                  More Info
                </a>
              </div>
            </div>
          </div>

          <div className="features-content">
            <div className="features-content-2">
              <div>
                <img
                  src={require('../../img/illustration-features-tab-2.svg')}
                  alt="tab-2-img"
                />
              </div>
              <div>
                <h2 className="h-secondary my-1">Bookmark in one click</h2>
                <p className="para-primary my-2">
                  Organize your bookmarks however you like. Our simple
                  drag-and-drop interface gives you complete control over how
                  you manage your favourite sites.
                </p>

                <a href="/#" className="btn-blue">
                  More Info
                </a>
              </div>
            </div>
          </div>

          <div className="features-content">
            <div className="features-content-3">
              <div>
                <img
                  src={require('../../img/illustration-features-tab-3.svg')}
                  alt="tab-3-img"
                />
              </div>
              <div>
                <h2 className="h-secondary my-1">Bookmark in one click</h2>
                <p className="para-primary my-2">
                  Organize your bookmarks however you like. Our simple
                  drag-and-drop interface gives you complete control over how
                  you manage your favourite sites.
                </p>

                <a href="/#" className="btn-blue">
                  More Info
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-services">
        <div className="container">
          <div className="services-heading">
            <h2 className="h-secondary my-1">WHAT YOU CAN GET BY JOINING</h2>
            <p className="para-primary my-2">
              Our aim is to make it quick and easy for you to access your
              favourite websites. Your bookmarks sync between
            </p>
          </div>

          <div className="service-content">
            <div className="parent-card">
              <div className="card">
                <div className="icon">
                  <i className="fas fa-play fa-2x"></i>
                </div>
                <h4 className="h-services my-1">Our Online Courses</h4>
                <small>
                  Amazing library of latest programming courses with support
                </small>

                <div className="line"></div>

                <a href="/#" className="btn-blue">
                  Try Our Courses
                </a>
              </div>
              <div className="card">
                <div className="icon">
                  <i className="fas fa-trophy fa-2x"></i>
                </div>
                <h4 className="h-services my-1">Join our webiners</h4>
                <small>
                  Amazing library of latest programming courses with support
                </small>

                <div className="line"></div>

                <a href="/#" className="btn-blue">
                  Try Our Webinars
                </a>
              </div>
              <div className="card">
                <div className="icon">
                  <i className="fas fa-users fa-2x"></i>
                </div>
                <h4 className="h-services my-1">Our offline bootcamps</h4>
                <small>
                  Amazing library of latest programming courses with support
                </small>

                <div className="line"></div>

                <a href="/#" className="btn-blue">
                  Join Our Bootcamps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="main-faq">
        <div className="container">
          <div className="faq-heading">
            <h2 className="h-secondary my-1">Frequently Asked Questions</h2>
            <p className="para-primary my-2">
              Here are some of our FAQs. If you have any other questions you’d
              like answered please feel free to email us.
            </p>
          </div>

          <div className="faq-content">
            <div className="faq-tabs">
              <div className="faq-tab">
                <input type="checkbox" id="chck1" className="faq-input" />
                <label className="faq-tab-label" htmlFor="chck1">
                  What is bookmark
                </label>
                <div className="faq-tab-content">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Ipsum, reiciendis!
                </div>
              </div>
              <div className="faq-tab">
                <input type="checkbox" id="chck2" className="faq-input" />
                <label className="faq-tab-label" htmlFor="chck2">
                  How o access?
                </label>
                <div className="faq-tab-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  in!
                </div>
              </div>
              <div className="faq-tab">
                <input type="checkbox" id="chck3" className="faq-input" />
                <label className="faq-tab-label" htmlFor="chck3">
                  Is it fast?
                </label>
                <div className="faq-tab-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  in!
                </div>
              </div>
              <div className="faq-tab">
                <input type="checkbox" id="chck4" className="faq-input" />
                <label className="faq-tab-label" htmlFor="chck4">
                  Can I download it
                </label>
                <div className="faq-tab-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. A,
                  in!
                </div>
              </div>
            </div>

            <img
              src={require('../../img/faq.svg')}
              alt="faq"
              className="faq-logo"
            />
          </div>

          <Link to="/signup" className="btn-blue start-now">
            Try It Now
          </Link>
        </div>
      </section>

      <section className="main-subscribtion">
        <div className="container">
          <div className="subscribtion-content">
            <small className="my-2">3,000+ ALREADY JOINED</small>

            <h2 className="subscribtion-heading my-2">
              Stay up-to-date with what we’re doing!
            </h2>

            <form className="subscribe-form">
              <input type="text" placeholder="Enter Your Email" />
              <input type="submit" value="Subscribe" className="btn-red" />
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default Homepage;
