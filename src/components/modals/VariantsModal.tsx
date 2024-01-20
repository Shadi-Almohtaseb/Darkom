"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Tooltip,
  ModalProps,
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { SketchPicker } from "react-color";

const VariantsModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [scrollBehavior, setScrollBehavior] =
    React.useState<ModalProps["scrollBehavior"]>("inside");

  const [productColor, setProductColor] = useState("#fff");

  return (
    <>
      <Tooltip
        content="Product variation like: color, size..."
        placement="bottom"
      >
        <Button variant="faded" color="primary" onPress={onOpen}>
          + Add Variants
        </Button>
      </Tooltip>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        size="xl"
        scrollBehavior={scrollBehavior}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Variants to you product
              </ModalHeader>
              <ModalBody className="flex flex-col gap-14 items-center justify-center pt-[28rem] pb-7">
                <div className="flex flex-col gap-5">
                  <span className="text-lg">Select the Product Color:</span>
                  <SketchPicker
                    color={productColor}
                    onChange={(color) => setProductColor(color.hex)}
                    width="400px"
                  />
                  <div
                    style={{ backgroundColor: productColor }}
                    className={`h-[35px] w-[35px] rounded-full`}
                  />
                </div>
                <div className="flex flex-col gap-5">
                  <span className="text-lg">Select Product Information:</span>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Original Price"
                        title="Original Price"
                        min={0}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Discount Price"
                        title="Discount Price"
                        min={0}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Stock Quantity"
                        title="Stock Quantity"
                        min={1}
                      />
                    </div>
                  </div>
                  <span>Select Product Dimensions</span>
                  <div className="flex flex-col gap-5">
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Height"
                        title="Height"
                        min={0}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Width"
                        title="Width"
                        min={0}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <Input
                        type="number"
                        label="Length"
                        title="Length"
                        min={1}
                      />
                    </div>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex items-center justify-between w-full">
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  + Create Variant
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
