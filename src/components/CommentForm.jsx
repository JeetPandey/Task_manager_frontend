import { useState } from "react";

function CommentForm({
    onSubmit
}) {

    const [comment,
        setComment] =
        useState("");

    const submit = (e) => {

        e.preventDefault();

        onSubmit(comment);

        setComment("");
    };

    return (

        <form
            onSubmit={submit}
        >

            <textarea
                className="form-control"
                value={comment}
                onChange={(e) =>
                    setComment(
                        e.target.value
                    )
                }
            />

            <button
                className="btn btn-primary mt-2"
            >
                Add Comment
            </button>

        </form>
    );
}

export default CommentForm;