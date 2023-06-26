import React from 'react';
import About1 from '../../images/about1.gif';
import About2 from '../../images/about2.gif';
import About3 from '../../images/about3.gif';
import About4 from '../../images/about4.gif';
import './style.css';
import { Fade } from 'react-reveal';


function About() {
    return (
        <div>
           <Fade left duration={2000} distance="40px">
            <section className="section">
                <div className="paras">
                    <p className="sectionTag text-small">Manage</p>
                    <h3 className="sectionTag text-big">Simplify teaching and learning</h3>
                    <ul className='sectionUl'>
                        <li>
                            <p className="sectionSubTag text-small">Add students directly, or share a code or link so the whole class can join </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Set up a class in minutes and create class work that appear on students’ To-Do List</p>
                        </li><li>
                            <p className="sectionSubTag text-small">Easily communicate with guardians and automatically send them updates</p>
                        </li>
                    </ul>
                </div>
                <div className="thumbnail">
                    <img src={About1} alt="laptop image"
                        className="imgFluid" />
                </div>
            </section>
            </Fade>
            <Fade right duration={2000} distance="40px">
            <section className="section section-left" id="about">
                <div className="paras">
                    <p className="sectionTag text-small">MEASURE</p>
                    <h3 className="sectionTag text-big">Move students forward</h3>
                    <ul className='sectionUl'>
                        <li>
                            <p className="sectionSubTag text-small">Store frequently used feedback in your comment bank for fast,
                                personalized responses.</p>
                        </li><li>
                            <p className="sectionSubTag text-small">Grade consistently and transparently with rubrics integrated into student work

                            </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Enable originality reports to let students scan their own work for potential plagiarism</p>
                        </li>
                    </ul>
                </div>
                <div className="thumbnail">
                    <img src={About2} alt="laptop image"
                        className="imgFluid" />
                </div>
            </section>
            </Fade>
            <Fade left duration={2000} distance="40px">
            <section className="section" id="services">
                <div className="paras">
                    <p className="sectionTag text-small">COLLABORATE</p>
                    <h3 className="sectionTag text-big">Strengthen student connections</h3>

                    <ul className='sectionUl'>
                        <li>
                            <p className="sectionSubTag text-small">Connect with your students from anywhere with a hybrid approach for in-class and virtual classes
                            </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Communicate important announcements to the Stream page
                            </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Enable face-to-face connections with students using Google Meet built into Classroom
                            </p>
                        </li>
                    </ul>
                </div>
                <div className="thumbnail">
                    <img src={About3} alt="laptop image"
                        className="imgFluid" />
                </div>
            </section>
            </Fade>
            <Fade right duration={2000} distance="40px">
            <section className="section section-left" id="about">
                <div className="paras">
                    <p className="sectionTag text-small">SECURE



                    </p>
                    <h3 className="sectionTag text-big">Keep your data protected</h3>
                    <ul className='sectionUl'>
                        <li>
                            <p className="sectionSubTag text-small">Ensure each user has a unique sign-in to keep individual accounts secure
                            </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Restrict Classroom activity to members of the class

                            </p>
                        </li><li>
                            <p className="sectionSubTag text-small">Protect student privacy - student data is never used for advertising purposes</p>
                        </li>
                    </ul>
                </div>
                <div className="thumbnail">
                    <img src={About4} alt="laptop image"
                        className="imgFluid" />
                </div>
            </section>
            </Fade>

        </div>
    );
}

export default About;