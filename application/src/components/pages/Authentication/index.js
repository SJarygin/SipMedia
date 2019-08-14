import Axios from 'axios';
import router from '@/router';
const SipMediaAPI = `http://${window.location.hostname}:3000`;

export default {
  user: { authenticated: false },

  authenticate (context, credentials, redirect) {
    Axios.post(`${SipMediaAPI}/api/v1/auth`, credentials)
      .then(({data: {token}}) => {
        context.$cookie.set('token', token, '1D');
        context.validLogin = true;
        this.user.authenticated = true;

        if (redirect) router.push(redirect);
      }).catch(({response: {data}}) => {
        context.snackbar = true;
        context.message = data.message;
      });
  },

  signup (context, credentials, redirect) {
    Axios.post(`${SipMediaAPI}/api/v1/signup`, credentials)
      .then(({data: {token}}) => {
        context.$cookie.set('token', token, '1D');
        context.validSignUp = true;
        this.user.authenticated = true;

        if (redirect) router.push(redirect);
      }).catch(({response: {data}}) => {
        context.snackbar = true;
        context.message = data.message;
      });
  },

  checkAuthentication () {
    const token = document.cookie;

    if (token) this.user.authenticated = true;
    else this.user.authenticated = false;
  },

  getAuthenticationHeader (context) {
    return `Bearer ${context.$cookie.get('token')}`;
  }
};
