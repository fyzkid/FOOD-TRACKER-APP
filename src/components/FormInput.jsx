const FormInput = ({ children, inputRef, extraInputClass, extraContainerClass, ...inputProps }) => {
  return (
    <div
      className={`overflow-clip relative rounded-xl flex items-center gap-1 border border-brand-silver ${extraContainerClass}`}>
      {children}
      <input
        ref={inputRef}
        {...inputProps}
        className={`py-1 px-1 bg-[#FAFAFA] w-full outline-0 placeholder:text-[#B0B0B0] placeholder:font-light duration-300 focus:bg-transparent ${extraInputClass}`}
      />
    </div>
  );
};

export default FormInput;
