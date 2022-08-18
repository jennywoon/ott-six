import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { __deleteComment, __updateComment } from "../redux/modules/moviesSlice";
import { useParams } from "react-router-dom";
import Button from "./elements/Button";

const CommentView = ({ comment }) => {
  const dispatch = useDispatch();
  const param = useParams();
  const [editComment, setEditComment] = React.useState(false);
  const { nickname, token } = useSelector((state) => state.login);
  console.log(useSelector((state) => state.login));
  console.log(comment);
  console.log(nickname);
  console.log(comment.nickname);

  let updateCommentInput = () => {
    if (editComment) {
      setEditComment(false);
    } else {
      setEditComment(true);
    }
  };

  const deleteBtn = (commentId) => {
    if (window.confirm("댓글을 삭제하시겠습니까?")) {
      dispatch(__deleteComment(commentId));
    }
  };

  const [updateComment, setUpdateComment] = useState({
    commentId: "",
    userContent: comment.userContent,
  });

  const changeEvent = (e) => {
    setUpdateComment({
      boardId: param.id,
      commentId: comment.id,
      userContent: e.target.value,
    });
  };

  const updateCommentAction = () => {
    dispatch(__updateComment(updateComment));
    updateCommentInput();
  };
  return (
    <>
      <div>
        <CommentBox>
          {comment.nickname === nickname ? (
            <>
              <CommentContent>
                {!editComment ? (
                  <div>
                    {/* <CommentTop className="comment_view">{comment.userName}</CommentTop> */}
                    <CommentBottom className="comment_view">{comment.userContent}</CommentBottom>
                  </div>
                ) : (
                  // <Input onChange={changeEvent} name="userContent" type="text" value={updateComment.userContent}/>
                  <StInput onChange={changeEvent} name="userContent" type="text" value={updateComment.userContent} />
                )}
              </CommentContent>
              <CommentButton>
                {!editComment ? (
                  <div>
                    <Button
                    btntype="white" width="140px" height="50px" outline="1px solid #35247b;"
                    onClick={() => {
                      updateCommentInput();
                    }}
                    >수정하기</Button>
                    <Button
                    btntype="white" width="140px" height="50px" margin="0 10px" outline="1px solid #35247b;"
                    onClick={() => {
                      deleteBtn(comment.id);
                    }}
                    >삭제하기</Button>
                  </div>
                ) : (
                  <div>
                    <Button
                    btntype="white" width="140px" height="50px" outline="1px solid rgb(251,188,4);"
                    onClick={() => {
                      updateCommentInput();
                    }}
                    >취소하기</Button>
                    <Button
                    btntype="white" width="140px" height="50px" margin="0 10px" outline="1px solid rgb(251,188,4);"
                    onClick={() => {
                      updateCommentAction();
                    }}
                    >저장하기</Button>
                  </div>
                )}
              </CommentButton>
            </>
          ) : (
            <CommentContentDiv>
              <CommentBottom className="comment_view">{comment.userContent}</CommentBottom>
            </CommentContentDiv>
          )}
        </CommentBox>
      </div>
    </>
  );
};

export default CommentView;

const CommentBox = styled.div`
  width: 1300px;
  display: flex;
  /* border-bottom: 1px solid #eee; */
  justify-content: center;
  /* border: 1px solid red; */
`;
const CommentContent = styled.div`
  width: 990px;
  height: 50px;
  border-radius: 5px;
  background-color: #eee;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* border: 3px solid rgb(251,188,4); */
  margin-right: 10px;
`;
const CommentContentDiv = styled.div`
  width: 100%;
  margin: 5px 10px 5px 0;
  height: 50px;
  border-radius: 5px;
  background-color: #eee;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  /* border: 3px solid rgb(251,188,4); */
`;

const CommentBottom = styled.div`
  font-size: 15px;
  padding-left: 20px;
`;

const StInput = styled.input`
  box-sizing: border-box;
  background-color: white;
  color: black;
  border: none;
  border-radius: 5px;
  /* width: 70%; */
  height: 50px;
  /* margin-right: 10px; */
`;

const CommentButton = styled.div`
  display: flex;
  /* margin: 3px; */
  margin-bottom: 15px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

`;
