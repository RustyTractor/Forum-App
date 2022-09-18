import React, { useState } from "react";
import Card from "../common/Card";

const CommentAdd = () => {
  const [isClosed, setIsClosed] = useState(true);
  return (
    <Card className={"commentCard"}>
      <form>
        <div className="inputRow">
          <label htmlFor="text">Write here your comment: </label>
          <br />
          <textarea type="textbox" name="text" rows={10} cols={50} />
        </div>
        <div className="inputRow">
          <button type="submit">Send</button>
        </div>
      </form>
    </Card>
  );
};

export default CommentAdd;
