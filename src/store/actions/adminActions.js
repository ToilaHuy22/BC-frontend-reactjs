import actionTypes from "./actionTypes";
import {
  getAllCodeService,
  createNewUserService,
  getAllUsers,
  deleteUserService,
} from "../../services/userService.js";
import { toast } from "react-toastify";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });

//Genders
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({
        type: actionTypes.FETCH_GENDER_START,
      });

      let res = await getAllCodeService("GENDER");
      if (res && res.errCode === 0) {
        dispatch(fetchGenderSuccess(res.data));
      } else {
        dispatch(fetchGenderFaiLed());
      }
    } catch (e) {
      dispatch(fetchGenderFaiLed());

      console.log("fetchGenderStart error", e);
    }
  };
};
export const fetchGenderSuccess = (genderData) => ({
  type: actionTypes.FETCH_GENDER_SUCCESS,
  data: genderData,
});
export const fetchGenderFaiLed = () => ({
  type: actionTypes.FETCH_GENDER_FAILED,
});

//Position
export const fetchPositionStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("POSITION");
      if (res && res.errCode === 0) {
        dispatch(fetchPositionSuccess(res.data));
      } else {
        dispatch(fetchPositionFaiLed());
      }
    } catch (e) {
      dispatch(fetchPositionFaiLed());

      console.log("fetchPositionFaiLed error", e);
    }
  };
};
export const fetchPositionSuccess = (positionData) => ({
  type: actionTypes.FETCH_POSITION_SUCCESS,
  data: positionData,
});
export const fetchPositionFaiLed = () => ({
  type: actionTypes.FETCH_POSITION_FAILED,
});

//Role
export const fetchRoleStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllCodeService("ROLE");
      if (res && res.errCode === 0) {
        dispatch(fetchRoleSuccess(res.data));
      } else {
        dispatch(fetchRoleFaiLed());
      }
    } catch (e) {
      dispatch(fetchRoleFaiLed());

      console.log("fetchRoleFaiLed error", e);
    }
  };
};
export const fetchRoleSuccess = (roleData) => ({
  type: actionTypes.FETCH_ROLE_SUCCESS,
  data: roleData,
});
export const fetchRoleFaiLed = () => ({
  type: actionTypes.FETCH_ROLE_FAILED,
});

//Create User
export const createNewUser = (data) => {
  return async (dispatch, getState) => {
    try {
      let res = await createNewUserService(data);
      console.log("check create user redux");
      if (res && res.errCode === 0) {
        dispatch(saveUserSuccess());
        toast.success(" Created a new user");
        //Re-render All Users
        dispatch(fetchAllUsersStart());
      } else {
        dispatch(saveUserFailed());
      }
    } catch (e) {
      dispatch(saveUserFailed());

      console.log("saveUserFaiLed error", e);
    }
  };
};

export const saveUserSuccess = () => ({
  type: actionTypes.CREATE_USER_SUCCESS,
});
export const saveUserFailed = () => ({
  type: actionTypes.CREATE_USER_FAILED,
});

//Render User
export const fetchAllUsersStart = () => {
  return async (dispatch, getState) => {
    try {
      let res = await getAllUsers("All");
      if (res && res.errCode === 0) {
        dispatch(fetchAllUsersSuccess(res.users.reverse()));
      } else {
        toast.error("Render users failed!");
        dispatch(fetchAllUsersFailed());
      }
    } catch (e) {
      toast.error("Render users failed!");
      dispatch(fetchAllUsersFailed());
    }
  };
};

export const fetchAllUsersSuccess = (data) => ({
  type: actionTypes.FETCH_ALL_USER_SUCCESS,
  users: data,
});

export const fetchAllUsersFailed = () => ({
  type: actionTypes.FETCH_ALL_USER_FAILED,
});

//Delete User

export const deleteAUser = (userId) => {
  return async (dispatch, getState) => {
    try {
      let res = await deleteUserService(userId);
      if (res && res.errCode === 0) {
        dispatch(deleteUserSuccess());
        toast.success("Deleted a user!");
        //Re-render All Users
        dispatch(fetchAllUsersStart());
      } else {
        toast.error("Delete user failed!");
        dispatch(deleteUserFailed());
      }
    } catch (e) {
      toast.error("Delete user failed!");
      dispatch(deleteUserFailed());
    }
  };
};

export const deleteUserSuccess = () => ({
  type: actionTypes.DELETE_USER_SUCCESS,
});
export const deleteUserFailed = () => ({
  type: actionTypes.DELETE_USER_FAILED,
});
