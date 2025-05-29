
export interface IValid {
  type: string;
  min?: number;
  max?: number;
  numberMessage?: string;
  regex?: RegExp | null;
  required: string | boolean;
  message?: string;
}
