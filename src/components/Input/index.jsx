export const Input = ({
  label,
  register,
  placeholder,
  className,
  name,
  required,
  errorMessage,
}) => (
  <div className={"flex flex-col " + className}>
    <label translate="no" className="font-['Poppins'] text-[16px] font-normal">
      {label}
    </label>
    <input
      translate="no"
      className="block rounded-[8px] border w-full h-[60px] border-black my-[10px] py-[10px] pl-[22px]"
      placeholder={placeholder}
      {...register(name, label, placeholder, { required })}
    />
    {errorMessage && (
      <p className="font-['Poppins'] text-[red] text-[16px] leading-[24px] ">
        {errorMessage}
      </p>
    )}
  </div>
);
