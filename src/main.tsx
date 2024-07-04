import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import { persistor, store } from "./redux/store.ts";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css'; 
import AOS from 'aos';
import 'aos/dist/aos.css'; 

ReactDOM.createRoot(document.getElementById("root")!).render(

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router}></RouterProvider>
      </PersistGate>
    </Provider>
);
AOS.init();
