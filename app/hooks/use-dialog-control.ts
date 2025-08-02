import { useState } from "react";

/**
 * Custom hook to manage the state of a dialog/modal.
 *
 * @returns Object containing functions to open, close the dialog and the current show state.
 */
export const useDialogModal = () => {
  const [show, setShow] = useState("");

  const openDialog = (val: string) => {
    setShow(val);
  };
  const closeDialog = () => {
    setShow("");
  };
  return {
    openDialog,
    closeDialog,
    show,
  };
};
