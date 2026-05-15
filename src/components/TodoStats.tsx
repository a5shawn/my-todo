interface TodoStatsProps {
  activeCount: number;
  onClearCompleted: () => void;
}

export function TodoStats({ activeCount, onClearCompleted }: TodoStatsProps) {
  return (
    <div className="stats">
      <span>{activeCount} 项待办</span>
      <button className="clear-btn" onClick={onClearCompleted}>
        清除已完成
      </button>
    </div>
  );
}
