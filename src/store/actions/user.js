import AsyncStorage from '@react-native-async-storage/async-storage';
export const USER_DETAIL = 'USER_DETAIL';
export const USER_MODALRENAME = 'USER_MODALRENAME';
export const USER_PRIVILEGE = 'USER_PRIVILEGE';

export const getUser = () => {
   return async (dispatch, getState) => {
      try {
         const getUserName = await AsyncStorage.getItem('user')
         dispatch({ type: USER_DETAIL, userName: getUserName });
      } catch (error) {
         console.log(error)
      }
   }
}

export const addUser = (name) => {
   return async (dispatch, getState) => {
      try {
         await AsyncStorage.setItem('user', name)
         dispatch({ type: USER_DETAIL, userName: name });
      } catch (error) {
         console.log(error)
      }
   }
}

export const showRenameModal = () => {
   return async (dispatch, getState) => {
      dispatch({ type: USER_MODALRENAME, showModal: true });
   }
}

export const getPrivilege = () => {
   return async (dispatch, getState) => {
      try {
         const getUserPrivilege = await AsyncStorage.getItem('privilege')
         dispatch({ type: USER_PRIVILEGE, userPrivilege: getUserPrivilege });
      } catch (error) {
         console.log(error)
      }
   }
}

export const newPrivilege = () => {
   return async (dispatch, getState) => {
      try {
         await AsyncStorage.setItem('privilege', '3')
         dispatch({ type: USER_PRIVILEGE, userPrivilege: 3 });
      } catch (error) {
         console.log(error)
      }
   }
}

export const addPrivilege = () => {
   return async (dispatch, getState) => {
      try {
         const getUserPrivilege = await AsyncStorage.getItem('privilege');
         const countPrivilege = parseInt(getUserPrivilege) + 2;
         await AsyncStorage.setItem('privilege', countPrivilege.toString())
         dispatch({ type: USER_PRIVILEGE, userPrivilege: countPrivilege });
      } catch (error) {
         console.log(error)
      }
   }
}

export const removePrivilege = () => {
   return async (dispatch, getState) => {
      try {
         const getUserPrivilege = await AsyncStorage.getItem('privilege');
         const countPrivilege = parseInt(getUserPrivilege)
         const sumPrivilege = countPrivilege > 0 ? countPrivilege - 1 : 0;
         await AsyncStorage.setItem('privilege', sumPrivilege.toString())
         dispatch({ type: USER_PRIVILEGE, userPrivilege: sumPrivilege });
      } catch (error) {
         console.log(error)
      }
   }
}