import Link from 'next/link';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import getStore, { checkLoginStatus, AppDispatch } from '../../../store';

const AdminMenu = () => {
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(checkLoginStatus());
  }, [dispatch]);

  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center">
        <Link href="/admin/manage_category">
          <a className="bg-indigo-800 hover:bg-green-500 px-3 py-2 rounded-lg text-white mb-2">Управление Категориями</a>
        </Link>
        <Link href="/admin/manage_products">
          <a className="bg-indigo-800 hover:bg-green-500 px-3 py-2 rounded-lg text-white mb-2">Управление Товаром</a>
        </Link>
        <Link href="/admin/manage_order/1">
          <a className="bg-indigo-800 hover:bg-green-500 px-3 py-2 rounded-lg text-white mb-2">Управление Заказами</a>
        </Link>
        {/* Add admin user profile section here */}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const store = getStore();
  return {
    props: {
      initialState: store.getState(),
    },
  };
}

export default AdminMenu;

