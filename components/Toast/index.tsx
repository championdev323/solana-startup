const Toast = () => {
  return (
    <div
      className="max-w-xs bg-red-100 border border-red-200 text-sm text-red-800 rounded-lg dark:bg-red-800/10 dark:border-red-900 dark:text-red-500 fixed bottom-5 right-5"
      role="alert"
    >
      <div className="flex p-4">
        Hello, world! This is a toast message.
        <div className="ms-auto">
          <button
            type="button"
            className="inline-flex flex-shrink-0 justify-center items-center size-5 rounded-lg text-red-800 opacity-50 hover:opacity-100 focus:outline-none focus:opacity-100 dark:text-red-200"
          >
            <span className="sr-only">Close</span>
            <svg
              className="flex-shrink-0 size-4"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6 6 18"></path>
              <path d="m6 6 12 12"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
