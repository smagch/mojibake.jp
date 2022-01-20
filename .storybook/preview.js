// import { useEffect } from '@storybook/addons';
// import Modal from 'react-modal';
import * as React from "react";
import { Toaster } from "react-hot-toast";

const ModalDecorator = Story => {
  // useEffect(() => {
  //   Modal.setAppElement('#root');
  // }, []);

  return (
    <>
      <Story />
      <Toaster />
    </>
  );
};

export const decorators = [ModalDecorator];
export const parameters = { layout: 'fullscreen' };
