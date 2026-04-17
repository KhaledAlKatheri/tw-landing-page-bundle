export interface AnimatedTitlesType {
  animate_title: string;
}

type TextAlignmentValueType = "right" | "center";

export interface TextAlignmentType {
  label: string;
  value: TextAlignmentValueType;
  key: string;
}