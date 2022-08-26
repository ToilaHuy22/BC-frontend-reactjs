import actionTypes from "./actionTypes";
import { getAllCodeService } from "../../services/userService.js";

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START,
// });
export const fetchGenderStart = () => {
  return async (dispatch, getState) => {
    try {
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
