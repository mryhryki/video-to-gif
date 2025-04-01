"use client"

import styled from "styled-components";
import React from "react";

export const selectImage = (onChange: (file: File) => void): void => {
  const input: HTMLInputElement = document.createElement("input");
  input.type = "file";
  input.accept = "video/*";
  input.multiple = false;
  input.onchange = () => {
    if (input.files != null && input.files.length > 0) {
      const file = input.files.item(0);
      if (file != null) {
        onChange(file);
      }
    }
  };
  input.click();
};

const Wrapper = styled.div`
  align-items: center;
  background-color: #f6f6f6;
  border-radius: 2px;
  border: 1px solid silver;
  display: flex;
  flex: 1;
  justify-content: center;
  margin: 4px;
  overflow: hidden;
  height: calc(100% - 8px);
`;
const Message = styled.div`
  font-size: 20px;
  line-height: 28px;
`;

const UploadImageFileButton = styled.button`
  background: none;
  border: none;
  color: #0000ee;
  display: inline;
  font-size: 20px;
  line-height: 28px;
  padding: 0;
  text-decoration: underline;
`;

interface Props {
  onVideoFileSelected: (videoFile: File) => void;
}

export const SelectVideoFile: React.FC<Props> = (props) => {
  const { onVideoFileSelected } = props;

  return (
    <Wrapper>
      <Message>
        <p>Drop or paste video file here!</p>
        <p>
          or{" "}
          <UploadImageFileButton onClick={() => selectImage(onVideoFileSelected)}>
            select video file.
          </UploadImageFileButton>
        </p>
      </Message>
    </Wrapper>
  );
};
