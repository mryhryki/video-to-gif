import React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
`;

interface Props {
  onVideoFileDrop: (videoFile: File) => void;
  children: React.ReactNode;
}

export const DropOrPasteVideo: React.FC<Props> = (props) => {
  const { onVideoFileDrop, children } = props;

  return (
    <Wrapper
      onDragOver={(event) => {
        event.stopPropagation();
        event.preventDefault();
      }}
      onDrop={(event) => {
        event.preventDefault();
        const file = event.dataTransfer.files.item(0);
        if (file == null) {
          return;
        } else if (!file.type.startsWith("video/")) {
          return;
        }
        onVideoFileDrop(file);
      }}
      onPaste={(event) => {
        const file = event.clipboardData.files.item(0);
        if (file == null) {
          return;
        } else if (!file.type.startsWith("video/")) {
          return;
        }
        onVideoFileDrop(file);
      }}
    >
      {children}
    </Wrapper>
  );
};
