import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { authenticateUser } from "@/store/features/loginSlice";
import { RootState } from "@/store/store";
import { ChangeEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [userType, setLoginUserType] = useState("STUDENT");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { error } = useSelector((store: RootState) => store.loginSlice);

  const handleSubmit = () => {
    dispatch(authenticateUser({ userType, password }));
  };

  return (
    <div className="h-screen flex justify-center items-center">
      <div className="border p-6  w-full rounded-2xl shadow-lg bg-white max-w-sm mx-auto">
        <h2 className="text-xl font-semibold text-center mb-4">Login</h2>

        <RadioGroup
          onValueChange={setLoginUserType}
          defaultValue="STUDENT"
          className="flex justify-center items-center gap-6"
        >
          <div className="flex items-center flex-col gap-2">
            <RadioGroupItem
              value="STUDENT"
              id="student"
              className="border-yellow-200 focus:border-amber-500"
            />
            <Label htmlFor="student" className="text-sm font-medium">
              Student
            </Label>
          </div>
          <div className="flex items-center flex-col gap-2">
            <RadioGroupItem
              value="ADMIN"
              id="admin"
              className="border-amber-700"
            />
            <Label htmlFor="admin" className="text-sm font-medium">
              Admin
            </Label>
          </div>
        </RadioGroup>

        <Input
          type="password"
          placeholder="Enter your password"
          className="mt-4 px-4 py-2 rounded-md border  border-gray-400 focus:ring-2 focus:ring-blue-500"
          onInput={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />

        <Button
          type="button"
          onClick={handleSubmit}
          className="p-2 bg-amber-300 mt-3 w-full text-black font-semibold"
        >
          Submit
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export default Login;
