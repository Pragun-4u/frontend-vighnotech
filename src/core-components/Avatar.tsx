const Avatar = ({ loggedInUserType }: { loggedInUserType: string }) => {
  return (
    <span className="text-xl bg-amber-100 p-2 rounded-full  ">
      {loggedInUserType.slice(0, 2)}
    </span>
  );
};

export default Avatar;
