import React from 'react'
import Layout from '../components/Layout/Layout'
import {BiMailSend, BiSupport} from 'react-icons/bi'
import {BiPhoneCall} from 'react-icons/bi'

const Contact = () => {
  return (
    <Layout title={"Contact Us"}>
        <div className="row contactus">
            <div className="col-md-6">
                <img src="/images/contact.jpeg" alt="contactus" style={{ width: "100%", height:"360px", objectFit:"cover" }} />
            </div>
            <div className="col-md-4">
                <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
                <p className="text-justify mt-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Eum obcaecati quisquam,
                    est consectetur, doloribus tempore voluptatem 
                </p>
                <p className="mt-3">
                    <BiMailSend /> : www.heheh@gmail.com
                </p>
                <p className="mt-3">
                    <BiPhoneCall /> : 098987812
                </p>
                <p className="mt-3">
                    <BiSupport /> : 1800-000-000 (toll free)
                </p>
            </div>
        </div>
    </Layout>    
  )
}

export default Contact