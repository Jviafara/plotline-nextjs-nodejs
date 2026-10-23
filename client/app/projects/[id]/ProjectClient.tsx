"use client";

import Board from "@/components/organisms/Board";
import List from "@/components/organisms/List";
import ModalNewTask from "@/components/organisms/ModalNewTask";
import ProjectHeader from "@/components/organisms/ProjectHeader";
import TableView from "@/components/organisms/TableView";
import TimeLine from "@/components/organisms/TimeLine";
import { use, useState } from "react";

type Props = {
  params: Promise<{ id: string }>;
};

const ProjectClient = ({ params }: Props) => {
  const { id } = use(params);

  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <div>
      {/* Modal New Taks */}
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
        id={id}
      />
      {/* Modal New Taks */}

      {/* Header */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Header */}
      {activeTab === "Board" && (
        <Board id={Number(id)} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={Number(id)} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "TimeLine" && (
        <TimeLine
          id={Number(id)}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
      {activeTab === "Table" && (
        <TableView
          id={Number(id)}
          setIsModalNewTaskOpen={setIsModalNewTaskOpen}
        />
      )}
    </div>
  );
};

export default ProjectClient;
