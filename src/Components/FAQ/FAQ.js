import React from "react";
import "./Faq.scss";
import { Helmet } from "react-helmet-async";

const Faq = ({ title }) => {
  if (window !== undefined) {
    window.scrollTo(0, 0);
  }
  return (
    <>
      <Helmet>
        <title>{title || "FAQs"}</title>
      </Helmet>
      <div className="pagecover">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <h1>FAQs (All your doubts resolved)</h1>
            </div>
          </div>
        </div>
      </div>

      <div className="tandcpage" id="faq_container">
        <div className="container">
          <div className="row">
            <div className="col-12 col-lg-12">
              <ol className="faqui" id="faqUi">
                <li>
                  <div className="boldfont">
                    Why VAT is being quoted in final order calculation in app?
                  </div>
                  <p>
                    Vuezen is fully GST compliant, the current version of app
                    you are using needs to be upgraded to Android & iOS app
                    version 1.9.4 & 2.88 respectively for the correct verbiage.
                    Further - even if order is placed from older versions -
                    final invoice received will be as per GST norms & fully
                    compliant.
                  </p>
                </li>
                <li>
                  <div className="boldfont">How to delete user account ?</div>
                  <p>
                    To request for user account and data deletion, please write
                    to tech@Vuezen.in. We will revert with resolution within 48
                    hours.
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    I’m not sure about the size and fit of the frames.
                  </div>
                  <p>
                    At Vuezen, we offer glasses in 3 sizes – small, medium, and
                    large. Click the ‘Frame Size’ link at the bottom of the page
                    to know your size. ~80-90% of our customers find a medium
                    size frame to be the best fit.
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    What if I buy glasses & they don’t fit me? What if the
                    lenses aren’t right ?
                  </div>
                  <p>
                    Don’t worry! It is our responsibility to get the perfect
                    pair of glasses. In the rare circumstance that your glasses
                    don’t fit properly, we make it extremely easy for you to
                    exchange or return the frames, with lenses. If you face any
                    difficulty, just call us at 000000000 We have a No Questions
                    Asked Return Policy - 14 Days for Eyeglasses & Contact
                    Lenses and 7 Days for Sunglasses & Clips On. We provide
                    instant money back or store credit on return.
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    Will the glasses have my prescription?
                  </div>
                  <p>
                    You can buy glasses fitted with your prescription or even
                    the frames standalone. We custom-make glasses with single
                    vision, bifocal, or progressive prescriptions across all
                    powers. Our glasses are ~50% cheaper than market average,
                    since we bypass intermediaries – and best of all, we charge
                    the same price, regardless of your power!
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    Will Vuezen be able to make my complex power?
                  </div>
                  <p>
                    At Vuezen, we stock all powers – simple and complex. The
                    unique robotic technology used in our lab ensures that the
                    most complex powers are fitted perfectly, ensuring 100%
                    error-free glasses. Our 10 lakh+ customers can vouch for the
                    precision with which we make the eyeglasses!
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    Where do I submit my eye power details?
                  </div>
                  <p>
                    You can submit your power details after you complete your
                    purchase. We offer multiple options to provide your
                    prescription to us – upload a picture, enter it online,
                    email us (power@Vuezen.com) or call us at 000000000
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    I don’t have my prescription handy. Is it important to give
                    it right away?
                  </div>
                  <p>
                    It’s ok if you don’t have your prescription handy while
                    placing the order. Simply place the order for the frame and
                    provide your power using the links provided in the SMS and
                    email that we send you, post order completion. It’s that
                    simple!
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    I really, really want to try the frames on before making a
                    purchase!
                  </div>
                  <p>
                    Unsure? Use our 3D Try-on! Feature – click ‘3D Try-on!’ on
                    the product page of your chosen frame, follow the
                    instructions, and see a 180 degree view of yourself with
                    your chosen frames! Share with your friends and family to
                    find the perfect pair! In addition, we offer a unique ‘Free
                    Home Trial’ service, across India. Select up to 5 frames
                    (from our non-free frame categories) and our delivery
                    executive will bring them to your doorstep for trial!Click
                    here to try frames!
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    How can I be sure of the quality of the frames?
                  </div>
                  <p>
                    Quality is at the core of Vuezen’s products. Our plastic
                    frames are made from the best quality acetate and our metal
                    frames are made only from steel or titanium – this makes our
                    glasses corrosion and breakage resistant. We also offer a 1
                    year warranty on all our glasses – in case you have any
                    issues, call us, and we’ll make sure it gets resolved!
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    What lenses will you use? I use thin, anti-glare lenses.
                  </div>
                  <p>
                    We understand that a pair of glasses is only as good as the
                    lenses fitted in them. Most anti-glare lenses cost between
                    Rs.1,500 - 2,000 at your local optician. At that price we
                    give you robotically fitted, anti-glare lenses, with a 1.6
                    index which is ~35% thinner than market average. In addition
                    we offer UV-400 protection on all our lenses, similar to
                    what is provided in lenses across Europe and the USA
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    I haven’t heard of some of the brands available. How does
                    Vuezen determine which brands to stock?
                  </div>
                  <p>
                    All the brands sold on Vuezen are chosen after carefully
                    looking at their product quality, manufacturing processes,
                    and customer service. There are some brands which we have
                    brought to Indian from countries such as Italy, to introduce
                    them to the Indian market and you to their superior
                    products.
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    How many days will they take to make my eyeglasses?
                  </div>
                  <p>
                    We promise to deliver your purchases to you as quickly as
                    possible. We dispatch your order within ~5-12 days of order
                    confirmation (and receipt of your prescription, if needed),
                    based on the products ordered. It takes 2-5 days to get
                    delivered to you post-dispatch, based on your location.
                  </p>
                </li>
                <li>
                  <div className="boldfont">
                    I don’t like what I have purchased! What is your return
                    policy?
                  </div>
                  <p>
                    We have a No Questions Asked Return Policy - 14 Days for
                    Eyeglasses & Contact Lenses and 7 Days for Sunglasses &
                    Clips
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faq;
