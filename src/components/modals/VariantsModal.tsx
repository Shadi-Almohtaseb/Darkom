"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { SketchPicker } from "react-color";

const VariantsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [productColor, setProductColor] = useState("#fff");
  console.log(productColor);

  return (
    <>
      <Button variant="faded" color="primary" onPress={onOpen}>
        + Add Variants
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Variants to you product
              </ModalHeader>
              <ModalBody className="flex flex-col gap-14 items-center justify-center">
                <div className="flex flex-col gap-5">
                  <span className="text-lg">Select the Product Color:</span>
                  <SketchPicker
                    color={productColor}
                    onChange={(color) => setProductColor(color.hex)}
                    width="360px"
                  />
                  <div
                    style={{ backgroundColor: productColor }}
                    className={`h-[35px] w-[35px] rounded-full`}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Action
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default VariantsModal;
