export default function isAuthenticated({ next, store, nextMiddleware }) {
  if (!store.state.Auth.user.isAuthenticated) {
    next("/");
  }
  return nextMiddleware();
}
