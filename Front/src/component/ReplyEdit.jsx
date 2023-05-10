import axios from "axios";
import { useState } from "react";

export default function ReplyEdit({ data, replyIndex, boardindexs, onSubmit, onCancel, isEditing }) {
  const [editedContent, setEditedContent] = useState(data.reply_Content);
  const reply_Indexs = replyIndex
  const board_indexs = boardindexs

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/replyedit/${reply_Indexs}`, {
        editedContent,
        board_indexs
      });
      alert('글이 수정되었습니다!');
      onSubmit(); // isEditing을 false로 변경하여 댓글 수정 창 닫기
    } catch (error) {
      console.error(error);
      alert('글 수정에 실패했습니다.');
    }
  };  

  const handleCancel = () => {
    setEditedContent(data.reply_Content);
    onCancel();
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <textarea
          value={editedContent}
          onChange={(e) => setEditedContent(e.target.value)}
        ></textarea>
        <button type="submit">저장</button>
        <button type="button" onClick={handleCancel}>
          취소
        </button>
      </form>
    </div>
  );
}
