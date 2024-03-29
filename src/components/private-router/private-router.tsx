import { Navigate } from "react-router-dom";
import { RouteProps } from "react-router-dom";
import { AppRoute, AuthorizationStatus } from "../../const";

type PrivateRouteProps = RouteProps & {
  authorizationStatus: boolean;
  children: JSX.Element;
};

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const { authorizationStatus, children } = props;

  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Films} />
  );
}

export default PrivateRoute;
