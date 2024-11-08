import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  useGetOrderMutation,
  useGetProductMutation,
  useGetUsersMutation,
} from "../../../redux/api/chartAPI";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import dayjs from "dayjs";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

const BarChart = ({data}) => {
  const {
    chartData,
    stockChartData,
    orderChartData,
    userAdminData,
    userMonthlyData,
    userAgeData
  } = data;
  // const [getProduct, { data: products, isLoading, error }] =
  //   useGetProductMutation();
  // const [getOrder] = useGetOrderMutation();
  // const [getUser] = useGetUsersMutation();
  // const [chartData, setChartData] = useState({});
  // const [stockChartData, setStockChartData] = useState({});
  // const [orderChartData, setOrderChartData] = useState({});
  // const [userAdminData, setUserAdminData] = useState({});
  // const [userMonthlyData, setUserMonthlyData] = useState({});
  // const [userAgeData, setUserAgeData] = useState({});

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const result = await getProduct().unwrap();
  //       const order = await getOrder().unwrap();
  //       const users = await getUser().unwrap();

  //       console.log(users);

  //       processChartData(result.Products);
  //       processStockChartData(result.Products);
  //       processOrderStatusData(order.orders);
  //       processUserAdminData(users.users);
  //       processUserMonthlyData(users.users);
  //       processUserAgeData(users.users);
  //     } catch (err) {
  //       console.error("Error in mutation:", err);
  //     }
  //   };
  //   fetchData();
  // }, [getProduct]);

  // const processOrderStatusData = (orders) => {
  //   let processingCount = 0;
  //   let shippedCount = 0;
  //   let deliveredCount = 0;

  //   orders.forEach((order) => {
  //     switch (order.status) {
  //       case "Processing":
  //         processingCount += 1;
  //         break;
  //       case "Shipped":
  //         shippedCount += 1;
  //         break;
  //       case "Delivered":
  //         deliveredCount += 1;
  //         break;
  //       default:
  //         break;
  //     }
  //   });

  //   setOrderChartData({
  //     labels: ["Processing", "Shipped", "Delivered"],
  //     datasets: [
  //       {
  //         label: "Order Status",
  //         data: [processingCount, shippedCount, deliveredCount],
  //         backgroundColor: [
  //           "rgba(255, 205, 86, 0.6)",
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(75, 192, 192, 0.6)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 205, 86, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(75, 192, 192, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processChartData = (products) => {
  //   // Group stocks by category
  //   const categoryMap = {};

  //   products &&
  //     products.forEach((item) => {
  //       categoryMap[item.category] =
  //         (categoryMap[item.category] || 0) + item.stock;
  //     });

  //   // Prepare data for Chart.js
  //   const labels = Object.keys(categoryMap);
  //   const stockData = Object.values(categoryMap);

  //   setChartData({
  //     labels,
  //     datasets: [
  //       {
  //         label: "Stock per Category",
  //         data: stockData,
  //         backgroundColor: "rgba(75, 192, 192, 0.6)",
  //         borderColor: "rgba(75, 192, 192, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processStockChartData = (products) => {
  //   let inStockCount = 0;
  //   let outOfStockCount = 0;

  //   products &&
  //     products.forEach((item) => {
  //       if (item.stock > 0) {
  //         inStockCount += 1;
  //       } else {
  //         outOfStockCount += 1;
  //       }
  //     });

  //   setStockChartData({
  //     labels: ["In Stock", "Out of Stock"],
  //     datasets: [
  //       {
  //         label: "Stock Status",
  //         data: [inStockCount, outOfStockCount],
  //         backgroundColor: [
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(255, 99, 132, 0.6)",
  //         ],
  //         borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserAdminData = (users) => {
  //   let userCount = 0;
  //   let adminCount = 0;

  //   users.forEach((user) => {
  //     if (user.role === "user") userCount += 1;
  //     if (user.role === "admin") adminCount += 1;
  //   });

  //   setUserAdminData({
  //     labels: ["Users", "Admins"],
  //     datasets: [
  //       {
  //         label: "User vs Admin",
  //         data: [userCount, adminCount],
  //         backgroundColor: [
  //           "rgba(75, 192, 192, 0.6)",
  //           "rgba(255, 99, 132, 0.6)",
  //         ],
  //         borderColor: ["rgba(75, 192, 192, 1)", "rgba(255, 99, 132, 1)"],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserMonthlyData = (users) => {
  //   const monthlyCount = Array(6).fill(0);
  //   const labels = [];

  //   for (let i = 5; i >= 0; i--) {
  //     const month = dayjs().subtract(i, "month").format("MMM YYYY");
  //     labels.push(month);
  //   }

  //   users.forEach((user) => {
  //     const userMonth = dayjs(user.createdAt).format("MMM YYYY");
  //     const monthIndex = labels.indexOf(userMonth);
  //     if (monthIndex >= 0) monthlyCount[monthIndex] += 1;
  //   });

  //   setUserMonthlyData({
  //     labels,
  //     datasets: [
  //       {
  //         label: "New Users per Month",
  //         data: monthlyCount,
  //         backgroundColor: "rgba(153, 102, 255, 0.6)",
  //         borderColor: "rgba(153, 102, 255, 1)",
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // const processUserAgeData = (users) => {
  //   let ageGroup1 = 0; // 18-25
  //   let ageGroup2 = 0; // 26-35
  //   let ageGroup3 = 0; // 36-45
  //   let ageGroup4 = 0; // 46+

  //   users.forEach((user) => {
  //     if (user.age >= 18 && user.age <= 25) ageGroup1 += 1;
  //     else if (user.age >= 26 && user.age <= 35) ageGroup2 += 1;
  //     else if (user.age >= 36 && user.age <= 45) ageGroup3 += 1;
  //     else if (user.age >= 46) ageGroup4 += 1;
  //   });

  //   setUserAgeData({
  //     labels: ["18-25", "26-35", "36-45", "46+"],
  //     datasets: [
  //       {
  //         label: "User Age Groups",
  //         data: [ageGroup1, ageGroup2, ageGroup3, ageGroup4],
  //         backgroundColor: [
  //           "rgba(255, 99, 132, 0.6)",
  //           "rgba(54, 162, 235, 0.6)",
  //           "rgba(255, 206, 86, 0.6)",
  //           "rgba(75, 192, 192, 0.6)",
  //         ],
  //         borderColor: [
  //           "rgba(255, 99, 132, 1)",
  //           "rgba(54, 162, 235, 1)",
  //           "rgba(255, 206, 86, 1)",
  //           "rgba(75, 192, 192, 1)",
  //         ],
  //         borderWidth: 1,
  //       },
  //     ],
  //   });
  // };

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data.</p>;

  return (
    <div style={{ width: "80%", margin: "auto", padding: "20px" }}>
  {/* Stock Distribution per Category Chart */}
  {chartData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Stock Distribution per Category
      </h3>
      <Bar
        data={chartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Stock Distribution per Category",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}

  {/* In Stock vs Out of Stock Chart */}
  {stockChartData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        In Stock vs Out of Stock
      </h3>
      <Bar
        data={stockChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "In Stock vs Out of Stock",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}

  {/* Order Status Distribution Chart */}
  {orderChartData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        Order Status Distribution
      </h3>
      <Bar
        data={orderChartData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "Order Status Distribution",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}

  {/* User vs Admin Count Chart */}
  {userAdminData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        User vs Admin Count
      </h3>
      <Bar
        data={userAdminData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "User vs Admin Count",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}

  {/* New Users in Last 6 Months Chart */}
  {userMonthlyData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        New Users in Last 6 Months
      </h3>
      <Bar
        data={userMonthlyData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "New Users in Last 6 Months",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}

  {/* User Age Group Distribution Chart */}
  {userAgeData.labels && (
    <div style={{ marginBottom: "40px" }}>
      <h3 style={{ textAlign: "center", marginBottom: "20px", color: "#333" }}>
        User Age Group Distribution
      </h3>
      <Bar
        data={userAgeData}
        options={{
          responsive: true,
          plugins: {
            legend: { position: "top" },
            title: {
              display: true,
              text: "User Age Group Distribution",
              font: {
                size: 18,
                family: "'Arial', sans-serif",
                weight: "bold",
              },
            },
          },
        }}
      />
    </div>
  )}
</div>

  );
};

export default BarChart;
