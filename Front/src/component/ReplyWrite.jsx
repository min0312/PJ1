import axios from "axios";
import { useState } from "react";

export default function ReplyWrite({ boardIndex, onWrite }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:4000/replywrite", {
        board_indexs: boardIndex,
        reply_Content: content,
        comment_id: localStorage.getItem("user"),
      });
      setContent("");
      onWrite(response.data);
    } catch (error) {
      console.error(error);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <button type="submit">작성</button>
      </form>
    </div>
  );
}
