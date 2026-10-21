"use client";

import Board from "@/components/organisms/Board";
import ProjectHeader from "@/components/organisms/ProjectHeader";
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
      {/* Modal New Taks */}

      {/* Header */}
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {/* Header */}
      {activeTab === "Board" && (
        <Board id={Number(id)} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </div>
  );
};

export default ProjectClient;
