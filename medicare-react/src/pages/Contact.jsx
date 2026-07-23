import React from 'react';

const Contact = () => {
  return (
    <>
      <section className="hero mt-5 pt-5" style={{ background: "linear-gradient(135deg, rgba(0, 150, 136, 0.9) 0%, rgba(77, 182, 172, 0.8) 100%), url('https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1600&q=80') center/cover no-repeat", minHeight: "40vh", borderRadius: "0 0 30px 30px" }}>
        <div className="container text-center text-white">
          <h1 className="display-3 fw-bold mb-3" style={{textShadow: '0 4px 10px rgba(0,0,0,0.2)'}}>Contact Us</h1>
          <p className="lead" style={{opacity: 0.9}}>We're here to help you 24/7. Reach out to our support team.</p>
        </div>
      </section>

      <section className="py-5">
        <div className="container">
          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <h4 className="fw-bold mb-3">Address</h4>
                <p className="text-muted mb-0">
                  123 Health Street<br />
                  Chennai, Tamil Nadu<br />
                  India - 600001
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-phone"></i>
                </div>
                <h4 className="fw-bold mb-3">Phone</h4>
                <p className="text-muted mb-0">
                  +91 98765 43210<br />
                  +91 91234 56789
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 p-4 text-center rounded-4">
                <div className="card-icon mx-auto">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <h4 className="fw-bold mb-3">Email</h4>
                <p className="text-muted mb-0">
                  support@medicareplus.com<br />
                  info@medicareplus.com
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-5">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="card shadow-lg p-5 border-0 rounded-4">
                <h3 className="fw-bold mb-4 text-center">Send Us a Message</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Message sent!'); }}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <input type="text" className="form-control" placeholder="Your Name" required />
                    </div>
                    <div className="col-md-6">
                      <input type="email" className="form-control" placeholder="Your Email" required />
                    </div>
                    <div className="col-12">
                      <input type="text" className="form-control" placeholder="Subject" />
                    </div>
                    <div className="col-12">
                      <textarea className="form-control" rows="5" placeholder="Your Message" required></textarea>
                    </div>
                    <div className="col-12 d-grid mt-4">
                      <button type="submit" className="btn btn-primary btn-lg rounded-pill fw-bold">
                        <i className="fa-solid fa-paper-plane me-2"></i>Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="card shadow-lg overflow-hidden h-100 border-0 rounded-4">
                <iframe src="https://maps.google.com/maps?q=Chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                  width="100%" height="100%" style={{ border: 0, minHeight: "400px" }} allowFullScreen title="Map">
                </iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
