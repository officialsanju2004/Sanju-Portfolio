import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

import Swal from "sweetalert2";
import { Menu, X } from "lucide-react";

export default function AdminPanel({ setIsAdmin }) {
  const [books, setBooks] = useState([]);
  const [orders, setOrders] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [otpModal, setOtpModal] = useState({
    open: false,
    orderId: null,
    actualpayment: "",
  });
  const [otpInput, setOtpInput] = useState("");
  const [activeTab, setActiveTab] = useState("admin");
  const [subscriberList, setSubscriberList] = useState([]);

  const token = localStorage.getItem("token");
 
  const [formData, setFormData] = useState({});
  

  

 

  

  

  

   
  // Fetch books from API
  const fetchBooks = async () => {
    axios
      .get("http://localhost:8000/web/api/enquiry/enquiry-view")
      .then((res) => {
       
       
        setFormData(res.data.enquiryList);

      })
      .catch((err) => {
       
        setFormData([]);
      });
  };


 

 
  const logOut = () => {
    Swal.fire({
      title: "Do you want to Log Out?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("token"); //token removed
        setIsAdmin(false);

        Swal.fire("Log Out!!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Log Out is not performed", "", "info");
      }
    });
  };




// Delete subscriber
  const handleDeleteSubscriber = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete this message and it's details?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axios.delete(
            `http://localhost:8000/web/api/enquiry/enquiry-delete/${id}`,
            { headers: { Authorization: `Bearer ${token}` } }
          );
      
          Swal.fire("Deleted!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("Message is not deleted", "", "info");
        }
      });
    } catch (error) {
      console.error("Error deleting Message:", error);
    }
  };

const handleSendingOffers= async(email)=>{
  if(!email||!email.includes("@")){
    console.error("Invalid Email Address!");
    return;
  }
const mailLink=`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`;
window.open(mailLink,"_blank");

}




  useEffect(() => {

fetchBooks();

  }, []);

  return (
    <div className="min-h-screen  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans p-8">
     
      {/* ✅ Responsive Navbar */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/30 shadow-lg">
        <nav className="max-w-7xl mx-auto p-4 flex justify-between items-center">
          <h1 className="text-lg md:text-2xl font-extrabold text-white drop-shadow-lg ">
             Admin Control of Sanju's Portfolio
          </h1>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-4">
       
            

    
  


           
             <button
                  
                  onClick={logOut}
               className="h-10 px-4 rounded-lg text-sm font-medium bg-gradient-to-r from-red-500 to-red-700 text-white transition-all hover:scale-105"
                >
                 🚪 Logout
                </button>
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              {mobileMenuOpen ? (
                <X className="w-7 h-7 text-rose-600" />
              ) : (
                <Menu className="w-7 h-7 text-rose-600" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 space-y-3">
       
         
        



            
            <button
              onClick={logOut}
              className="w-full px-4 py-2 rounded-lg bg-red-500 text-white font-medium shadow"
            >
              🚪 Logout
            </button>
           
           
          </div>
        )}
      </header>
      <ToastContainer />
      {activeTab === "admin"  && (
        <>
          {" "}
          {/* Form Section */}
         
          {/* Books List Section */}
          <div className="mt-10 bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">📖 All Messages</h2>
            <div className="overflow-x-auto ">
              <table className="w-full  text-white ">
                <thead>
                  <tr className="bg-white/10">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Message</th>
                    <th className="p-3">Actions</th>

                   
                  </tr>
                </thead>
                <tbody className="text-center">
                  {formData.length > 0 ? (
                    formData.map((m) => (
                      <tr
                        key={m._id}
                        className="hover:bg-white/10 transition duration-200"
                      >
                        <td className="p-3">{m.name}</td>
                        <td className="p-3">{m.email}</td>
                        <td className="p-3">{m.message}</td>
                       
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteSubscriber(m._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
                          >
                            ❌ Delete
                          </button>
                             <button
                            onClick={() => handleSendingOffers(m.email)}
                            className="px-7 mx-2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                          >
                          📩 Send Offers
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-200"
                      >
                        No Messages found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) }  
      {activeTab==="Subscriber Emails" && (<> <div className="bg-white/20 backdrop-blur-md my-15 rounded-2xl p-6 shadow-lg border border-white/30 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">📖 All Images Links with Picture of Image Carousel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-center text-white">
                <thead>
                  <tr className="bg-white/10 ">
                    
                    <th className="p-3">Email</th>
                    <th className="p-3">Actions</th>

                   
                   
                  </tr>
                </thead>
                <tbody>
                  {subscriberList.length > 0 ? (
                    subscriberList.map((i) => (
                      <tr
                        key={i._id}
                        className="hover:bg-white/10 transition duration-200"
                      >
                        
                        <td className="p-3 ">{i.email}



                        </td>
                       
                        <td className="p-3">
                          <button
                            onClick={() => handleDeleteSubscriber(i._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
                          >
                            ❌ Delete
                          </button>
                          <button
                            onClick={() => handleSendingOffers(i.email)}
                            className="px-7 mx-2 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg shadow-md transition"
                          >
                          📩 Send Offers
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-200"
                      >
                        No Subscriber found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div></>)}
      {activeTab==="ImageCarousel" && (<><div className="flex items-center justify-center min-h-screen ">
    

        
             
           
             

             

        <div className="bg-white/10 backdrop-blur-lg shadow-xl rounded-2xl p-8 w-full max-w-md transition-transform duration-300 hover:scale-105">
        <h2 className="text-3xl font-bold text-center text-white mb-6">
        Enter your Admin credentials
        </h2>

        <form onSubmit={handleImageCarouselSubmit} className="space-y-5">
          {/* username */}
          <div>
            <label className="block text-gray-200 mb-2 font-medium">
            Enter the Image Url for Carousel Image
            </label>
            <input
              type="text"
              name="image"
              placeholder="Enter the url"
              value={ImageCarouselData.image}
              onChange={handleImageChange}
              className="w-full px-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-300 
              focus:ring-2 focus:ring-purple-500 focus:outline-none"
              required
            />
          </div>
        
         
        
          
          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 transition-colors duration-300 
            text-white font-semibold py-2 rounded-lg shadow-lg"
          >
          Add
          </button>
         
        </form>
          
      
      </div>
      </div>
      
         <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">📖 All Images Links with Picture of Image Carousel</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-white">
                <thead>
                  <tr className="bg-white/10">
                    
                    <th className="p-3">Image</th>
                     <th className="p-3">Actions</th>
                   
                  </tr>
                </thead>
                <tbody>
                  {ImageCarousel.length > 0 ? (
                    ImageCarousel.map((i) => (
                      <tr
                        key={i._id}
                        className="hover:bg-white/10 transition duration-200"
                      >
                        
                        <td className="p-3 ">


 <img
                  src={i.image}
                  alt="Carousel Image"
                  className="w-50 h-50 object-fill"
                />



                        </td>
                       
                        <td className="p-3">
                          <button
                            onClick={() => handleImageCarouselDelete(i._id)}
                            className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg shadow-md transition"
                          >
                            ❌ Delete
                          </button>
                         
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-6 text-gray-200"
                      >
                        No images found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
      
      
      
      
      
      
      </>)}
      
       {activeTab === "delivery"  && (
        <div className="text-white  bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white font-sans">
          <div className="p-6 min-h-screen">
            <div className="overflow-x-auto bg-white shadow-lg rounded-lg overflow-hidden  bg-white/20 rounded-2xl backdrop-blur-md shadow-lg border border-purple/30">
              <h1 className="mt-5 text-4xl font-extrabold text-white text-center mb-10 drop-shadow-lg">
                📦 Delivery Panel - BookVerse
              </h1>
              <table className="min-w-full">
                <thead className="bg-white/20 ">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">User</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Payment Method</th>
                    <th className="p-3">Address</th>

                    <th className="p-3">Phone Number</th>

                    <th className="p-3">Landmark</th>

                    <th className="p-3">Actual Payment Method</th>
                    <th className="p-3">Payment Status</th>
                    <th className="p-3">Order Status</th>
                    <th className="p-3">Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {orders.length === 0 ? (
                    <tr>
                      <td colSpan="9" className="text-center p-6 text-gray-500">
                        🚫 No Orders Found
                      </td>
                    </tr>
                  ) : (
                    orders.map((order) => (
                      <tr
                        key={order._id}
                        className="border-b text-center hover:bg-gray-50 hover:bg-white/10"
                      >
                        <td className="p-3 font-mono">{order._id.slice(-6)}</td>
                        <td className="p-3 font-semibold">
                          {order.userId?.name || "Guest"}
                        </td>
                        <td className="p-3 text-left">
                          {order.items.map((item, idx) => (
                            <div key={idx}>
                              {item.bookId?.title || "Book"} (x{item.quantity})
                            </div>
                          ))}
                        </td>
                        <td className="p-3 font-semibold">₹{order.total}</td>
                        <td className="p-3">
                          {order.paymentMethod?.toUpperCase()}
                        </td>
                        <td className="p-3">{order.address?.toUpperCase()}</td>
                        <td className="p-3">{order.phone?.toUpperCase()}</td>
                        <td className="p-3">{order.landmark?.toUpperCase()}</td>
                        <td className="p-3">
                          {order.actualpaymentMethod
                            ? order.actualpaymentMethod.toUpperCase()
                            : "--"}
                        </td>
                        <td className="p-3">
                          <span
                            className={`px-3 py-1 rounded-full text-white font-medium ${
                              order.paymentStatus === "paid"
                                ? "bg-green-500"
                                : order.paymentStatus === "pending"
                                ? "bg-yellow-500"
                                : order.paymentStatus === "failed"
                                ? "bg-red-500"
                                : "bg-gray-500"
                            }`}
                          >
                            {order.paymentStatus.toUpperCase()}
                          </span>
                        </td>
                        <td className="p-3 font-semibold">
                          {order.orderStatus.toUpperCase()}
                        </td>
                        <td className="p-3 flex flex-wrap justify-center gap-2">
                          {order.orderStatus === "placed" && (
                            <button
                              onClick={() => updateStatus(order._id, "shipped")}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-1 rounded-lg"
                            >
                              Ship
                            </button>
                          )}
                          {order.orderStatus === "shipped" && (
                            <button
                              onClick={() =>
                                updateStatus(order._id, "on-the-way")
                              }
                              className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-1 rounded-lg"
                            >
                              On the Way
                            </button>
                          )}
                          {order.orderStatus === "on-the-way" && (
                            <button
                              onClick={() =>
                                setOtpModal({
                                  open: true,
                                  orderId: order._id,
                                  actualpayment: "",
                                })
                              }
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-1 rounded-lg"
                            >
                              Deliver
                            </button>
                          )}
                          {order.orderStatus !== "delivered" &&
                            order.orderStatus !== "cancelled" && (
                              <button
                                onClick={() =>
                                  updateStatus(order._id, "cancelled")
                                }
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-lg"
                              >
                                Cancel
                              </button>
                            )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {otpModal.open && (
              <div className="fixed inset-0 flex items-center justify-center text-black bg-opacity-50 z-50 bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30 ">
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/30  p-6 rounded-lg shadow-xl w-96">
                  <h2 className="text-xl  font-bold mb-4">
                    Enter OTP to Confirm Delivery
                  </h2>

                  <input
                    type="number"
                    placeholder="Enter OTP"
                    value={otpInput}
                    onChange={(e) => setOtpInput(e.target.value)}
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                  />

                  <label className="block mb-2 font-semibold">
                    Select Actual Payment Method:
                  </label>
                  <select
                    value={otpModal.actualpayment}
                    onChange={(e) =>
                      setOtpModal({
                        ...otpModal,
                        actualpayment: e.target.value,
                      })
                    }
                    className="w-full border border-gray-300 p-2 rounded mb-4"
                  >
                    <option value="">-- Select --</option>
                    <option value="cod">Cash on Delivery</option>
                    <option value="online">Online</option>
                  </select>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() =>
                        setOtpModal({
                          open: false,
                          orderId: null,
                          actualpayment: "",
                        })
                      }
                      className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() =>
                        handleOtpSubmit(
                          orders.find((o) => o._id === otpModal.orderId)
                        )
                      }
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
