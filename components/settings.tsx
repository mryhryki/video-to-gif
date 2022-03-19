import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ConvertSetting } from "../lib/ffmpeg";

const Table = styled.table`
  margin: 16px auto;

  th,
  td {
    padding: 6px 8px;
  }

  th {
    text-align: center;
  }
`;

const PreviewVideo = styled.video`
  max-height: 50vh;
  max-width: 50vw;
  object-fit: contain;
`;

const Button = styled.button`
  background-color: orange;
  border-radius: 4px;
  border: none;
  color: white;
  font-size: 20px;
  font-weight: bold;
  padding: 8px 24px;
`;

interface Props {
  convertSetting: ConvertSetting;
  updateConvertSetting: (partialConvertSetting: Partial<ConvertSetting>) => void;
  videoUrl: string | null;
  onConvert: () => void;
}

export const Settings: React.FC<Props> = (props) => {
  const { videoUrl, convertSetting, updateConvertSetting, onConvert } = props;
  const { frameRate, sizePixel, sizeType, rangeStart, rangeEnd } = convertSetting;

  const [videoRef, setVideoRef] = useState<HTMLVideoElement | null>(null);
  useEffect(() => {
    if (videoRef == null) return;
    const onTimeUpdate = () => {
      const rangeEnd = Math.round(videoRef.currentTime * 100) / 100;
      updateConvertSetting({ rangeEnd });
    };
    videoRef.addEventListener("timeupdate", onTimeUpdate);
    return () => videoRef.removeEventListener("timeupdate", onTimeUpdate);
  }, [videoRef]);

  return (
    <Table>
      {videoUrl != null ? (
        <tr>
          <th colSpan={2}>
            <PreviewVideo ref={setVideoRef} src={videoUrl} controls muted />
          </th>
        </tr>
      ) : null}
      <tr>
        <th>Frame Rate</th>
        <td>
          <input
            type="range"
            min="1"
            max="30"
            step="1"
            value={frameRate}
            onChange={(event) => updateConvertSetting({ frameRate: parseInt(event.target.value, 10) })}
          />
          {frameRate}FPS
        </td>
      </tr>
      <tr>
        <th>Size</th>
        <td>
          <select
            onChange={(event) => {
              console.debug(event);
              updateConvertSetting({ sizeType: event.target.value === "height" ? "height" : "width" });
            }}
            value={sizeType}
          >
            <option value="width">Width</option>
            <option value="height">Height</option>
          </select>
          <input
            type="number"
            value={sizePixel}
            onChange={(event) => updateConvertSetting({ sizePixel: parseInt(event.target.value, 10) })}
          />
          {" (-1 = Auto)"}
        </td>
      </tr>
      <tr>
        <th>Range</th>
        <td>
          <input
            type="number"
            value={rangeStart}
            onChange={(event) => updateConvertSetting({ rangeStart: parseFloat(event.target.value) })}
          />
          {" sec 〜 "}
          <input
            type="number"
            value={rangeEnd}
            onChange={(event) => updateConvertSetting({ rangeEnd: parseFloat(event.target.value) })}
          />
          {" sec"}
        </td>
      </tr>
      <tr>
        <th colSpan={2}>
          <Button onClick={onConvert}>Convert</Button>
        </th>
      </tr>
    </Table>
  );
};
