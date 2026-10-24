import Header from "@/components/molecules/Header";
import { settingsLabelStyles, settingsTextStyles } from "@/lib/constansts";
import React from "react";

const page = () => {
  const userSettings = {
    username: "Jovialet",
    email: "jovialet@email.com",
    teamName: "Development Team",
    roleName: "Developer",
  };
  return (
    <div className="p-8">
      <Header title="Settings" />
      <div className="space-y-4">
        <div>
          <label htmlFor="" className={settingsLabelStyles}>
            Useraname
          </label>
          <div className={settingsTextStyles}>{userSettings.username}</div>
        </div>
        <div>
          <label htmlFor="" className={settingsLabelStyles}>
            Email
          </label>
          <div className={settingsTextStyles}>{userSettings.email}</div>
        </div>
        <div>
          <label htmlFor="" className={settingsLabelStyles}>
            Team
          </label>
          <div className={settingsTextStyles}>{userSettings.teamName}</div>
        </div>
        <div>
          <label htmlFor="" className={settingsLabelStyles}>
            Role
          </label>
          <div className={settingsTextStyles}>{userSettings.roleName}</div>
        </div>
      </div>
    </div>
  );
};

export default page;
