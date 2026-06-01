import { useState } from "react";

function CommentForm({ addComment }) {

    const [comment, setComment] =
        useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!comment.trim()) {
            return;
        }

        addComment(comment);

        setComment("");
    };

    return (

        <div className="mt-4">

            <h4>Add Comment</h4>

            <form onSubmit={handleSubmit}>

                <textarea
                    className="form-control mb-2"
                    rows="3"
                    value={comment}
                    onChange={(e) =>
                        setComment(
                            e.target.value
                        )
                    }
                />

                <button
                    className="btn btn-primary"
                >
                    Add Comment
                </button>

            </form>

        </div>
    );
}

export default CommentForm;