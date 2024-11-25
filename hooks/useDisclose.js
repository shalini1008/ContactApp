import { useState } from "react";


function useDisclose() {
    const [isOpen,setOpen] = useState(false);
    const onOpen = () => {
      setOpen(true);
    };
    const onClose = () => {
      setOpen(false);
    };
  return {isOpen,onClose,onOpen}
}

export default useDisclose