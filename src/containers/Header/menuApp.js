export const adminMenu = [
  //Quản lí người dùng
  {
    name: 'menu.admin.manage-user',
    menus: [
      {
        name: 'menu.admin.crud',
        link: '/system/user-manage',
      },
      {
        name: 'menu.admin.crud-redux',
        link: '/system/user-redux',
      },
      {
        name: 'menu.admin.manage-doctor',
        link: '/system/manage-doctor',
      },
      //Quản lí lịch khám bệnh
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },
  //Quản lí phòng khám
  {
    name: 'menu.admin.clinic',
    menus: [
      {
        name: 'menu.admin.manage-clinic',
        link: '/system/manage-clinic',
      },
    ],
  },
  //Quản lí chuyên khoa
  {
    name: 'menu.admin.specialty',
    menus: [
      {
        name: 'menu.admin.manage-specialty',
        link: '/system/manage-specialty',
      },
    ],
  },
  //Quản lí cẩm nang
  {
    name: 'menu.admin.handbook',
    menus: [
      {
        name: 'menu.admin.manage-handbook',
        link: '/system/manage-handbook',
      },
    ],
  },
];
export const doctorMenu = [
  {
    name: 'menu.admin.manage-user',
    menus: [
      //Quản lí lịch khám bệnh của bác sĩ
      {
        name: 'menu.doctor.manage-schedule',
        link: '/doctor/manage-schedule',
      },
    ],
  },
];
