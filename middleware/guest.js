/* eslint-disable */
export default function ({ store, redirect }) {
  // se o usuario estiver logado redireciona para a dashboard
  if (store.state.auth.loggedIn === true) return redirect('/dashboard');
}
