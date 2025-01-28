import { useState, useEffect } from "react";
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as HeadlessMenu,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Modal, Input, Button } from "antd";
import { Edit } from "lucide-react";
import { IoOptions } from "react-icons/io5";
import { MdAddTask, MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const { TextArea } = Input;

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [createTask, setCreateTask] = useState({
    title: "",
    note: "",
  });

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch("http://localhost:3000/tasks");
        const data = await response.json();
        const formattedTasks = data.map((task) => ({
          id: task.id,
          title: task.title,
          note: task.note,
          isChecked: false,
        }));
        setTasks(formattedTasks);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const toggleTask = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, isChecked: !task.isChecked } : task
      )
    );
  };

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  const inputClass = "bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setCreateTask({ ...createTask, [name]: value });
  };

  const taskCreation = async (e) => {
    e.preventDefault();
    if (createTask.title === "" || createTask.note === "") {
      setError("There is a missing input!");
      return;
    }
    try {
      const response = await axios.post(
        "http://localhost:3000/tasks",
        createTask
      );
      const newTask = response.data;
      console.log("Task created:", newTask);
      setTasks((prevTasks) => [...prevTasks, newTask]);
      handleCancel();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
      } else {
        console.error("Failed to delete task from API.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };
  const showeditModal = () => {
    setIsModalOpen(true);
  };
  //  const handleEditTask = async (id) =>{
  //   try {
  //     const response = await fetch(`http://localhost:3000/tasks/${id}`, {
  //       method: "DELETE",
  //     });

  //     if (response.ok) {
  //       setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  //     } else {
  //       console.error("Failed to delete task from API.");
  //     }
  //   } catch (error) {
  //     console.error("Error deleting task:", error);
  //   }
  //  }
  return (
    <>
      <div className="flex justify-between ">
        <p className="text-2xl font-semibold">Task</p>
        <div className="">
          <button
            className="flex bg-transparent w-20 md:w-24 lg:w-32  rounded justify-center border-2 border-[#262648f3] "
            onClick={showModal}
          >
            <MdAddTask size={30} color="#262648f3" width={40} />
          </button>
          <Modal
            title="Add Task"
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
          >
            <p className="text-sm font-semibold mt-4">Task Name</p>
            <TextArea
              rows={3}
              className={`${inputClass} !resize-none mb-3`}
              placeholder="Task"
              maxLength={100}
              name="title"
              value={createTask.title}
              onChange={handleChange}
              required
            />
            <TextArea
              rows={3}
              className={`${inputClass}`}
              placeholder="Note:"
              maxLength={200}
              name="note"
              value={createTask.note}
              onChange={handleChange}
              required
            />
            <p className="text-red-700">{error}</p>

            <div className="flex justify-end mt-4">
              <Button
                className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none"
                onClick={taskCreation}>
                Done
              </Button>
            </div>
          </Modal>
        </div>
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">

        <div className="bg-[#262648f3] w-auto rounded-lg h-auto p-2 text-white m-1">
          <div className="flex justify-between p-2">
            <p className="text-2xl font-semibold underline ">
              Washing of Plate
            </p>

            <HeadlessMenu as="div" className="relative inline-block text-left">
              <MenuButton className="inline-flex w-full justify-center rounded-md bg-transparent px-2 py-1 text-sm font-semibold text-gray-50 hover:text-gray-950 shadow-sm ring-2 ring-inset ring-gray-100 hover:bg-gray-100">
                <div>
                  <IoOptions size={20} />
                </div>
              </MenuButton>
              <MenuItems className="absolute z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-36 mt-2 p-1">
                <div>
                  <MenuItem>
                    {({ active }) => (
                      <>
                        <button
                          type="button"
                          className={`flex justify-between items-center px-2 py-1 text-left text-sm hover:ring-2 ring-inset ring-[#262648f3] rounded ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          <p className="pr-12">Edit Task</p>
                          <Edit size={15} />
                        </button>
                        <button
                          type="button"
                          className={`flex justify-between items-center px-2 py-1 text-left text-sm hover:ring-2 ring-inset ring-[#262648f3] rounded ${
                            active
                              ? "bg-gray-100 text-gray-900"
                              : "text-gray-700"
                          }`}
                        >
                          <p className="pr-7">Delete Task</p>
                          <MdDeleteOutline size={18} />
                        </button>
                      </>
                    )}
                  </MenuItem>
                </div>
              </MenuItems>
            </HeadlessMenu>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt
            aspernatur corporis illo officia! Officiis minima sit sed nostrum
            consequatur unde cum aut. Dolore accusantium voluptas repudiandae,
            eos ex aut laudantium.
          </p>
          <div className="flex flex-row-reverse flex-1">
            <input type="checkbox" className="" name="" id="" />
          </div>
        </div>

        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#262648f3] w-auto rounded-lg h-auto p-2 text-white m-1"
          >
            <div className="flex justify-between p-2">
              <p
                className="text-2xl font-semibold underline "
                style={{
                  textDecoration: task.isChecked ? "line-through" : "underline",
                }}
              >
                {task.title}
              </p>

              <HeadlessMenu
                as="div"
                className="relative inline-block text-left"
              >
                <MenuButton className="inline-flex w-full justify-center rounded-md bg-transparent px-2 py-1 text-sm font-semibold text-gray-50 hover:text-gray-950 shadow-sm ring-2 ring-inset ring-gray-100 hover:bg-gray-100">
                  <div>
                    <IoOptions size={20} />
                  </div>
                </MenuButton>
                <MenuItems className="absolute z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-36 mt-2 p-1">
                  <div>
                    <MenuItem>
                      {({ active }) => (
                        <>
                          <button
                            type="button"
                            className={`flex justify-between items-center px-2 py-1 text-left text-sm hover:ring-2 ring-inset ring-[#262648f3] rounded ${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            }`}
                          onClick={showeditModal}>
                            <p className="pr-12">Edit Task</p>
                            <Edit size={15} />
                          </button>
                          <Modal
                            title="Edit Task"
                            open={isModalOpen}
                            footer={null}
                            onCancel={handleCancel}
                          >
                            <p className="text-sm font-semibold mt-4">
                              Title:
                            </p>
                            <TextArea
                              rows={3}
                              placeholder="Task Name"
                              maxLength={200}
                              className={`${inputClass} !resize-none`}
                            />
                            <p className="text-sm font-semibold mt-4">
                              Note:
                            </p>
                            <TextArea
                              rows={3}
                              placeholder="Note:"
                              maxLength={200}
                              className={`${inputClass} !resize-none`}
                            />

                            <div className="flex justify-end mt-4">
                              <Button className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none">
                                Done
                              </Button>
                            </div>
                          </Modal>
                          <button
                            type="button"
                            className={`flex justify-between items-center px-2 py-1 text-left text-sm hover:ring-2 ring-inset ring-[#262648f3] rounded ${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            }`}
                            onClick={() => handleDeleteTask(task.id)}
                          >
                            <p className="pr-7">Delete Task</p>
                            <MdDeleteOutline size={18} />
                          </button>
                        </>
                      )}
                    </MenuItem>
                  </div>
                </MenuItems>
              </HeadlessMenu>
            </div>
            <p
              style={{
                textDecoration: task.isChecked ? "line-through" : "none",
              }}
              className="break-words"
            >
              {task.note}
            </p>
            <div className="flex flex-row-reverse flex-1">
              <input
                type="checkbox"
                className=""
                checked={task.isChecked}
                onChange={() => toggleTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Tasks;
