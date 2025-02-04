import { FaGear } from 'react-icons/fa6';
import { HiMiniHome } from 'react-icons/hi2';
import { Link, useLocation } from 'react-router-dom';
import { MdAdd, MdNotifications } from 'react-icons/md';

import logo from '../assets/icons/leaf-logo.png';

// TODO: Add Statistics icon

const Navbar = () => {
  const { pathname } = useLocation();

  const navLinks = [
    {
      name: 'Dashboard',
      icon: <HiMiniHome className='text-current w-[18px] h-[18px]' />,
      url: '/dashboard',
    },
    {
      name: 'Add Item',
      icon: <MdAdd className='text-current w-[18px] h-[18px]' />,
      url: '/dashboard/add-item',
    },
    {
      name: 'Notifications',
      url: '/dashboard/notifications',
      icon: <MdNotifications className='text-current w-[18px] h-[18px]' />,
    },
    {
      name: 'Settings',
      icon: <FaGear className='text-current w-[18px] h-[18px]' />,
      url: '/dashboard/settings',
    },
  ];

  return (
    <aside className='flex flex-col gap-9 h-full pt-8 pb-4 px-4'>
      <img src={logo} alt='app icon' className='w-8 h-8' />

      <nav className='flex flex-col gap-3'>
        {navLinks.map(({ icon, name, url }) => (
          <Link
            to={url}
            key={name}
            className={`grid grid-cols-[20px_1fr] items-center gap-2.5 h-10 px-3 border-2 border-transparent rounded-md duration-200 ${
              pathname === url
                ? 'bg-green-100 text-green-700'
                : 'text-gray-700 bg-transparent hover:border-green-200'
            }`}>
            {icon}
            {name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Navbar;
