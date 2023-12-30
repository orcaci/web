import { ThemeProvider } from "@material-tailwind/react";
import { Skeleton } from "antd";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ROUTES } from "./utils/route";

function App() {
  useEffect(() => {
    import("preline");
  }, []);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <Suspense fallback={<Skeleton active={true} />}>
          <Routes>
            {ROUTES.map((route) => {
              const Component = route.component();
              return (
                <Route
                  path={route.path}
                  key={route.key}
                  element={<Component />}
                >
                  {route.nestedRoute
                    ? route.nestedRoute.map((subRoute: any) => {
                        const Element = subRoute.component();
                        return (
                          <Route
                            path={subRoute.path}
                            key={subRoute.path}
                            element={<Element />}
                          >
                            {subRoute?.nestedRoute
                              ? subRoute.nestedRoute.map(
                                  (grandChildRoute: any) => {
                                    const Element = grandChildRoute.component();
                                    return (
                                      <Route
                                        path={grandChildRoute.path}
                                        key={grandChildRoute.path}
                                        element={<Element />}
                                      />
                                    );
                                  }
                                )
                              : null}
                          </Route>
                        );
                      })
                    : null}
                </Route>
              );
            })}
          </Routes>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
