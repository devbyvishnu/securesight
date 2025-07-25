'use client';
import { useState } from 'react';
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example() {
  const [active, setActive] = useState('Dashboard');

  const navigation = [
    {
      name: 'Dashboard',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" d="M13 9V3h8v6zM3 13V3h8v10zm10 8V11h8v10zM3 21v-6h8v6z"></path>
        </svg>
      )
    },
    {
      name: 'Cameras',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" d="m6.03 12.03l2 3.47l-2.53 3.18L2 12.62zM17 18v-2.71c.88-.39 1.5-1.26 1.5-2.29c0-.57-.2-1.1-.53-1.5l1.97-1.15c1.01-.59 1.36-1.88.77-2.89l-1.38-2.4a2.125 2.125 0 0 0-2.89-.78L8.31 9c-.95.53-1.28 1.75-.73 2.71l1.5 2.6c.55.95 1.78 1.28 2.73.73l1.88-1.08c.25.59.72 1.07 1.31 1.33V18c0 1.1.9 2 2 2h5v-2z"></path>
        </svg>
      )
    },
    {
      name: 'Scenes',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" d="M17 10.5V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-3.5l4 4v-11z"></path>
        </svg>
      )
    },
    {
      name: 'Incidents',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} viewBox="0 0 24 24">
          <path fill="currentColor" d="M1 21L12 2l11 19zm11-3q.425 0 .713-.288T13 17t-.288-.712T12 16t-.712.288T11 17t.288.713T12 18m-1-3h2v-5h-2z"></path>
        </svg>
      )
    },
    {
      name: 'Users',
      href: '#',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24">
          <path fill="currentColor" d="M16 17v2H2v-2s0-4 7-4s7 4 7 4m-3.5-9.5A3.5 3.5 0 1 0 9 11a3.5 3.5 0 0 0 3.5-3.5m3.44 5.5A5.32 5.32 0 0 1 18 17v2h4v-2s0-3.63-6.06-4M15 4a3.4 3.4 0 0 0-1.93.59a5 5 0 0 1 0 5.82A3.4 3.4 0 0 0 15 11a3.5 3.5 0 0 0 0-7"></path>
        </svg>
      )
    }
  ];

  return (
    <Disclosure as="nav" className="bg-gray-800 border-b border-gray-700">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex shrink-0 items-center">
            <img
              alt="Your Company"
              src="/images/Logo.svg"
              className="h-8 w-auto"
            />
          </div>

          <div className="hidden sm:ml-6 sm:block">
            <div className="flex space-x-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => setActive(item.name)}
                  className={classNames(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium',
                    active === item.name ? 'text-yellow-400' : 'text-gray-400'
                  )}
                >
                  {item.icon}
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <Menu as="div" className="relative ml-3">
              <div className='flex items-center gap-2'>
                <img
                  alt=""
                  src="/images/Admin.svg"
                  className="size-8 rounded-full"
                />
                <MenuButton className="relative flex text-white items-center">
                  <h1>Mohammed Ajhas</h1>
                  <ChevronDownIcon width={'15px'} height={'15px'} />
                </MenuButton>
              </div>

              <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition">
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Your Profile
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Settings
                  </a>
                </MenuItem>
                <MenuItem>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Sign out
                  </a>
                </MenuItem>
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
