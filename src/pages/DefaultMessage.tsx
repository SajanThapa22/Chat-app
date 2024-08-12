import Logo from "../assets/svg/logo.svg?react";

const DefaultMessage = () => {
  return (
    <div className="text-center w-full h-dvh text-txtClr bg-bgComp flex flex-col justify-center items-center gap-5">
      <Logo className="size-[130px] text-[#b8b6b6]" />
      <h1 className="text-[30px] capitalize">your chats will appear here</h1>
    </div>
  );
};

export default DefaultMessage;
