interface TextProps {
  key: string;
  label?: string;
  className?: string;
  classData?: string;
  placeholder?: string;
  defaultValue?: any;
  onChange?: (value: any) => void;
}

export const Text: React.FC<TextProps> = ({
  key,
  label,
  className = "block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6",
  classData = "",
  placeholder,
  defaultValue,
  ...restProps
}) => {
  return (
    <div>
      {label ? (
        <label
          htmlFor="price"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Price
        </label>
      ) : (
        ""
      )}
      <input
        type="text"
        name={`input-${key}`}
        id={`input-${key}`}
        className="block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        placeholder={placeholder}
      />
    </div>
  );
};
