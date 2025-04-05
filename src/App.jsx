import React, { useState, useEffect } from "react";
import Data from './course.json';
function App() {
  const [coursedetails, setcoursedetails] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [totalCreditHours, setTotalCreditHours] = useState(20);
  const [totalPrice, setTotalPrice] = useState(0);
  // const originalCreditLimit = 20;

  // useEffect(() => {
  //   const fetchCourse = async () => {
  //     const response = await fetch("https://mocki.io/v1/c7d701a9-1f0e-4c6e-b414-1cf94f2c9a59");
  //     const data = await response.json();
  //     setcoursedetails(data.coursedetails);
  //   }

  //   fetchCourse();
  // }, []);
 useEffect(() => {
    setcoursedetails(Data.coursedetails);
  }, []);

  const handleCourseSelection = (course) => {
    const isSelected = selectedCourses.some(selectedCourse => selectedCourse.id === course.id);
  
    if (isSelected) {
      // Deselect the course
      const updatedCourses = selectedCourses.filter(selectedCourse => selectedCourse.id !== course.id);
      setSelectedCourses(updatedCourses);
      setTotalCreditHours(totalCreditHours + parseInt(course.credit));
      setTotalPrice(prevTotalPrice => prevTotalPrice - parseFloat(course.price));
    } else {
      // Select the course
      const nextTotalCreditHours = totalCreditHours - parseInt(course.credit);
      if (nextTotalCreditHours < 0) {
        alert("Not enough credit left. Please customize your course.");
        return;
      }
      setSelectedCourses([...selectedCourses, course]);
      setTotalCreditHours(nextTotalCreditHours);
      setTotalPrice(prevTotalPrice => prevTotalPrice + parseFloat(course.price));
    }

  };
  


  return (
    <>
      <section className="px-4 py-10">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-gr mb-6 text-center">
            Course Registration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

            <div className="col-span-3 grid grid-cols-1 md:grid-cols-3 gap-6">

              {coursedetails.map((coursedetail, index) => (

                <div key={coursedetails[index].id} className="bg-white rounded-xl drop-shadow-lg relative">
                  <div className="p-4">
                    <div className="mb-6">
                      {/* here lays down img  */}
                      <div className="text-gray-600 my-2">
                        <img src={coursedetails[index].image} alt="image" />
                      </div>
                      {/* Here lays downs titles */}
                      <h3 className="text-xl font-bold">{coursedetails[index].title}</h3>
                    </div>
                    {/* here lays downs paragraph */}
                    <div className="mb-5">
                      {coursedetails[index].description}
                    </div>

                    <div className="flex flex-col lg:flex-row justify-between mb-4">
                      <div className="mb-3">
                        Price : {coursedetails[index].price}
                      </div>

                      <h3 className="mb-2">Credit : {coursedetails[index].credit}hr</h3>

                    </div>
                    <div className="flex justify-center mb-5">
                      <button
                        onClick={() => handleCourseSelection(coursedetail)}
                        className="btn-s h-[36px] bg-blue-500 hover:bg-blue-600 text-white w-full py-2 rounded-lg text-center text-sm"
                      >
                        {selectedCourses.some(course => course.id === coursedetail.id) ? "Deselect Course" : "Select Course"}
                      </button>

                    </div>

                  </div>
                </div>

              ))}
            </div>

            <div className="order-first md:order-last">
              <div className="bg-white rounded-xl shadow-md relative">
                <div className="p-4">

                  <div className="text-blue-600 text-lg my-2">Credit Hour Remaining {totalCreditHours}hr</div>
                  <h3 className="text-xl font-bold">Course Name</h3>


                  <div className="mb-5">
                    <ol>
                      {selectedCourses.map((course, index) => (
                        <li key={index}>{course.title}</li>
                      ))}
                    </ol>
                  </div>

                  <div className="border border-gray-100 mb-5"></div>

                  <h3 className="text-black mb-2">Total Credit Hour : {20 - totalCreditHours}</h3>

                  <div className="border border-gray-100 mb-5"></div>


                  <div className="text-black mb-3">
                    Total Price : {totalPrice} USD
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default App;
