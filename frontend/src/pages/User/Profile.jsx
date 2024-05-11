// import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../../components/Loader";
import { setCredientials } from "../../redux/features/auth/authSlice";
import { Link } from "react-router-dom";
import { useProfileMutation } from "../../redux/api/usersApiSlice";

const Profile = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);

  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  useEffect(() => {
    setUsername(userInfo.username);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.username]);

  const dispatch = useDispatch();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          username,
          email,
          password,
        }).unwrap();
        dispatch(setCredientials({ ...res }));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="constainer mx-auto p-4 mt-[5rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>

          <form onSubmit={submitHandler}>
            <div className="mb-4">
              <label htmlFor="" className="block texty-white mb-2">
                Name
              </label>
              <input
                className="form-input p-2 bg-slate-600 rounded-sm w-full"
                type="text"
                name=""
                id=""
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                placeholder="Enter name"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block texty-white mb-2">
                Email:
              </label>
              <input
                className="form-input p-2 bg-slate-600 rounded-sm w-full"
                type="text"
                name=""
                id=""
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                placeholder="abcd@gmail.com"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block texty-white mb-2">
                Password
              </label>
              <input
                className="form-input p-2 bg-slate-600 rounded-sm w-full"
                type="text"
                name=""
                id=""
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                placeholder="Enter password"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="" className="block texty-white mb-2">
                Confirm password
              </label>
              <input
                className="form-input p-2 bg-slate-600 rounded-sm w-full"
                type="text"
                name=""
                id=""
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                placeholder="Confirm password"
              />
            </div>

            <div className="flex justify-between">
              <button
                type="submit"
                className="bg-pink-500 text-white py-2 px-4 rounded hover:bg-pink-600"
              >
                Update
              </button>

              <Link
                to="/user-orders"
                className="bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700"
              >
                My Orders
              </Link>
            </div>
            {loadingUpdateProfile && <Loader />}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
