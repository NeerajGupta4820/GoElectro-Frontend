import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2"; // Import Line chart

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import dayjs from "dayjs"; // for date manipulation
import "./chart.css";
ChartJS.register(
    LineElement,
    PointElement,
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend
  );

const LineChart = ({data}) => {
  const {
    chartData,
    stockChartData,
    orderChartData,
    userAdminData,
    userMonthlyData,
    userAgeData
  } = data;
  console.log(chartData);
  
//   const [getProduct, { data: products, isLoading, error }] =
//     useGetProductMutation();
//   const [getOrder] = useGetOrderMutation();
//   const [getUser] = useGetUsersMutation();
//   const [chartData, setChartData] = useState({});
//   const [stockChartData, setStockChartData] = useState({});
//   const [orderChartData, setOrderChartData] = useState({});
//   const [userAdminData, setUserAdminData] = useState({});
//   const [userMonthlyData, setUserMonthlyData] = useState({});
//   const [userAgeData, setUserAgeData] = useState({});
//   const getRandomColor = () => {
//     const r = Math.floor(Math.random() * 256);
//     const g = Math.floor(Math.random() * 256);
//     const b = Math.floor(Math.random() * 256);
//     const a = (Math.random() * 0.5 + 0.4).toFixed(2);
//     return `rgba(${r}, ${g}, ${b}, ${a})`;
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const result = await getProduct().unwrap();
//         const order = await getOrder().unwrap();
//         const users = await getUser().unwrap();

//         processChartData(result.Products);
//         processStockChartData(result.Products);
//         processOrderStatusData(order.orders);
//         processUserAdminData(users.users);
//         processUserMonthlyData(users.users);
//         processUserAgeData(users.users);
//       } catch (err) {
//         console.error("Error in mutation:", err);
//       }
//     };
//     fetchData();
//   }, [getProduct]);

//   const processOrderStatusData = (orders) => {
//     let processingCount = 0;
//     let shippedCount = 0;
//     let deliveredCount = 0;

//     orders.forEach((order) => {
//       switch (order.status) {
//         case "Processing":
//           processingCount += 1;
//           break;
//         case "Shipped":
//           shippedCount += 1;
//           break;
//         case "Delivered":
//           deliveredCount += 1;
//           break;
//         default:
//           break;
//       }
//     });

//     setOrderChartData({
//       labels: ["Processing", "Shipped", "Delivered"],
//       datasets: [
//         {
//           label: "Order Status",
//           data: [processingCount, shippedCount, deliveredCount],
//           backgroundColor: getRandomColor(),
//           borderColor: getRandomColor(),
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   const processChartData = (products) => {
//     const categoryMap = {};
//     products &&
//       products.forEach((item) => {
//         categoryMap[item.category] =
//           (categoryMap[item.category] || 0) + item.stock;
//       });

//     const labels = Object.keys(categoryMap);
//     const stockData = Object.values(categoryMap);

//     setChartData({
//       labels,
//       datasets: [
//         {
//           label: "Stock per Category",
//           data: stockData,
//           backgroundColor: getRandomColor(),
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   const processStockChartData = (products) => {
//     let inStockCount = 0;
//     let outOfStockCount = 0;

//     products &&
//       products.forEach((item) => {
//         if (item.stock > 0) {
//           inStockCount += 1;
//         } else {
//           outOfStockCount += 1;
//         }
//       });

//     setStockChartData({
//       labels: ["In Stock", "Out of Stock"],
//       datasets: [
//         {
//           label: "Stock Status",
//           data: [inStockCount, outOfStockCount],
//           backgroundColor: getRandomColor(),
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   const processUserAdminData = (users) => {
//     let userCount = 0;
//     let adminCount = 0;

//     users.forEach((user) => {
//       if (user.role === "user") userCount += 1;
//       if (user.role === "admin") adminCount += 1;
//     });

//     setUserAdminData({
//       labels: ["Users", "Admins"],
//       datasets: [
//         {
//           label: "User vs Admin",
//           data: [userCount, adminCount],
//           backgroundColor: getRandomColor(),
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   const processUserMonthlyData = (users) => {
//     const monthlyCount = Array(6).fill(0);
//     const labels = [];

//     for (let i = 5; i >= 0; i--) {
//       const month = dayjs().subtract(i, "month").format("MMM YYYY");
//       labels.push(month);
//     }

//     users.forEach((user) => {
//       const userMonth = dayjs(user.createdAt).format("MMM YYYY");
//       const monthIndex = labels.indexOf(userMonth);
//       if (monthIndex >= 0) monthlyCount[monthIndex] += 1;
//     });

//     setUserMonthlyData({
//       labels,
//       datasets: [
//         {
//           label: "New Users per Month",
//           data: monthlyCount,
//           backgroundColor: "rgba(153, 102, 255, 0.6)",
//           borderColor: "rgba(153, 102, 255, 1)",
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   const processUserAgeData = (users) => {
//     let ageGroup1 = 0; // 18-25
//     let ageGroup2 = 0; // 26-35
//     let ageGroup3 = 0; // 36-45
//     let ageGroup4 = 0; // 46+

//     users.forEach((user) => {
//       if (user.age >= 18 && user.age <= 25) ageGroup1 += 1;
//       else if (user.age >= 26 && user.age <= 35) ageGroup2 += 1;
//       else if (user.age >= 36 && user.age <= 45) ageGroup3 += 1;
//       else if (user.age >= 46) ageGroup4 += 1;
//     });

//     setUserAgeData({
//       labels: ["18-25", "26-35", "36-45", "46+"],
//       datasets: [
//         {
//           label: "User Age Groups",
//           data: [ageGroup1, ageGroup2, ageGroup3, ageGroup4],
//           backgroundColor: getRandomColor(),
//           borderColor: "rgba(75, 192, 192, 1)",
//           borderWidth: 2,
//           fill: false,
//         },
//       ],
//     });
//   };

//   if (isLoading) return <p>Loading...</p>;
//   if (error) return <p>Error loading data.</p>;

  return (
    <div className="chart-container">
      {chartData.labels && <div className="chart-section">
        <h3>Stock Distribution per Category</h3>
        <Line data={chartData} />
      </div>}

      {stockChartData.labels && <div className="chart-section">
        <h3>Stock Status (In vs Out of Stock)</h3>
        <Line data={stockChartData} />
      </div>}

      {orderChartData.labels && <div className="chart-section">
        <h3>Order Status (Processing, Shipped, Delivered)</h3>
        <Line data={orderChartData} />
      </div>}

      {userAdminData.labels && <div className="chart-section">
        <h3>User vs Admin</h3>
        <Line data={userAdminData} />
      </div>}

      {userMonthlyData.labels && <div className="chart-section">
        <h3>New Users per Month</h3>
        <Line data={userMonthlyData} />
      </div>}

      {userAgeData.labels && <div className="chart-section">
        <h3>Users by Age Group</h3>
        <Line data={userAgeData} />
      </div>}
    </div>
  );
};

export default LineChart;
