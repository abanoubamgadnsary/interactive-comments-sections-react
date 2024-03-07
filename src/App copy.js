import React, { useEffect, useState } from "react";
import Counter from "./Component/Counter";
import Header from "./Component/Header";
import "./App.css";
import ReplyForm from "./Component/ReplyForm";

function App() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedReplyId, setSelectedReplyId] = useState(null);
  const [addReplies, setAddReplies] = useState([]);
  const [editingReply, setEditingReply] = useState(null);
  const [isEditingReply, setIsEditingReply] = useState(false);
  const [isReply, setIsReply] = useState(false);
  function handleReply(id) {
    setSelectedReplyId(id);
    setIsReply(true);
    setIsEditingReply(false);
    console.log(`Reply: ${isReply}, edit: ${isEditingReply}`);
  }
  function addNewReplies(commentId, content) {
    const newReplies = {
      id: Math.random().toString(),
      content,
    };
    setAddReplies([...addReplies, newReplies]);

    const updatedData = data.map((comment) => {
      if (comment.id === commentId) {
        return {
          ...comment,
          replies: [...comment.replies, newReplies],
        };
      }

      return comment;
    });
    setData(updatedData);
    setSelectedReplyId(null);
    console.log(updatedData[1].replies.length);
  }

  const handleDeleteComments = (commetID, replyId) => {
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
        prevData.filter((comment) => comment.id !== commetID)
      );
    }
  };

  function handleEditReply(reply) {
    setSelectedReplyId(reply.id);
    setIsEditingReply(true);
    setIsReply(false);
    console.log(`Reply: ${isReply}, edit: ${isEditingReply}`);
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
                r.replies === replyId ? updatedReply : r
              ),
            }
          : c
      )
    );
    // Reset the `editingReply` state variable
    setEditingReply(null);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch("http://localhost:8000/comments");
        const data = await res.json();
        setData(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <div className="app">
        {data.map((comment) => (
          <div className="container" key={comment.id}>
            <div className="comment">
              <Counter score={comment.score} isLoading={isLoading} />
              <Header
                content={comment.content}
                comment={comment}
                image={comment.user.image.png}
                username={comment.user.username}
                createdAt={comment.createdAt}
                handleReply={() => handleReply(comment.id)}
              />
            </div>

            {selectedReplyId === comment.id && isReply ? (
              <div className="comment">
                <ReplyForm
                  comment={comment}
                  image={"./images/avatars/image-juliusomo.png"}
                  children={"REPLY"}
                  onAddReplies={(content) => addNewReplies(comment.id, content)}
                  handleSaveEdits={(updatedContent) =>
                    handleSaveEdits(comment.id, updatedContent)
                  }
                  isEditingReply={isEditingReply}
                  initialValue={editingReply?.content}
                />
              </div>
            ) : null}
            {comment.replies.map((reply) => (
              <>
                <div className="replies" key={reply.id}>
                  <Counter score={reply?.score || 0} />
                  <Header
                    comment={reply}
                    image={
                      reply.user?.image?.png ||
                      "./images/avatars/image-juliusomo.png"
                    }
                    username={reply.user?.username || "juliusomo"}
                    createdAt={reply.createdAt}
                    content={reply.content}
                    handleReply={() => handleReply(reply.id)}
                    handleDeleteComments={() =>
                      handleDeleteComments(comment, reply?.id)
                    }
                    handleEdit={() => handleEditReply(reply)}
                    isEditingReply={isEditingReply}
                    selectedReplyId={selectedReplyId}
                  />
                </div>

                {selectedReplyId === reply.id && isReply ? (
                  <div className="replies">
                    <ReplyForm
                      image={"./images/avatars/image-juliusomo.png"}
                      children={isEditingReply ? "UPDATE" : "REPLY"}
                      onAddReplies={(content) =>
                        addNewReplies(reply.id, content)
                      }
                      initialValue={editingReply?.reply}
                      handleSaveEdits={(updatedContent) =>
                        handleSaveEdits(reply.id, updatedContent)
                      }
                      isEditingReply={isEditingReply}
                      selectedReplyId={selectedReplyId}
                    />
                  </div>
                ) : selectedReplyId === reply.id && isEditingReply ? (
                  <div className="replies">
                    <ReplyForm
                      image={"./images/avatars/image-juliusomo.png"}
                      children={isEditingReply ? "UPDATE" : "REPLY"}
                      onAddReplies={(content) =>
                        addNewReplies(reply.id, content)
                      }
                      initialValue={editingReply?.reply}
                      handleSaveEdits={(updatedContent) =>
                        handleSaveEdits(reply.id, updatedContent)
                      }
                      isEditingReply={isEditingReply}
                      selectedReplyId={selectedReplyId}
                    />
                  </div>
                ) : null}
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
    </>
  );
}

export default App;
