import {LoginManager, AccessToken} from 'react-native-fbsdk';

export const FBLogin = (loginRequest, errorCallback) => {
  LoginManager.logOut();
  LoginManager.logInWithPermissions(['email', 'public_profile']).then(
    function(result) {
      console.log({result});

      if (result.isCancelled) {
        errorCallback();
      } else {
        AccessToken.getCurrentAccessToken().then(data => {
          loginRequest({token: data.accessToken, token_type: 'facebook'});
        });
      }
    },
    function(error) {
      console.log({error});
      errorCallback(error);
    },
  );
};
