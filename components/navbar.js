import { Disclosure } from '@headlessui/react'
import React from 'react'
import Image from 'next/image'

import { MenuIcon, XIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { useRouter } from 'next/router'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Navbar () {
  const router = useRouter()
  const currentUrl = router.pathname
  const navigation = [
    {
      name: 'Dashboard',
      key: '3',
      href: '/',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Team',
      key: '4',
      href: '/f',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Projects',
      key: '5',
      href: '/g',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Projects 2',
      key: '6',
      href: '/h',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Projects 3',
      key: '7',
      href: '/j',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Projects 4',
      key: '8',
      href: '/jj',
      current: function () {
        return this.href === currentUrl
      }
    },
    {
      name: 'Calendar',
      key: '9',
      href: '/kk',
      current: function () {
        return this.href === currentUrl
      }
    }
  ]

  return (
    <Disclosure as='header' className='bg-gray-800 sticky top-0 z-50'>
      {({ open }) => (
        <>
          <div className='max-w-7xl mx-auto px-2 sm:px-4 lg:divide-y lg:divide-gray-700 lg:px-8'>
            <div className='relative h-16 flex justify-between'>
              <nav
                className='hidden lg:py-2 lg:flex lg:space-x-8'
                aria-label='Global'
              >
                {navigation.map((item) => (
                  <Link key={item.name} href={item.href}>
                    <a
                      key={item.name}
                      className={classNames(
                        item.current()
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                        'rounded-md py-2 px-3 inline-flex items-center text-sm font-medium'
                      )}
                      aria-current={item.current() ? 'page' : undefined}
                    >
                      {item.name}
                    </a>
                  </Link>
                ))}
              </nav>
              <Link href='/' className='relative z-10 px-2 flex lg:px-0'>
                <div className='flex-shrink-0 flex items-center'>
                  <Image
                    className='block h-14 w-auto'
                    src='/ciervo.svg'
                    alt='Workflow'
                    layout='fill'
                  />
                </div>
              </Link>

              {
                <div className='relative z-10 flex items-center lg:hidden'>
                  {/* Mobile menu button */}

                  <Disclosure.Button className='rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white'>
                    <span className='sr-only'>Open menu</span>
                    {open
                      ? (<XIcon className='block h-6 w-6' aria-hidden='true'/>)
                      : (
                      <MenuIcon className='block h-6 w-6' aria-hidden='true' />)}
                  </Disclosure.Button>
                </div>
              }
            </div>
          </div>
          {
            <Disclosure.Panel
              as='nav'
              className='lg:hidden'
              aria-label='Global'
            >
              <div className='pt-2 pb-3 px-2 space-y-1'>
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as='a'
                    href={item.href}
                    className={classNames(
                      item.current()
                        ? 'bg-gray-900 text-white'
                        : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}
                    aria-current={item.current() ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          }
        </>
      )}
    </Disclosure>
  )
}
