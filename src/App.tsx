import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentListPage from "./pages/studentList/views"
import StudentDetailPage from "./pages/studentDetail/views"
import Loading from "./shared/components/layout/loading"
import { useAtomValue } from "jotai"
import { isLoadingAtom } from "./shared/sharedStates"

function App() {
  const isLoading = useAtomValue(isLoadingAtom)

  return <>
    <BrowserRouter>
      <Loading visible={isLoading} />
      <Routes>
        <Route
          path="/"
          element={<StudentListPage />}
        />
        <Route
          path="/student/:id"
          element={<StudentDetailPage />}
        />
      </Routes>
    </BrowserRouter>
  </>
}

export default App
