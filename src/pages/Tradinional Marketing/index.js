import React from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Marker from "../../components/Marker";

import marker1 from "../../images/marker-1.png";
import marker2 from "../../images/marker-2.png";
import marker3 from "../../images/marker-3.png";
import marker4 from "../../images/marker-4.png";
import gifIcon from "../../images/gif-placeholder.png";
import flag from "../../images/flag.png";

import { motion } from "framer-motion";

function Marketing() {
  return (
    <motion.div
      className="marketing"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <Header />
      <section>
        <div className="container">
          <div className="flex-split">
            <Marker inner={marker1} />
            <div className="info">
              <h2>
                WEBSITE<span className="shadow">WEBSITE</span>
              </h2>
              <p>
                There is no more expensive thing than a cheaply made website
                because nowadays everything takes place on it. Only a
                high-quality and professionally designed website will bring you
                profit, attract users and allow you to convert them into
                customers. In contrast, a cheap website will only get you a
                minus because of wasted money.
                <br></br>
                If you agree with that, book a call.
              </p>
              <button>BOOK A CALL</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex-split | column-reverse">
            <div className="info">
              <h2>
                2D ANIMATION<span className="shadow">2D ANIMATION</span>
              </h2>
              <p>
                If they say a picture is worth a thousand words, then a video is
                a whole of a thousand pictures. Imagine then how many words a
                viewer can replace! Our job is to present your long texts,
                industry terminology and innovative products/services in a
                concise, exciting and understandable way that will transform the
                viewer into a customer.
              </p>
              <div className="carousel"></div>
              <button>BOOK A CALL</button>
            </div>
            <Marker inner={gifIcon} />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex-split">
            <Marker inner={marker2} />
            <div className="info">
              <h2>
                PLACENE REKLAME<span className="shadow">PLACENE REKLAME</span>
              </h2>
              <p>
                Facebook, Youtube, TikTok, Linkedin, Instagram - your business
                can be everywhere! We can help you achieve positive results on
                every platform. At the right time, in the right place and with
                the right content, convert an ordinary user into your client!
              </p>
              <button>BOOK A CALL</button>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex-split | column-reverse">
            <div className="info">
              <h2>
                DRUŠTVENE MREŽE<span className="shadow">DRUŠTVENE MREŽE</span>
              </h2>
              <p>
                Social networks contribute to the branding of the company and
                allow you to reach a large number of users, your potential
                customers. Professional management of social networks is crucial
                because they represent a place where users can directly
                communicate with you and form an image of you and the overall
                picture you send about your business through content.
              </p>
              <button>BOOK A CALL</button>
            </div>
            <Marker inner={marker3} />
          </div>
        </div>
      </section>
      <section>
        <div className="container">
          <div className="flex-split">
            <Marker inner={marker4} />
            <div className="info">
              <h2>
                (RE)DIZAJN<span className="shadow">(RE) DIZAJN</span>
              </h2>
              <p>
                The visual identity of your site is just as important as the
                text. People form an impression of you and your business based
                on your advertising design as much as what they read. Visual
                marketing solutions include everything that is not a word, so -
                logo, dominant colours/colour harmony, images, all of this
                together sends a message about you. As far as offline marketing
                is concerned, the design that is important to invest in is
                business cards because if you don't attract a person with what
                they see, that card has not fulfilled its purpose.
              </p>
              <button>BOOK A CALL</button>
            </div>
          </div>
        </div>
      </section>
      <section className="marketing__finish">
        <div className="container">
          <div className="last-stop">
            <div className="marker">
              <img src={flag} alt="" />
            </div>
            <div className="info">
              <h2>
                FULL SERVICE<span className="shadow">FULL SERVICE</span>
              </h2>
              <p>
                The first impression customers get of you is based on your
                marketing. Clients buy the quality of your marketing and how you
                advertise, and only then what you sell. If you want to improve
                your marketing to attract clients and find all the mentioned
                components in one place, you are at the correct address! We will
                save you time and other resources that you would lose in
                negotiations and cooperation with six different companies for a
                specific area. Why would you allow that when you can get all of
                the above from one agency?
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </motion.div>
  );
}

export default Marketing;
