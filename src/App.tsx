import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Suspense } from "react";
import { Skeleton } from "antd";
import { ROUTES } from "./utils/route";
import { ConfigProvider, theme } from "antd";

function App() {
  return (
    <ConfigProvider
      theme={{
        "token": {
          "colorPrimary": "#5b23a9",
          "borderRadius": 8,
          "wireframe": false
        }
      }}
    >
      <BrowserRouter>
        <main className="flex w-full">
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
                                  ? subRoute.nestedRoute.map((grandChildRoute: any) => {
                                      const Element = grandChildRoute.component();
                                      return (
                                        <Route
                                          path={grandChildRoute.path}
                                          key={grandChildRoute.path}
                                          element={<Element />}
                                        />
                                      );
                                    })
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
        </main>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
