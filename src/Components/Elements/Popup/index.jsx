import { useState, useCallback } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import Button from "../Button";
import PropTypes from "prop-types";

const DialogCustomAnimation = ({ title, desc, handlePopup, name = "Hapus" }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  return (
    <>
      <Button
        bgColor="bg-red-500"
        textColor="text-white"
        buttonheight={"h-8"}
        onClick={handleOpen}
        type="button">
        {name}
      </Button>
      <Dialog
        open={open}
        handler={handleOpen}
        size="xs"
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}>
        <DialogHeader>{title}</DialogHeader>
        <DialogBody>{desc}</DialogBody>
        <DialogFooter>
          <Button
            bgColor="bg-blue-500 mr-3"
            textColor="text-white"
            buttonheight={"h-8"}
            onClick={handleOpen}
            type="button">
            Batal
          </Button>
          <Button
            bgColor="bg-red-500"
            textColor="text-white"
            buttonheight={"h-8"}
            onClick={() => {
              handlePopup();
              handleOpen();
            }}
            type="button">
            Ya
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

DialogCustomAnimation.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  handlePopup: PropTypes.func.isRequired,
};

export default DialogCustomAnimation;
