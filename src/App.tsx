import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Login from "./core-components/Login";
import { RootState } from "./store/store";
import { ListTable } from "./core-components/ListTable";
import Avatar from "./core-components/Avatar";
import { Button } from "./components/ui/button";
import { logOut } from "./store/features/loginSlice";
import { DialogDemo } from "./core-components/Dialog";

function App() {
  const { userType: loggedInUserType } = useSelector(
    (store: RootState) => store.loginSlice
  );
  const dispatch = useDispatch();

  return (
    <>
      {loggedInUserType ? (
        <>
          <div className="flex items-center  justify-between gap-4">
            <div>
              <Button
                onClick={() => dispatch(logOut())}
                className="bg-red-500 "
              >
                Log Out
              </Button>
            </div>
            <div>
              {" "}
              <DialogDemo />{" "}
            </div>
            <div>
              <Avatar loggedInUserType={loggedInUserType} />
            </div>
          </div>

          <ListTable />
        </>
      ) : (
        <Login />
      )}
    </>
  );
}

export default App;
