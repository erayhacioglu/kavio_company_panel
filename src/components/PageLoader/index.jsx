import { useEffect, useMemo, useState } from "react";
import "./page_loader.scss"


export default function PageLoader({
  letters = "KAVİO",
  loadingText = "Yükleniyor...",
  speed = 100,
  step = 10,
  autoHide = true,
  onComplete,
  className = "",
}) {
  const [progress, setProgress] = useState(0);
  const [hidden, setHidden] = useState(false);

  const chars = useMemo(() => (letters || "").split("").filter(Boolean), [letters]);

  useEffect(() => {
    const t = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + step);
        return next;
      });
    }, speed);
    return () => clearInterval(t);
  }, [speed, step]);

  useEffect(() => {
    if (progress === 100) {
      if (onComplete) onComplete();
      if (autoHide) {
        // Animasyonun sonlanması için ufak gecikme
        const hideTimer = setTimeout(() => setHidden(true), 500);
        return () => clearTimeout(hideTimer);
      }
    }
  }, [progress, autoHide, onComplete]);

  if (hidden) return null;

  return (
    <div
      id="page-loader"
      className={`page-loader__overlay ${className}`}
      role="status"
      aria-live="polite"
      aria-label={loadingText}
    >
      <div className="page-loader__card">
        <div className="page-loader__letters" aria-hidden>
          {chars.map((c, i) => (
            <span key={`${c}-${i}`} className="page-loader__letter" style={{ animationDelay: `${i * 0.1}s` }}>
              {c}
            </span>
          ))}
        </div>

        <div className="page-loader__progress" aria-label="Yükleme ilerlemesi" aria-valuemin={0} aria-valuemax={100} aria-valuenow={progress}>
          <span className="page-loader__progress-bar" style={{ width: `${progress}%` }} />
        </div>

        {loadingText && <div className="page-loader__text">{loadingText}</div>}
      </div>
    </div>
  );
}

