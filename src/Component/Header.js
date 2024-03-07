import "./Header.css";
function Header({
  comment,
  image,
  username,
  createdAt,
  content,
  handleReply,
  handleDeleteCommentsId,
  handleEdit,
  isEditingReply,
  handleSaveEdits,
  selectedReplyId,
  inputRef,
}) {
  return (
    <section className="header">
      <div className="user-info">
        <div className="user">
          <img src={image} alt="" />
          <span className="username">{username}</span>
          <span className={username === "juliusomo" ? "you" : ""}>
            {username === "juliusomo" ? "you" : ""}
          </span>
          <span className="time">{createdAt}</span>
        </div>
        <div className="reply">
          {username === "juliusomo" ? (
            <>
              <button
                className="delete"
                onClick={() => handleDeleteCommentsId(comment.id)}
              >
                <img src="./images/icon-delete.svg" alt="" />
                Delete
              </button>
              <button className="edit" onClick={() => handleEdit(comment.id)}>
                <img src="./images/icon-edit.svg" alt="" />
                Edit
              </button>
            </>
          ) : (
            <>
              <button
                className="reply-btn"
                onClick={() => handleReply(comment.id)}
              >
                <img src="./images/icon-reply.svg" alt="" />
                <span>Reply</span>
              </button>
            </>
          )}
        </div>
      </div>
      <div className="content">
        <>
          <span
            contentEditable={isEditingReply && selectedReplyId === comment.id}
            suppressContentEditableWarning={
              isEditingReply && selectedReplyId === comment.id
            }
            ref={inputRef}
          >
            {content}
          </span>
        </>
      </div>
      {selectedReplyId === comment.id && isEditingReply && (
        <div className="update">
          <button onClick={() => handleSaveEdits(content)}>UPDATE</button>
        </div>
      )}
    </section>
  );
}

export default Header;
