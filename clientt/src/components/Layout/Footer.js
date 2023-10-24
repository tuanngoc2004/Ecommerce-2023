import React from 'react'
import {Link} from 'react-router-dom'

const Footer = () => {
  return (
    // <div className='footer' style={{ height: '150px' }}>
    //     <h1 className='text-center'>
    //         Web LapTop @ Ngoc
    //     </h1>
    //     <p className="text-center mt-3">
    //         <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
    //         <Link to="/policy">Privacy policy</Link>
    //     </p>
    // </div>
  <>
    <div className="py-5 bg-dark">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <h4 className="text-white">E-shop</h4>
            <div
              style={{
                height: 5,
                width: 150,
                backgroundColor: "red",
                borderRadius: 20
              }}
              className="underline mb-2"
            />
            <Link to="/" style={{ color: 'white' }}>Home</Link>
            <br />
            <Link to="/about" style={{ color: 'white' }}>About</Link>
            <br />
            <Link to="/contact" style={{ color: 'white' }}>Contact</Link>
            <br />
            <Link to="/policy" style={{ color: 'white' }}>Privacy policy</Link>
          </div>
          <div className="col-md-3">
            <h4 className="text-white">Address</h4>
            <p className="text-white">
              #24, Ground Floor, 2nd street, xyz layout, VietName Ha Noi
            </p>
            <a href="tel:+091823718297" className="text-white">
              {" "}
              <id className="fa fa-phone" />
              +91 8712 87237
            </a>{" "}
            <br />
            <a href="mailto:asdm@gmail.com" className="text-white">
              {" "}
              <id className="fa fa-envelope" />
              asdm@gmail.com
            </a>
          </div>
          <div className="col-md-6">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62911.94730585721!2d105.33951980656396!3d9.766345113385697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31a0c2f4f69fd8b5%3A0xd805001c1249beb3!2zVsSpbmggSMOyYSwgVHAuIFbhu4sgVGhhbmgsIEjhuq11IEdpYW5nLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1691776453011!5m2!1svi!2s"
              className="w-100"
              height={200}
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
      <div className="py-2 bg-danger">
        <div className="text-center">
          <p className="mb-0 text-white">
            All right reserved. Copyright @{" "}
            <a
              href="https://www.youtube.com"
              target="_blank"
              className="text-white"
            />
            Ngoc
          </p>
        </div>
      </div>
    </>  
  )
}

export default Footer