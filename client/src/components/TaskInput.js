import React, { useState } from 'react';

function TaskInput({ addTask }) {
  const [text, setText] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleAdd = () => {
    if (text.trim()) {
      addTask({ text, date, time, completed: 0 });
      setText('');
      setDate('');
      setTime('');
    }
  };

  return (
    <div className="task-input">
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter task" />
      <button onClick={handleAdd}>Add</button>
      {text && (
        <>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        </>
      )}
    </div>
  );
}

export default TaskInput;