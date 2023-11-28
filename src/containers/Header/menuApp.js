export const adminMenu = [
  {
    //Quản lý hệ thống
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/manage-doctor",
      },
      {
        name: "menu.doctor.manager-schedule",
        link: "/doctor/manage-schedule",
      },
    ],
  },
  {
    // Quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.manage-clinic",
        link: "/system/manage-clinic",
      },
    ],
  },
  {
    // Quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.manage-specialty",
        link: "/system/manage-specialty",
      },
    ],
  },
  {
    // Quản lý bài đăng
    name: "menu.admin.hanBook",
    menus: [
      {
        name: "menu.admin.manage-hanBook",
        link: "/system/user-admin",
      },
    ],
  },
];
export const doctorMenu = [
  {
    //Quản lý user

    name: "menu.doctor.schedule",
    menus: [
      { name: "menu.doctor.manager-schedule", link: "/doctor/manage-schedule" },
      { name: "menu.doctor.manager-patient", link: "/doctor/manage-patient" },
    ],
  },
];
