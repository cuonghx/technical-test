import { SearchPage } from "./views/SearchPage";
import { Provider } from "react-redux";
import { rootStore } from "./store";

function App() {
  return (
    <Provider store={rootStore}>
      <SearchPage />
    </Provider>
  );
}

export default App;