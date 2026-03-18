
import type { SvgIconComponent } from '@mui/icons-material';
import { AccountBox, Assignment, HomeOutlined, Image, Person, Pets } from '@mui/icons-material';

import { ROUTE_PATH } from '@/constants/routes';
import { ROLE } from '@/constants/roles';

export interface SectionItem {
  title: string;
  path: string;
  children?: SectionItem[];
  info?: () => JSX.Element;
  icon?: SvgIconComponent;
}

interface Section {
  section: string | null;
  items: SectionItem[];
}

const mapRole = (role: string) => {
  switch (role) {
    case 'Quản trị viên':
      return ROLE.ADMIN
    case 'Nhân viên':
      return ROLE.EMPLOYEE
    default:
      return null
  }
}

// sidebar
const Sidebars = (role: string) => {
  switch (role) {
    case ROLE.MOD:
      return ModSidebars()
    case ROLE.SPECIALIST:
      return SpecialistSidebars()
      case ROLE.EMPLOYEE:
        return EmployeeSidebars()
      case ROLE.ADMIN:
      default:
        return AdminSidebars()
  }
};

// sidebar của admin
const AdminSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined        
      },
      {
        title: 'Quản lý tài khoản',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_ACCOUNT}`,
        icon: AccountBox
      },
      {
        title: 'Hồ sơ người dùng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: Person
      }
    ]
  }
]

// sidebar của mod: giao việc
const ModSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Trang chủ',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_HOME}`,
        icon: HomeOutlined
      },
      {
        title: 'Danh sách thú cưng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PET}`,
        icon: Pets
      },
      {
        title: 'Hồ sơ người dùng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: Person
      }
    ]
  }
]

// sidebar của specialist: chuyên viên chăm sóc
const SpecialistSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Quản lý công việc',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_TASK}`,
        icon: Assignment
      },
      {
        title: 'Danh sách thú cưng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_PET}`,
        icon: Pets
      },
      {
        title: 'Hồ sơ người dùng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: Person
      }
    ]
  }
]

// sidebar của employee: cập nhật hình ảnh
const EmployeeSidebars = (): Section[] => [
  {
    section: null,
    items: [
      {
        title: 'Cập nhật hình ảnh',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_IMAGE}`,
        icon: Image
      },
      {
        title: 'Hồ sơ người dùng',
        path: `/pet/${ROUTE_PATH.MANAGE}/${ROUTE_PATH.MANAGE_INFORMATION}`,
        icon: Person
      }
    ]
  }
]

export default Sidebars;

