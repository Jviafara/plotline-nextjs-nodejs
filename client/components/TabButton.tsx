type Props = {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activetab: string;
};

const TabButton = ({ name, icon, setActiveTab, activetab }: Props) => {
  const isActive = activetab === name;
  return (
    <button
      className={`relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-2.25 after:left-0 after:h-px after:w-full hover:text-blue-600 sm:px-2 lg:px-4 dark:text-neutral-500 dark:hover:text-white ${isActive ? "text-blue-600 after:bg-blue-600 dark:text-white" : ""}`}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

export default TabButton;
