import { inputStyles } from "@/lib/constansts";
import Modal from "../molecules/Modal";
import { useCreateProjectsMutation } from "@/lib/redux/api";
import { SubmitEvent, useState } from "react";
import { formatISO } from "date-fns";

type Props = { isOpen: boolean; onClose: () => void };

const ModalNewProject = ({ isOpen, onClose }: Props) => {
  const [createProject, { isLoading }] = useCreateProjectsMutation();

  const [projectname, setProjectname] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!projectname || !startDate || !endDate) return;

    const formattedStartDate = formatISO(new Date(startDate), {
      representation: "complete",
    });
    const formattedEndDate = formatISO(new Date(endDate), {
      representation: "complete",
    });

    const newProject = await createProject({
      name: projectname,
      description,
      startDate: formattedStartDate,
      endDate: formattedEndDate,
    });

    if (newProject) {
      setProjectname("");
      setDescription("");
      setStartDate("");
      setEndDate("");
      onClose();
    }
  };

  const isFormValid = () => {
    return projectname && description && startDate && endDate;
  };
  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Project">
      <form onSubmit={handleSubmit} className="mt-4 space-y-6">
        <input
          type="text"
          placeholder="Project Name"
          value={projectname}
          onChange={(e) => setProjectname(e.target.value)}
          className={`${inputStyles}`}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`${inputStyles}`}
        />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-2">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className={`${inputStyles}`}
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className={`${inputStyles}`}
          />
        </div>
        <button
          type="submit"
          className={`bg-blue-primary mt-4 flex w-full justify-center rounded-md border border-transparent px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-600 focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:outline-none ${!isFormValid() || isLoading ? "cursor-not-allowed opacity-50" : ""}`}
          disabled={!isFormValid() || isLoading}
        >
          {isLoading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </Modal>
  );
};

export default ModalNewProject;
