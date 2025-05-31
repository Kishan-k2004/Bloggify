


function Input({ name, placeholder, type }) {
  return (
    <>
      <label
        htmlFor={`input-${name}`}
        className="block mt-4 mb-1 text-left text-sm font-medium font-Inter-Regular text-black dark:text-white"
      >
        {name}
      </label>
      <input
        type={type}
        id={`input-${name}`}
        name={name}
        placeholder={placeholder || name}
        required
        pattern={type === "email" ? "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" : undefined}
        className="bg-gray-50 border focus:outline-none border-gray-300 text-gray-900 text-sm font-InterMedium rounded-lg focus:ring-1 focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        
      />
    </>
  );
}

export default Input