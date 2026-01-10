import HomeLayout from "../../Layouts/HomeLayout";
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Tooltip,
  Legend,
  LinearScale,
  Title
} from "chart.js";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteCourse, getAllCourses } from "../../Redux/Slices/CourseSlice";
import { getStatsData } from "../../Redux/Slices/StatSlice";
import { getPaymentRecord } from "../../Redux/Slices/RazorpaySlice";

import { FaUsers } from "react-icons/fa";
import { FcSalesPerformance } from "react-icons/fc";
import { BsCollectionPlayFill, BsTrash } from "react-icons/bs";
import { GiMoneyStack } from "react-icons/gi";

import { Bar, Pie } from "react-chartjs-2";

ChartJs.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Tooltip,
  Legend,
  Title,
  LinearScale
);

function AdminDashboard() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ✅ SAFE SELECTORS (NO undefined / NaN)
  const { allUsersCount = 0, subscribedCount = 0 } =
    useSelector((state) => state.stat || {});

  const { allPayments = {}, monthlySalesRecord = [] } =
    useSelector((state) => state.razorpay || {});

  const myCourses = useSelector(
    (state) => state?.course?.courseData || []
  );

  // ✅ SAFE CHART DATA
  const userData = {
    labels: ["Registered Users", "Subscribed Users"],
    datasets: [
      {
        label: "User Details",
        data: [allUsersCount || 0, subscribedCount || 0],
        backgroundColor: ["yellow", "green"],
        borderWidth: 1,
        borderColor: ["yellow", "green"]
      }
    ]
  };

  const salesData = {
    labels: [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ],
    datasets: [
      {
        label: "Sales / Month",
        data: Array.isArray(monthlySalesRecord)
          ? monthlySalesRecord
          : [],
        backgroundColor: "red",
        borderColor: "white",
        borderWidth: 2
      }
    ]
  };

  // ✅ COURSE DELETE HANDLER
  async function onCourseDelete(id) {
    if (window.confirm("Are you sure you want to delete this course?")) {
      const res = await dispatch(deleteCourse(id));
      if (res?.payload?.success) {
        dispatch(getAllCourses());
      }
    }
  }

  // ✅ LOAD DASHBOARD DATA
  useEffect(() => {
    (async () => {
      await dispatch(getAllCourses());
      await dispatch(getStatsData());
      await dispatch(getPaymentRecord());
    })();
  }, [dispatch]);

  return (
    <HomeLayout>
      <div className="min-h-[90vh] pt-5 flex flex-col gap-10 text-white">
        <h1 className="text-center text-5xl font-semibold text-yellow-500">
          Admin Dashboard
        </h1>

        {/* ===================== CHARTS ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mx-10">
          {/* USERS PIE */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="w-80 h-80">
              <Pie data={userData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 rounded-md shadow-md">
                <div>
                  <p className="font-semibold">Registered Users</p>
                  <h3 className="text-4xl font-bold">
                    {allUsersCount || 0}
                  </h3>
                </div>
                <FaUsers className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 rounded-md shadow-md">
                <div>
                  <p className="font-semibold">Subscribed Users</p>
                  <h3 className="text-4xl font-bold">
                    {subscribedCount || 0}
                  </h3>
                </div>
                <FaUsers className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>

          {/* SALES BAR */}
          <div className="flex flex-col items-center gap-10 p-5 shadow-lg rounded-md">
            <div className="h-80 w-full">
              <Bar data={salesData} />
            </div>

            <div className="grid grid-cols-2 gap-5 w-full">
              <div className="flex items-center justify-between p-5 rounded-md shadow-md">
                <div>
                  <p className="font-semibold">Total Subscriptions</p>
                  <h3 className="text-4xl font-bold">
                    {allPayments?.count || 0}
                  </h3>
                </div>
                <FcSalesPerformance className="text-yellow-500 text-5xl" />
              </div>

              <div className="flex items-center justify-between p-5 rounded-md shadow-md">
                <div>
                  <p className="font-semibold">Total Revenue</p>
                  <h3 className="text-4xl font-bold">
                    ₹ {(allPayments?.count || 0) * 499}
                  </h3>
                </div>
                <GiMoneyStack className="text-green-500 text-5xl" />
              </div>
            </div>
          </div>
        </div>

        {/* ===================== COURSES ===================== */}
        <div className="mx-[10%] mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-3xl font-semibold">Courses Overview</h2>
            <button
              onClick={() => navigate("/course/create")}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded font-semibold"
            >
              Create New Course
            </button>
          </div>

          <table className="table w-full">
            <thead>
              <tr>
                <th>#</th>
                <th>Title</th>
                <th>Category</th>
                <th>Instructor</th>
                <th>Lectures</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCourses.length > 0 ? (
                myCourses.map((course, idx) => (
                  <tr key={course._id}>
                    <td>{idx + 1}</td>
                    <td>{course?.title}</td>
                    <td>{course?.category}</td>
                    <td>{course?.createdBy}</td>
                    <td>{course?.numberOfLectures || 0}</td>
                    <td className="max-w-xs truncate">
                      {course?.description}
                    </td>
                    <td className="flex gap-3">
                      <button
                        onClick={() =>
                          navigate("/course/displaylectures", {
                            state: { ...course }
                          })
                        }
                        className="bg-green-500 px-3 py-2 rounded text-white"
                      >
                        <BsCollectionPlayFill />
                      </button>
                      <button
                        onClick={() => onCourseDelete(course._id)}
                        className="bg-red-500 px-3 py-2 rounded text-white"
                      >
                        <BsTrash />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center py-5">
                    No courses found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </HomeLayout>
  );
}

export default AdminDashboard;
