import { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Button, Modal, Input } from "antd";
import {
  Menu as HeadlessMenu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { LucideHome } from "lucide-react";
import { LuGlobe } from "react-icons/lu";
import { IoNotificationsOutline } from "react-icons/io5";
import { MdAddTask } from "react-icons/md";
import { MdTaskAlt } from "react-icons/md";
const { TextArea } = Input;

const { Sider, Content, Header } = Layout;

function getItem(label, key, icon) {
  return {
    key,
    icon,
    label,
  };
}
const items = [
  getItem("Overview", "/overview", <LucideHome />),
  getItem("Tasks", "/tasks", <MdTaskAlt size={20} color="#ffffff" />),
  getItem("Tasks", "/task", <MdTaskAlt size={20} color="#ffffff" />),
];

const OverviewLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [Username, setUsername] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleMenuClick = (e) => navigate(e.key);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const inputClass =
    "bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleResize = () => {
    setCollapsed(window.innerWidth < 1020);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    try {
      const loggedUser = JSON.parse(localStorage.getItem("user"));
      if (loggedUser && loggedUser.username) {
        setUsername(loggedUser.username);
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      console.error("Failed to parse user data:", error);
      window.location.href = "/";
    }
  }, []);
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={setCollapsed}
          className="bg-[#262648] fixed left-0 top-0 bottom-0"
          width={250}
          style={{ zIndex: 1000 }}
        >
          <div className="p-4 flex items-center justify-center">
            <div className="text-3xl font-extrabold ">
              <Link to="/">
                <span className="text-[#fffffff3] p-1 text-">TO</span>
                <span className="text-[#262648f3] bg-[#fffffff3] rounded p-1">
                  DO
                </span>
              </Link>
            </div>
          </div>
          <Menu
            theme="dark"
            className="bg-[#262648f3] overflow-hidden hover:overflow-auto max-h-[calc(100vh-170px)] scroll-smooth"
            selectedKeys={[location.pathname]}
            mode="inline"
            items={items}
            onClick={handleMenuClick}
          />
          <div className="btn flex justify-center">
            <button
              className="flex bg-[#fffffff3] w-32 rounded justify-center font-normal hover:font-bold my-3"
              onClick={showModal}
            >
              <MdAddTask size={30} color="#262648f3" width={40} />
            </button>
          </div>
          <Modal
            title="Add Task Page"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <p className="text-sm font-semibold mt-4">Page Name</p>
            <TextArea
              rows={3}
              placeholder="Page Name"
              maxLength={200}
              className={`${inputClass} !resize-none`}
            />

            <div className="flex justify-end mt-4">
              <Button className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none">
                Submit
              </Button>
            </div>
          </Modal>
        </Sider>

        <Layout style={{ marginLeft: collapsed ? 80 : 250 }}>
          <Header
            className="bg-white fixed top-0 left-0 right-0 flex items-center w-full"
            style={{ zIndex: 900, paddingLeft: collapsed ? 80 : 250 }}
          >
            <div className="flex justify-end items-center w-full">
              <div></div>
              <div className="flex gap-3">
                <div className="icon-container">
                  <LuGlobe />
                </div>
                <div className="icon-container">
                  <IoNotificationsOutline />
                </div>
              </div>
              <HeadlessMenu
                as="div"
                className="relative inline-block text-left"
              >
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 ml-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                  <div>
                    {Username ? (
                      <h3>Welcome, {Username}!</h3>
                    ) : (
                      <h3>Welcome, Stranger!</h3>
                    )}
                  </div>
                  <ChevronDownIcon
                    className="h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </MenuButton>
                <MenuItems className="absolute z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                  <div>
                    <MenuItem>
                      {({ active }) => (
                        <button
                          type="button"
                          className={`block px-4 py-2 text-left text-sm ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                          onClick={handleLogout}
                        >
                          Sign out
                        </button>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </HeadlessMenu>
            </div>
          </Header>
          <Content className="p-3" style={{ marginTop: 64 }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default OverviewLayout;
