import { Icon } from "..";

function Loader() {
  return (
    <div className="absolute w-full h-full top-0 left-0 flex justify-center items-center z-20">
      <Icon.Loader />
    </div>
  );
}

export default Loader;
