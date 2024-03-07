import React, { useState } from "react";
import "./replyform.css";

function ReplyForm({
  comment,
  inputRef,
  image,
  children,
  onAddReplies,
  inputValue: initialInputValue = "",
}) {
  const [inputValue, setInputValue] = useState(initialInputValue.toString());

  function handleSubmit(e) {
    e.preventDefault();
    onAddReplies(inputValue);

    setInputValue("");
  }

  return (
    <div className="reply-form">
      <form onSubmit={(e) => handleSubmit(e)}>
        <img src={image} alt="" />
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Add a comment..."
        />
        <button type="submit">{children}</button>
      </form>
    </div>
  );
}

export default ReplyForm;
