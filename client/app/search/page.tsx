"use client";

import { useSearchQuery } from "@/lib/redux/api";
import { ChangeEvent, useEffect, useState } from "react";
import { debounce } from "lodash";
import Header from "@/components/molecules/Header";
import TaskCard from "@/components/molecules/TaskCard";
import { inputStyles } from "@/lib/constansts";
import ProjectCard from "@/components/molecules/ProjectCard";
import UserCard from "@/components/molecules/UserCard";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const {
    data: searchResults,
    isLoading,
    isError,
  } = useSearchQuery(searchTerm, {
    skip: searchTerm.length < 3,
  });

  const handleSearch = debounce((e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, 500);

  useEffect(() => {
    return handleSearch.cancel;
  }, [handleSearch.cancel]);

  return (
    <div className="p-8">
      <Header title="Search" />
      <div className="">
        <input
          type="text"
          placeholder="Search..."
          onChange={handleSearch}
          className={`w-1/2! rounded border p-3 shadow ${inputStyles}`}
        />
      </div>
      <div className="p-5">
        {isLoading && <p className="">Loading...</p>}
        {isError && (
          <p className="">Error occurred ehile fetchinf the search result!</p>
        )}
        {!isLoading && !isError && searchResults && (
          <div className="">
            {searchResults.tasks && searchResults?.tasks.length > 0 && (
              <h2>Tasks</h2>
            )}
            {searchResults.tasks?.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}

            {searchResults.projects && searchResults?.projects.length > 0 && (
              <h2>Projects</h2>
            )}
            {searchResults.projects?.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}

            {searchResults.users && searchResults?.users.length > 0 && (
              <h2>Users</h2>
            )}
            {searchResults.users?.map((user) => (
              <UserCard key={user.userId} user={user} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
