"use client";

import ProjectHeader from "@/components/ProjectHeader";
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
      {/* {activeTab === 'Board' && (<Board/>) */}
      {/* Header */}
    </div>
  );
};

export default ProjectClient;
