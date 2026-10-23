// App — root component. Define routes here (react-router):
//   /login, /register          -> public
//   /                          -> Dashboard (protected)
//   /watchers                  -> Watchers (protected)
//   /watchers/:id              -> WatcherDetail (protected)
//   /watchers/new              -> CreateWatcher (protected)
//   /watchers/:id/edit         -> EditWatcher (protected)
//   /logs                      -> Logs (protected)
//   /settings                  -> Settings (protected)
// Wrap protected routes in <ProtectedRoute> and the app in <AuthProvider>.
export default function App(): React.JSX.Element | null {
  return null;
}
