import React, { useEffect, useRef, useState } from "react";
import Counter from "./Component/Counter";
import Header from "./Component/Header";
import "./App.css";
import ReplyForm from "./Component/ReplyForm";
import Modal from "./Component/Modal";
import mockData from "./data/data.json";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [isReply, setIsReply] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const inputRef = useRef(null);
  function handleReply(id) {
    setSelectedReplyId(id);
    setIsReply(true);
    setIsEditingReply(false);
  }
  function addNewReplies(commentId, content) {
    const newReply = {
      id: Math.random().toString(),
      content: content,
    };
    const updatedData = data.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReply],
        };
      }
      return comment;
    });
    setData(updatedData);
    setSelectedReplyId(null);
    setIsReply(false);
  }
  function handleDelete(id) {
    setSelectedReplyId(id);
    setShowDelete(true);
    console.log(selectedReplyId, showDelete);
  }
  const handleDeleteComments = (replyId) => {
    if (replyId) {
      setData((prevData) =>
        prevData.map((comment) =>
          comment.replies
            ? {
                ...comment,
                replies: comment.replies.filter(
                  (reply) => reply.id !== replyId
                ),
              }
            : comment
        )
      );
    } else {
      setData((prevData) =>
        prevData.filter((comment) => comment.id !== replyId)
      );
    }
    setShowDelete(false);
  };

  function handleEditReply(id) {
    setSelectedReplyId(id);
    setIsEditingReply(true);
    setIsReply(false);
  }
  function handleSaveEdits(replyId, updatedContent) {
    // Find the comment that contains the reply to be edited
    const comment = data.find((comment) =>
      comment.replies.some((r) => r.id === replyId)
    );
    // Find the reply to be edited and update its content
    const updatedReply = {
      ...comment.replies.find((r) => r.id === replyId),
      content: updatedContent,
    };
    // Update the `data` state variable with the new reply content
    setData((prevData) =>
      prevData.map((c) =>
        c.replies
          ? {
              ...c,
              replies: c.replies.map((r) =>
                r.id === replyId ? updatedReply : r
              ),
            }
          : c
      )
    );
    // Reset the `editingReply` state variable
    setIsEditingReply(false);
  }

  useEffect(() => {
    setData(mockData);
  }, []);

  useEffect(() => {
    if (isEditingReply) inputRef?.current?.focus();
  }, [isEditingReply]);

  useEffect(() => {
    if (isReply) inputRef?.current?.focus();
  }, [isReply]);
  return (
    <>
      {showDelete && (
        <Modal
          showDelete={showDelete}
          setShowDelete={() => setShowDelete(false)}
          handleDeleteComments={() => handleDeleteComments(selectedReplyId)}
        />
      )}
      {!data ? (
        <h1>Loading</h1>
      ) : (
        <div className="app">
          {data.map((comment) => (
            <div className="container">
              <div className="comment">
                <Counter
                  score={comment.score}
                  key={comment.score}
                  isLoading={isLoading}
                />
                <Header
                  key={comment.id + "-header"}
                  content={comment.content}
                  comment={comment}
                  image={comment.user.image.png}
                  username={comment.user.username}
                  createdAt={comment.createdAt}
                  isReply={isReply}
                  handleReply={() => handleReply(comment.id)}
                />
              </div>

              {selectedReplyId === comment.id && isReply && (
                <div className="comment">
                  <ReplyForm
                    key={comment.id}
                    comment={comment}
                    inputRef={inputRef}
                    image={"./images/avatars/image-juliusomo.png"}
                    children={"REPLY"}
                    onAddReplies={(content) =>
                      addNewReplies(comment.id, content)
                    }
                    handleSaveEdits={(editedReplies) =>
                      handleSaveEdits(comment.id, editedReplies)
                    }
                    inputValue={
                      selectedReplyId === comment?.id
                        ? `@${comment?.user?.username} `
                        : ""
                    }
                  />
                </div>
              )}

              {comment.replies.map((reply) => (
                <>
                  <div className="replies" key={reply.id}>
                    <Counter score={reply?.score || 0} key={reply.score} />
                    <Header
                      key={reply.id + "-header"}
                      comment={reply}
                      image={
                        reply.user?.image?.png ||
                        "./images/avatars/image-juliusomo.png"
                      }
                      username={reply.user?.username || "juliusomo"}
                      createdAt={reply.createdAt}
                      content={reply.content}
                      handleReply={() => handleReply(reply.id)}
                      handleDeleteCommentsId={() => handleDelete(reply.id)}
                      handleEdit={() => handleEditReply(reply.id)}
                      isEditingReply={isEditingReply}
                      selectedReplyId={selectedReplyId}
                      handleSaveEdits={(updatedContent) =>
                        handleSaveEdits(reply.id, updatedContent)
                      }
                      inputRef={inputRef}
                    />
                  </div>
                  {selectedReplyId === reply.id && isReply && (
                    <div className="replies">
                      <ReplyForm
                        comment={reply}
                        key={reply.id}
                        inputRef={inputRef}
                        image={"./images/avatars/image-juliusomo.png"}
                        children={isEditingReply ? "UPDATE" : "REPLY"}
                        onAddReplies={(content) =>
                          addNewReplies(comment.id, content)
                        }
                        isEditingReply={isEditingReply}
                        selectedReplyId={selectedReplyId}
                        inputValue={
                          selectedReplyId === reply?.id
                            ? `@${reply?.user?.username} `
                            : ""
                        }
                      />
                    </div>
                  )}
                </>
              ))}
            </div>
          ))}
          <div className="comment">
            <ReplyForm
              comment={data[data.length - 1]}
              image={"./images/avatars/image-juliusomo.png"}
              children={"SEND"}
              onAddReplies={(content) =>
                addNewReplies(data[data.length - 1].id, content)
              }
            />
          </div>
        </div>
      )}
    </>
  );
}

export default App;
