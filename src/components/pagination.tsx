import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

interface PaginationProps {
  size: number;
  active?: number;
  className?: string;
  onChange?: (index: number) => void;
}

export const Pagination: React.FC<PaginationProps> = (
  props: PaginationProps
) => {
  const { active = 1, size = 1, className, onChange, ...restProps } = props;
  let defaultList: Array<number | string> = ["1", "2", "..", size];
  if (size <= 4) {
    defaultList = Array.from({ length: size }, (_, i) => i + 1);
  }
  const [seq, setSeq] = useState<Array<any>>(defaultList);
  const [currentIndex, setCurrentIndex] = useState<number>(1);

  const updateIndex = (setValue?: number, inc?: number) => {
    if (setValue == undefined && inc) {
      setValue = currentIndex + inc;
    }
    if (setValue && setValue >= 1 && setValue <= size) {
      setCurrentIndex(setValue);
    } else {
      console.log("we are collecting unacepted formate");
    }
  };

  const computeRender = (index: any) => {
    if (index == "..") {
      return;
    }
    setSeq(Array.from({ length: size }, (_, i) => i + 1));
  };

  return (
    <nav
      className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4"
      aria-label="Table navigation"
    >
      <ul className="inline-flex items-stretch -space-x-px">
        <li onClick={() => updateIndex(undefined, -1)}>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <ChevronLeftIcon height={18} width={18}></ChevronLeftIcon>
          </a>
        </li>
        {seq.map((item) => {
          return (
            <li onClick={(event) => computeRender(item)}>
              <a
                href="#"
                className={`flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500  
                  border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 
                  dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white 
                  ${item == active ? "bg-gray-100" : "bg-white"}`}
              >
                {item}
              </a>
            </li>
          );
        })}

        <li>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <ChevronRightIcon height={18} width={18}></ChevronRightIcon>
          </a>
        </li>
      </ul>
      {/* <ul className="inline-flex items-stretch -space-x-px">
        <li>
          <ChevronLeftIcon></ChevronLeftIcon>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Previous</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            1
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            2
          </a>
        </li>
        <li>
          <a
            href="#"
            aria-current="page"
            className="flex items-center justify-center text-sm z-10 py-2 px-3 leading-tight text-primary-600 bg-primary-50 border border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
          >
            3
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            ...
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center text-sm py-2 px-3 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            100
          </a>
        </li>
        <li>
          <a
            href="#"
            className="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
          >
            <span className="sr-only">Next</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </li>
      </ul> */}
    </nav>
  );
};

const items = [
  {
    id: 1,
    title: "Back End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote"
  },
  {
    id: 2,
    title: "Front End Developer",
    department: "Engineering",
    type: "Full-time",
    location: "Remote"
  },
  {
    id: 3,
    title: "User Interface Designer",
    department: "Design",
    type: "Full-time",
    location: "Remote"
  }
];

/**
 * Function that greets a user
 * @author   @itsparser
 * Example : ["1", "..", 5, 6, 7, "..", 10]
 * ["1", "..", "5", 6, "7", "..", "10"]
 * ["1", "..", "5", 6, "7", "..", "10"]
 */
export default function PagenationExample() {
  const size = 13;
  const index = 13;
  let defaultList: Array<number | string>;
  useEffect(() => {
    console.log("useEffect ran");
    rearrageList(index, size);
  }, []);
  const [seq, setSeq] = useState<Array<any>>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(1);
  const rearrageList = (index: number, size: number) => {
    let defaultList: Array<number | string>;
    if (size <= 7) {
      defaultList = Array.from({ length: size }, (_, i) => i + 1);
    } else {
      if (index <= 3) {
        defaultList = ["1", "2", "3", "4", "..", size - 1, size];
      } else if (index >= size - 2) {
        defaultList = ["1", "2", "..", size - 3, size - 2, size - 1, size];
      } else {
        defaultList = ["1", "..", index - 1, index, index + 1, "..", size];
      }
    }
    setSeq(defaultList);
  };

  return (
    <div className="flex w-full items-center justify-between border-gray-200 bg-white p-0 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <a
          href="#"
          className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="#"
          className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">10</span> of{" "}
            <span className="font-medium">97</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <a
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </a>
            <a
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              1
            </a>
            {seq.map((item) => {
              return (
                <a
                  href="#"
                  key={"" + item}
                  onClick={() => rearrageList(item, size)}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
                >
                  {item}
                </a>
              );
            })}
            <a
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
