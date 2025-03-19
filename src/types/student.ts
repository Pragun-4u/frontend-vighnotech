export type Student = {
  id: number;
  name: string;
  roll_number: string;
  class: string;
  section: string;
  attendance: number;
  marks: {
    maths: number;
    science: number;
    english: number;
  };
};
