import { Fragment } from "react";
import {
  BriefcaseIcon,
  CalendarIcon,
  CheckIcon,
  ChevronDownIcon,
  CurrencyDollarIcon,
  LinkIcon,
  MapPinIcon,
  PencilIcon,
  PlusIcon
} from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
export interface SubMenuProps {
  icon?: any;
  name: string;
}

interface AppHeaderProps {
  title: React.ReactNode;
  subTitle?: React.ReactNode;
  subMenu?: Array<any>;
  children?: React.ReactNode;
  createBtnName?: string;
  onCreate?: () => void;
}

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subTitle,
  subMenu = [],
  children,
  createBtnName = "Create",
  onCreate,
  ...restProps
}) => {
  //   return <>Hi</>;
  // };

  // export default function AppHeader() {
  return (
    <div className="flex lg:flex lg:items-center lg:justify-between p-3 pb-10">
      <div className="min-w-0 flex-1">
        <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
          {title}
        </h2>
        {subTitle ? (
          <div className="my-2 text-sm text-gray-700">{subTitle}</div>
        ) : (
          ""
        )}

        {subMenu.length > 0 ? (
          <div className="mt-1 flex flex-col sm:mt-0 sm:flex-row sm:flex-wrap sm:space-x-6">
            {subMenu.map((menu: SubMenuProps) => {
              return (
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  {menu.icon ? (
                    <menu.icon
                      className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  ) : (
                    ""
                  )}
                  {menu.name}
                </div>
              );
            })}
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="flex lg:ml-4 lg:mt-0">
        {onCreate ? (
          <span className="sm:ml-3">
            <button
              type="button"
              className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={() => onCreate()}
            >
              <PlusIcon className="-ml-0.5 mr-1.5 h-5 w-5" />
              {createBtnName}
            </button>
          </span>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};
