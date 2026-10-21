import { useState } from "react";
import Header from "../molecules/Header";
import TabButton from "../atoms/TabButton";
import { Clock, FilterIcon, Grid3X3, List, Share2, Table } from "lucide-react";

type Props = {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
};

const ProjectHeader = ({ activeTab, setActiveTab }: Props) => {
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  return (
    <div className="px-4 xl:px-6">
      {/* Modal New Project */}
      {/* Modal New Project */}

      <div className="pt-6 pb-6 lg:pt-8 lg:pb-4">
        <Header title={"Project Header"} />
      </div>

      {/* Tabs */}
      <div className="dark:border-stroke-dark flex flex-wrap-reverse gap-2 border-y border-gray-200 pt-2 pb-2 md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3X3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activetab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activetab={activeTab}
          />
          <TabButton
            name="TimeLine"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activetab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activetab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <FilterIcon className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="dark:border-dark-secondary dark:bg-dark-secondary rounded-xl border py-1 pr-4 pl-10 focus:outline-none dark:text-white"
            />
            <Grid3X3 className="absolute top-2 left-3 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
      {/* Tabs */}
    </div>
  );
};

export default ProjectHeader;
