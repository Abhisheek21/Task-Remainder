import React from 'react';

function TaskItem({ task, toggleTask }) {
  return (
    <div className="task-item">
      <input
        type="checkbox"
        checked={!!task.completed}
        onChange={(e) => toggleTask(task.id, e.target.checked ? 1 : 0)}
      />
      <span className={task.completed ? 'completed' : ''}>{task.text}</span>
      <span className="datetime">{task.date} {task.time}</span>
    </div>
  );
}

export default TaskItem;