import "../styles/components/ProgressBar.style.css";

interface ProgressBarProps {
  progress: number;
}
export default function ProgressBar({ progress }: ProgressBarProps) {
  console.log(progress);
  return (
    <div className="progress__wrap">
      <div className="progress__bg">
        <div className="progress" style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
