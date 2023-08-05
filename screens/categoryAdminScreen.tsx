import CategoryListComp from '../components/categoryList';
import React from 'react';
import { Category, CategoryListState } from '../types/storeTypes';
import Link from 'next/link';

type propsType = {
  categories: CategoryListState;
  createNewCategory: () => void;
};

function CategoryScreen(props: propsType) {
  const categories = props.categories;
  return (
    <>
      {categories.loading ? (
        <h2>loading...</h2>
      ) : categories.error ? (
        <h3>{categories.error}</h3>
      ) : (
        <section className="pt-20 lg:pt-[120px] pb-10 lg:pb-20 bg-[#F3F4F6]">
          <div className="container mx-auto">
            <button
              onClick={props.createNewCategory}
              className="
                inline-block
                py-3 px-8
                mt-10
                bg-primary text-white
                rounded-lg
                font-medium
                hover:bg-primary-darker
                transition
              "
            >
              Create New Category
            </button>
            <div className="mt-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {categories.filteredCategory.map((category) => (
                  <div key={category._id}>
                    <CategoryListComp category={category} />
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
                {categories.filteredCategory.map((category) => (
                  <div key={category._id}>
                    <Link href={`/admin/manage_category/edit/${category._id}`}>
                      <a className="
                        block
                        py-2 px-6
                        bg-primary text-white
                        rounded-full
                        text-center
                        font-medium
                        hover:bg-primary-darker
                        transition
                      ">
                        Edit Category
                      </a>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

export default CategoryScreen;

