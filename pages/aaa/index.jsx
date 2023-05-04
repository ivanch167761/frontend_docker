/*
  This example requires Tailwind CSS v2.0+ 
  
  This example requires some changes to your config:
  
  ```
  // tailwind.config.js
  module.exports = {
    // ...
    plugins: [
      // ...
      require('@tailwindcss/forms'),
    ],
  }
  ```
*/
export default function Example() {
  return (
    <div>
      <div className="mt-1">
        <input
          type="text"
          name="search"
          id="search"
          className="bg-blue-100 border-red-500 ring-red-500 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm px-4 rounded-full"
          placeholder="Jane Doe"
        />
      </div>
    </div>
  )
}
