import Icon from "./Icon";
import "styles/components/Loading.style.css";

export default function Loading() {
  return (
    <div className="loading__wrap">
      <Icon name="IconLoading" width="50px" height="50px" />
    </div>
  );
}
