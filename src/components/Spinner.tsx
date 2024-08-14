interface Props {
  size?: string;
}

const Spinner = ({ size }: Props) => {
  return (
    <div
      className={` ${
        size ? size : "size-6"
      } rounded-full border-gray-400 border-b-spinner border-[4px] animate-spin`}
    ></div>
  );
};

export default Spinner;
