import { useState, useEffect } from "react";
import {
  MenuButton,
  MenuItem,
  MenuItems,
  Menu as HeadlessMenu,
} from "@headlessui/react";
import { Modal, Input, Button } from "antd";
import { Edit, MailWarningIcon } from "lucide-react";
import { IoOptions } from "react-icons/io5";
import { MdAddTask, MdDeleteOutline } from "react-icons/md";
import axios from "axios";

const { TextArea } = Input;

const Tasks = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [dltMessgaeIsOpen, setDltMessgaeIsOpen] = useState(false);

  const [createTask, setCreateTask] = useState({ title: "", note: "" });
  const [editTask, setEditTask] = useState(null);
  const [deleteTaskId, setDeleteTaskId] = useState(null);

  const showeditModal = (task) => {
    setEditTask(task);
    setIsEditModalOpen(true);
  };

  const handleEditCancel = () => {
    setIsEditModalOpen(false);
    setEditTask(null);
  };

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => setIsModalOpen(false);

  const showDltMessage = (taskId) => {
    setDeleteTaskId(taskId);
    setDltMessgaeIsOpen(true);
  };

  const handleDltCancel = () => {
    setDltMessgaeIsOpen(false);
    setDeleteTaskId(null);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setLoading(true);
        const response = await fetch("http://localhost:5000/tasks");
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

  const inputClass =
    "bg-[#F6F6F6] hover:!bg-[#F6F6F6] focus:!bg-[#F6F6F6] border-none";

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
        "http://localhost:5000/tasks",
        createTask
      );
      const newTask = response.data;
      setTasks((prevTasks) => [...prevTasks, newTask]);
      setCreateTask({ title: "", note: "" });
      handleCancel();
    } catch (error) {
      console.error("Error creating task:", error);
      setError("Failed to create task. Please try again.");
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:5000/tasks/${editTask.id}`,
        editTask
      );
      const updated = response.data;
      setTasks((prev) =>
        prev.map((task) => (task.id === updated.id ? updated : task))
      );
      setIsEditModalOpen(false);
      setEditTask(null);
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        handleDltCancel();
      } else {
        console.error("Failed to delete task from API.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <>
      <div className="flex justify-between ">
        <p className="text-2xl font-semibold">Task</p>
        <button
          className="flex bg-transparent w-20 md:w-24 lg:w-32 rounded justify-center border-2 border-[#262648f3]"
          onClick={showModal}
        >
          <MdAddTask size={30} color="#262648f3" width={40} />
        </button>
        <Modal title="Add Task" open={isModalOpen} footer={null} onCancel={handleCancel}>
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
              onClick={taskCreation}
            >
              Done
            </Button>
          </div>
        </Modal>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-1">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="bg-[#262648f3] w-auto rounded-lg h-auto p-2 text-white m-1"
          >
            <div className="flex justify-between p-2">
              <p
                className="text-2xl font-semibold underline"
                style={{
                  textDecoration: task.isChecked
                    ? "line-through"
                    : "underline",
                }}
              >
                {task.title}
              </p>

              <HeadlessMenu as="div" className="relative inline-block text-left">
                <MenuButton className="inline-flex justify-center rounded-md bg-transparent px-2 py-1 text-sm font-semibold text-white hover:text-black shadow-sm ring-2 ring-inset ring-white hover:bg-gray-100">
                  <IoOptions size={20} />
                </MenuButton>
                <MenuItems className="absolute z-10 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none w-36 mt-2 p-1">
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`flex justify-between items-center px-2 py-1 text-left text-sm rounded ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                        onClick={() => showeditModal(task)}
                      >
                        <p className="pr-12">Edit Task</p>
                        <Edit size={15} />
                      </button>
                    )}
                  </MenuItem>
                  <MenuItem>
                    {({ active }) => (
                      <button
                        type="button"
                        className={`flex justify-between items-center px-2 py-1 text-left text-sm rounded ${
                          active ? "bg-gray-100 text-gray-900" : "text-gray-700"
                        }`}
                        onClick={() => showDltMessage(task.id)}
                      >
                        <p className="pr-7">Delete Task</p>
                        <MdDeleteOutline size={18} />
                      </button>
                    )}
                  </MenuItem>
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
                checked={task.isChecked}
                onChange={() => toggleTask(task.id)}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Task"
        open={isEditModalOpen}
        footer={null}
        onCancel={handleEditCancel}
      >
        <p className="text-sm font-semibold mt-4">Title:</p>
        <TextArea
          rows={3}
          name="title"
          value={editTask?.title || ""}
          onChange={handleEditChange}
          placeholder="Task Name"
          className={`${inputClass} !resize-none`}
        />
        <p className="text-sm font-semibold mt-4">Note:</p>
        <TextArea
          rows={3}
          name="note"
          value={editTask?.note || ""}
          onChange={handleEditChange}
          placeholder="Note:"
          className={`${inputClass} !resize-none`}
        />
        <div className="flex justify-end mt-4">
          <Button className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none" onClick={handleEditSave}>
            Save
          </Button>
        </div>
      </Modal>

      {/* Delete Modal */}
      <Modal
        title="Delete Task"
        open={dltMessgaeIsOpen}
        footer={null}
        onCancel={handleDltCancel}
      >
        <div className="flex">
          <MailWarningIcon className="mr-4" size={30} />
          <div>
            <div className="text-xl font-medium text-black">Warning</div>
            <p className="text-slate-500">Do you want to <b>DELETE</b> this task?</p>
          </div>
        </div>
        <div className="flex justify-evenly mt-3">
          <Button onClick={handleDltCancel} className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none">
            Cancel
          </Button>
          <Button onClick={() => handleDeleteTask(deleteTaskId)} className="text-white bg-[#262648f3] rounded-full hover:!bg-white px-7 py-5 outline-none">
            Ok
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Tasks;
