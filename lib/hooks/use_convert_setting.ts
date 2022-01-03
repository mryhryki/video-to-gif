import { useState } from "react";
import { getIntegerInRange } from "../checker";

interface ConvertSetting {
  frameRate: number;
}

const DefaultConvertSetting: ConvertSetting = {
  frameRate: 10,
};

interface UseConvertSettingState {
  updateConvertSetting: (partialConvertSetting: Partial<ConvertSetting>) => void;
  convertSetting: ConvertSetting;
}

export const useConvertSetting = (): UseConvertSettingState => {
  const [convertSetting, setConvertSetting] = useState(DefaultConvertSetting);

  const updateConvertSetting = (partialConvertSetting: Partial<ConvertSetting>): void => {
    setConvertSetting((prev) => {
      const next: ConvertSetting = { ...prev, ...partialConvertSetting };
      next.frameRate = getIntegerInRange(next.frameRate, 1, 30);
      return next;
    });
  };

  return { convertSetting, updateConvertSetting };
};
