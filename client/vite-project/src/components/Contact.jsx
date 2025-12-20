import { useEffect, useState} from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {  FiSend, FiMapPin, FiPhone, FiMail } from 'react-icons/fi';
import { FaLinkedinIn, FaGithub, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import axios from 'axios';

import { toast, ToastContainer } from 'react-toastify';



  export default function Contact () {
    const [ref, inView] = useInView({
      threshold: 0.1,
      triggerOnce: false,
    });
let [enquiryList, setEnquiryList] = useState([]);
  
  let [formData, setFormData] = useState({
    name: "",
    email: "",
   
    message: "",
  });

  let saveEnquiry = (e) => {
    e.preventDefault();
    if(!formData.email.endsWith("@gmail.com")){
      toast.error("incorrect email!!");
      return;
    }
 setIsSubmitting(true);
      
     
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
    axios
      .post("http://localhost:8000/web/api/enquiry/enquiry-insert", formData)
      .then((res) => {
       
        toast.success("Message Sent!!!");
 

        setFormData({ name: "", email: "",  message: "" });
      });
       setTimeout(() => setSubmitStatus(null), 5000);
      }, 2000);
  };

  let getAllEnquiries = () => {
    axios
      .get("http://localhost:8000/web/api/enquiry/enquiry-view")
      .then((res) => {
        if (res.data.status === 1) {
          setEnquiryList(res.data.enquiryList);
        } else {
         
        }
      })
      .catch((err) => {
       
      });
  };
  
  let getValue = (e) => {
    let inputName = e.target.name;
    let inputValue = e.target.value;
    let oldData = { ...formData };
 
    
    oldData[inputName] = inputValue;
    setFormData(oldData);
  };

  useEffect(() => {
    getAllEnquiries();
  }, []);
    const containerVariants = {

      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.2,
        },
      },
    };

    const itemVariants = {
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
      },
    };


    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({
        ...formData,
        [name]: value,
      });
    };

    const handleSubmit = (e) => {
      e.preventDefault();
      setIsSubmitting(true);
      
     
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitStatus('success');
        setFormData({ name: '', email: '', message: '' });
        
        
        setTimeout(() => setSubmitStatus(null), 5000);
      }, 2000);
    };

    const contactInfo = [
      {
        icon: <FiMapPin size={24} />,
        title: 'Location',
        value: 'Amritsar, Punjab, India',
      },
      {
        icon: <FiMail size={24} />,
        title: 'Email',

        value: 'godsanju21@gmail.com',
      },
      {
        icon: <FiPhone size={24} />,
        title: 'Phone',
        value: '+91 9877583155',
      },
    ];

    return (
      <section id="contact" ref={ref} className="py-20 bg-white dark:bg-gray-900">
        <ToastContainer/>
        <motion.div
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          variants={containerVariants}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <motion.div variants={itemVariants} 

className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In <span className="text-indigo-600">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-indigo-600 mx-auto mb-6"></div>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Have a project in mind or want to discuss potential opportunities?
              Feel free to contact me using the form below or through any of my
              contact information.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div variants={itemVariants}>
              <form onSubmit={saveEnquiry} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}

                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                    >
                      Your Email
                    </label>
                    <input
                      type="email"

                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="Enter your message"
                  ></textarea>

                </div>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 flex items-center gap-2"
                >
                  <FiSend size={18} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
                {submitStatus === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}

                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-lg mt-4"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </motion.div>
                )}
              </form>
            </motion.div>

            <motion.div variants={itemVariants}>
              <div className="bg-gray-50 dark:bg-gray-800 p-8 rounded-2xl shadow-md h-full">
                <h3 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">
                  Contact Information

                </h3>
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 mr-4">
                        {info.icon}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-700 dark:text-gray-300">
                          {info.title}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400">
                          {info.value}
                        </p>
                      </div>

                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 mb-4">
                    Follow Me
                  </h4>
                  <div className="flex space-x-4">
                    {[
                      { icon: <FaLinkedinIn size={18} />, href: 'https://www.linkedin.com/in/sanju-singh-a36776380?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app' },
                      { icon: <FaGithub size={18} />, href: 'https://github.com/officialsanju2004' },
                      { icon: <FaWhatsapp size={18} />, href: 'https://wa.me/919877583155',target:"_blank" , rel:"noopener noreferrer" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}

                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -3, scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-indigo-600 hover:text-white transition-colors"
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

    );
  };