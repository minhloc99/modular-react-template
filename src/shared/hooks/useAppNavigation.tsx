import { useNavigate, useParams } from "react-router-dom";

export default function useAppNavigation() {
  const navigate = useNavigate();
  const params = useParams();

  return {
    params,
    navigateToStudentListPage: () => {
      navigate("/");
    },
    navigateToStudentDetailPage: (id: string = "create") => {
      navigate(`/student/${id}`);
    },
  };
}