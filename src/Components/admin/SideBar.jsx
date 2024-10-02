import { useEffect, useState } from "react";
import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaGamepad, FaStopwatch } from "react-icons/fa";
import { HiMenuAlt4 } from "react-icons/hi";
import { IoIosPeople } from "react-icons/io";
import { RiApps2AddFill, RiCoupon3Fill, RiShoppingBag3Fill, RiDashboardFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import "./SideBar.css";

const AdminSidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const [phoneActive, setPhoneActive] = useState(window.innerWidth < 1100);

  const resizeHandler = () => {
    setPhoneActive(window.innerWidth < 1100);
  };

  useEffect(() => {
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <>
      {phoneActive && (
        <button id="hamburger" onClick={toggleSidebar}>
          <HiMenuAlt4 />
        </button>
      )}

      <aside
        className={`sidebar ${phoneActive && !isOpen ? "collapsed" : ""}`}
      >
        <DivOne location={location} />
        <DivTwo location={location} />
        <DivThree location={location} />
        {phoneActive && (
          <button id="close-sidebar" onClick={toggleSidebar}>
            Close
          </button>
        )}
      </aside>
    </>
  );
};

const DivOne = ({ location }) => (
  <div>
    <h5>Dashboard</h5>
    <ul>
      <Li url="/dashboard" text="Dashboard" Icon={RiDashboardFill} location={location} />
      <Li url="/dashboard/product" text="Product" Icon={RiShoppingBag3Fill} location={location} />
      <Li url="/dashboard/categories" text="Category" Icon={RiApps2AddFill} location={location} />
      <Li url="/dashboard/customer" text="Customer" Icon={IoIosPeople} location={location} />
      <Li url="/dashboard/transaction" text="Transaction" Icon={AiFillFileText} location={location} />
    </ul>
  </div>
);

const DivTwo = ({ location }) => (
  <div>
    <h5>Charts</h5>
    <ul>
      <Li url="/dashboard/chart/bar" text="Bar" Icon={FaChartBar} location={location} />
      <Li url="/dashboard/chart/pie" text="Pie" Icon={FaChartPie} location={location} />
      <Li url="/dashboard/chart/line" text="Line" Icon={FaChartLine} location={location} />
    </ul>
  </div>
);

const DivThree = ({ location }) => (
  <div>
    <h5>Apps</h5>
    <ul>
      <Li url="/dashboard/app/stopwatch" text="Stopwatch" Icon={FaStopwatch} location={location} />
      <Li url="/dashboard/app/coupon" text="Coupon" Icon={RiCoupon3Fill} location={location} />
      <Li url="/dashboard/app/toss" text="Toss" Icon={FaGamepad} location={location} />
    </ul>
  </div>
);

const Li = ({ url, text, location, Icon }) => (
  <li className={location.pathname === url ? "active" : ""}>
    <Link to={url}>
      <Icon />
      {text}
    </Link>
  </li>
);

export default AdminSidebar;
