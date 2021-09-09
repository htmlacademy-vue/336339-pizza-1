export default function isAuthenticated({ next, store, nextMiddleware }) {
  if (!store.state.Auth.isAuthenticated) {
    next("/");
  }
  return nextMiddleware();
}
