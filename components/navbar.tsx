/* This example requires Tailwind CSS v2.0+ */
import React, { Fragment, useState, useEffect } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import Image from 'next/image'
import { LogoutIcon, LoginIcon, UserIcon, BellIcon, MenuIcon, XIcon } from '@heroicons/react/outline'
import { PlusSmIcon } from '@heroicons/react/solid'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { selectUserDetail } from '../store'
import { useSelector } from 'react-redux'

const userNavigation = [
  { name: 'Настройки пользователя', href: '/profile' },
  { name: 'Заказы пользователя', href: '/myorders' },
  { name: 'Выйти', href: '/logout' }
]

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example () {
  const router = useRouter()
  const [currentPage, setCurrentPage] = useState(router.pathname)
  useEffect(() => {
    router.events.on('routeChangeComplete', (url) => {
      setCurrentPage(url)
    })
  }, [router.events])
  const user = useSelector(selectUserDetail)
  const navigation = [
    { name: 'Ассортимент товара', href: '/product_list', current: false },
    { name: 'Категории', href: '/category', current: true },
    //{ name: 'Team', href: '#', current: false },
    { name: 'Корзина', href: '/cart', current: false }
  ]
  const loginBTN = (
                          <Link href={'/login'} key={'login'}>
                    <button
                      className={classNames(
                        currentPage === '/login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-8 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                    
                    <LoginIcon className="h-6 w-6" />Войти 
                    </button>
                    </Link>
  )
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          {console.log(open)}
          <div className="max-w-7xl mx-auto px-6 sm:px-6 lg:px-18">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  {/* Mobile menu button */}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    {open
                      ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                        )
                      : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        )}
                  </Disclosure.Button>
                </div>
                <div className="flex-shrink-0 flex items-center">
                  <Image
                    className="block lg:hidden h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                    alt="Workflow"
                    priority
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='contain'
                  />
                  <Image
                    className="hidden lg:block h-8 w-auto"
                    src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                    alt="Workflow"
                    priority
                    width='100%'
                    height='100%'
                    layout='responsive'
                    objectFit='contain'
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:items-center md:space-x-4">
                  {navigation.map((item) => (
                    <Link href={item.href} key={item.name}>
                    <a
                      className={classNames(
                        currentPage === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'px-3 py-2 rounded-md text-sm font-medium'
                      )}
                    >
                      {item.name}
                    </a>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="flex items-center">
                <div className="hidden md:ml-4 md:flex-shrink-0 md:flex md:items-center">
                  {/* Profile dropdown */}
                  { user
                    ? <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                        <span className="sr-only">Open user menu</span>

                    <UserIcon className="h-6 w-6 bg-red-700" aria-hidden="true" />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                        {userNavigation.map((item) => (
                          <Menu.Item key={item.name}>
                            {({ active }) => (
                              <Link href={item.href}>
                              <a
                                className={classNames(
                                  active ? 'bg-pink-100' : '',
                                  'block px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                {item.name}
                              </a>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                    : loginBTN
                  }
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navigation.map((item) => (
                <Link href={item.href} key={item.name}>
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    currentPage === item.href ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {item.name}
                </Disclosure.Button>

                  </Link>
              ))}
            </div>
            <div className="pt-4 pb-3 border-t border-gray-700">
                </div>
                  <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {user
                  ? <div className="flex-shrink-0">
                  <Image
                  className="h-10 w-10 rounded-full" 
                  src={'https://cdn-icons-png.flaticon.com/512/219/219969.png'}
                  alt="" 
                  priority
                  width='100%'
                  height='100%'
                  layout='responsive'
                  objectFit='contain'
                  />
                    <div className="ml-3">
                  <div className="text-base font-medium text-white">{user.name}</div>
                  <div className="text-sm font-medium text-gray-400">{user.email}</div>
                </div>
                <button
                  type="button"
                  className="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                >
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
                  : <Link href='/login'>
                  <Disclosure.Button
                  key={'login'}
                  as="a"
                  href={'/login'}
                  className={classNames(
                    currentPage === '/login' ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block px-3 py-2 rounded-md text-base font-medium'
                  )}
                >
                  {'Войти'}
                </Disclosure.Button>
                </Link>
                }
              </div>
              <div className="mt-3 px-2 space-y-1 sm:px-3">
                {user
                  ? userNavigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700"
                  >
                    {item.name}
                  </Disclosure.Button>
                  ))
                  : <div>
                </div>
                }
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
