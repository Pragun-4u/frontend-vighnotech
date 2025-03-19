import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useDispatch } from "react-redux";
import { addStudentData } from "@/store/features/studentDataSlice";

export function DialogDemo() {
  const formRef = useRef<HTMLFormElement>(null);
  const [open, setOpen] = useState(false); // Control dialog open state

  const dispatch = useDispatch();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (formRef.current) {
      const formData = new FormData(formRef.current);
      const data = {
        name: formData.get("name"),
        roll_number: formData.get("roll_number"),
        class: formData.get("class"),
        section: formData.get("section"),
        attendance: formData.get("attendance"),
        marks: {
          maths: formData.get("maths"),
          science: formData.get("science"),
          english: formData.get("english"),
        },
        id: Math.floor(Math.random() * 10000),
      };
      dispatch(addStudentData(data));

      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Student</DialogTitle>
          <DialogDescription>Click add when you're done.</DialogDescription>
        </DialogHeader>
        <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input id="name" name="name" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="roll_number" className="text-left">
              Roll No.
            </Label>
            <Input
              type="number"
              id="roll_number"
              name="roll_number"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="class" className="text-right">
              Class
            </Label>
            <Input id="class" name="class" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="section" className="text-right">
              Section
            </Label>
            <Input id="section" name="section" className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="attendance" className="text-left text-sm mr-2">
              Attendance
            </Label>
            <Input
              type="number"
              id="attendance"
              name="attendance"
              className="col-span-3"
            />
          </div>

          <div className="text-center font-bold">Marks</div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="maths" className="text-left text-sm mr-2">
              Maths
            </Label>
            <Input
              type="number"
              id="maths"
              name="maths"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="science" className="text-left text-sm mr-2">
              Science
            </Label>
            <Input
              type="number"
              id="science"
              name="science"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="english" className="text-left text-sm mr-2">
              English
            </Label>
            <Input
              type="number"
              id="english"
              name="english"
              className="col-span-3"
            />
          </div>

          <DialogFooter>
            <Button type="submit">Add</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
