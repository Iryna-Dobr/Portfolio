import { Routes, Route } from "react-router-dom";
import Posts from "./components/Posts";
import Todo from "./components/Todo";
import User from "./components/User";
import NotFound from "./components/NotFound";
import Header from './components/Header';
import Detail from "./components/Detail";

const App = () => {

  return (
    <>
      <Routes>
        <Route path='/' element={<Header />}>
          <Route index element={<Posts />} />
          <Route path="todo" element={<Todo />} />
          <Route path="user" element={<User />} />
          <Route path="*" element={<NotFound />} />

          <Route path="user/:id" element={<Detail />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
