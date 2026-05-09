function Input({
  type,
  name,
  placeholder,
  value,
  onChange,
  onKeyDown,
  ref,
}) {

  return (

    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={ref}

      className="
        block
        w-full
        mt-5
        mb-3
        px-4
        py-3

        bg-white

        border
        border-[#FFC29B]

        rounded-xl

        text-[#4B2E39]
        placeholder:text-[#B95E82]/70

        focus:outline-none
        focus:ring-2
        focus:ring-[#F39F9F]
        focus:border-[#B95E82]

        transition-all
        duration-300

        shadow-sm
        focus:shadow-md
      "
    />
  );
}

export default Input;