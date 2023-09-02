/* eslint-disable */
export default function ({ store, redirect }) {
  // se o usuario estiver não logado redireciona para a dashboard
  if (store.state.auth.loggedIn === false) return redirect('/login');
}
