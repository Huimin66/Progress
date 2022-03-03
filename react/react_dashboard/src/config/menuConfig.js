import {HomeOutlined,AppstoreAddOutlined,BarsOutlined,ToolOutlined,UserOutlined,SafetyOutlined,AreaChartOutlined,BarChartOutlined,PieChartFilled,LineChartOutlined} from '@ant-design/icons';

const menuList = [
  {
    title: "Home", 
    key: "/home", 
    icon: <HomeOutlined/>, 
  },
  {
    title: "Products",
    key: "/products",
    icon: <AppstoreAddOutlined />,
    children: [
      {
        title: "Category Management",
        key: "/category",
        icon: <BarsOutlined />,
      },
      {
        title: "Product Management",
        key: "/product",
        icon: <ToolOutlined />,
      },
    ],
  },
  {
    title: "User",
    key: "/user",
    icon: <UserOutlined />,
  },
  {
    title: "Role",
    key: "/role",
    icon: <SafetyOutlined />,
  },
  {
    title: "Charts",
    key: "/charts",
    icon: <AreaChartOutlined/>,
    children: [
      {
        title: "Bar",
        key: "/charts/bar",
        icon: <BarChartOutlined/>,
      },
      {
        title: "Line",
        key: "/charts/line",
        icon: <LineChartOutlined/>,
      },
      {
        title: "Pie",
        key: "/charts/pie",
        icon: <PieChartFilled/>,
      },
    ],
  },
];
export default menuList;
