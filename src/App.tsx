import React, { Suspense, } from "react";
import { Route, Switch, useHistory, } from "react-router-dom";
import routes from "./routes";

const App: React.FC = () => {
  return (
    <Suspense fallback={<p>loading...</p>}>
      <Switch>
        { useHistory().push('/') }
        {routes.map(({ path, component, ...rest}, index) => (
          <Route key={index} path={path} component={component} {...rest} />
        ))}
      </Switch>
    </Suspense>
  );
};

export default App;
